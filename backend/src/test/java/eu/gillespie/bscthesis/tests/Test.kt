package eu.gillespie.bscthesis.tests

import eu.gillespie.bscthesis.tests.shared.FileLoader
import java.util.*
import kotlin.Exception
import kotlin.test.Test


class Test {
    @Test
    fun test() {
        val raw = FileLoader.load("smt/generatedModel.smt2")

        val tree = parseFullParenthesis(raw)
        val relevantTree = tree.copy(parameters = tree.parameters.filter {
            val firstParameter = it.parameters.firstOrNull()?.name


            firstParameter != null
                && (
                    firstParameter.startsWith("%") || (
                        !firstParameter.startsWith("definition")
                        && !firstParameter.startsWith("inductionAssumption")
                        && !firstParameter.startsWith("inductiveBasis")
                        && firstParameter != "statementToProve"
                    )
                )

        })

        printTree(relevantTree, 0)
    }
}

fun printTree(tree: Function, level: Int) {

    for(x in 0..level - 1)
        print("\t")

    if(tree.name == null && tree.parameters.size == 0) {
        print("()\n")
        return
    }

    if(tree.parameters.size > 0)
        print("(")

    print("${tree.name ?: ""}\n")

    if(tree.parameters.size == 0)
        return

    for(x in tree.parameters) {
        printTree(x, level + 1)
    }

    for(x in 0..level - 1)
        print("\t")

    if(tree.parameters.size > 0)
        print(")\n")
}

fun parseFullParenthesis(input: String): Function {
    val processedInput = input.trim().replace(Regex(";.*\n"), "").replace("\n", " ").trim()

    if(processedInput == "()")
        return Function(null, listOf())

    if(processedInput.length > 0 && !processedInput.contains(Regex("\\s"))) {
        return Function(processedInput, listOf())
    }
    if(!processedInput.startsWith("(")) {
        throw SyntaxException("Input does not start with a '('.")
    }

    if(!processedInput.endsWith(")")) {
        throw SyntaxException("Input does not end with a ')'.")
    }

    val inner = processedInput.removePrefix("(").removeSuffix(")").trim()

    val whitespaceSplit = inner.split(Regex("\\s+"))

    val parametersStart: Int
    val functionName: String?
    if(whitespaceSplit[0].startsWith("(")) {
        functionName = null
        parametersStart = 0
    } else {
        functionName = whitespaceSplit[0]
        parametersStart = 1
    }


    val parameters: List<Function>
    if(whitespaceSplit.size > 1) {
        parameters = parseParameters(whitespaceSplit.drop(parametersStart).joinToString(" "))
    } else {
        parameters = listOf()
    }

    return Function(
        functionName,
        parameters
    )

}

fun parseParameters(input: String): List<Function> {
//        val noComments = raw.split("\n").filter { !it.trim().startsWith(";") }.joinToString("\n")
//        val noComments = raw.replace(Regex(";.*\n"), "")
    var inCommentSection = false
    var level = 0

    val parameters = mutableListOf<String>()
    var currentParameter = ""

    for(c in input) {
        if(inCommentSection) {
            if (c == '\n') {
                inCommentSection = false
            }
            continue
        }

        if(c == ';') {
            inCommentSection = true
            continue
        }

        if(level == 0 && Regex("^\\s$").matches(c.toString())) {
            if(currentParameter.length > 0)
                parameters.add(currentParameter)

            currentParameter = ""
            continue
        }

        currentParameter += c

        if(c == '(') {
            if(level == 0) {
                if(currentParameter.length > 1)
                    parameters.add(currentParameter)

                currentParameter = "("
            }
            level++
        }

        if(c == ')') {
            level--
            if(level == 0) {
                if(currentParameter.length > 0)
                    parameters.add(currentParameter)

                currentParameter = ""
            }
        }
    }

    if(currentParameter.trim().length > 0)
        parameters.add(currentParameter)

    return parameters.map { parseFullParenthesis(it) }
}

data class Function(
    val name: String?,
    val parameters: List<Function> = LinkedList()
) {
    fun containsConstructorInstantiation(): Boolean {
        return (
            name != null
                && ((name.contains("%"))
                && (!name.contains("%%"))
                || parameters.any { it.containsConstructorInstantiation()}
                )
        )
    }
}

class SyntaxException(message: String) : Exception(message)