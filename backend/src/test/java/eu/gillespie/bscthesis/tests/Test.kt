package eu.gillespie.bscthesis.tests

import eu.gillespie.bscthesis.tests.shared.FileLoader
import eu.gillespie.bscthesis.tosmtv20.generateConstantDefinition
import java.lang.RuntimeException
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


//        printTree(relevantTree, 0)

//        print(generateTypeMapping(listOf(relevantTree.parameters.first())))


        val typeMapping = generateTypeMapping(tree.parameters)
        println(typeMappingToHumanReadableString(typeMapping))
        println(typeMapping.filter { it.humanReadable?.contains("(") ?: false })
    }

}

//fun generateHumanReadableConstantDefinitions(list: List<Function>, typeMapping: List<ConstantInformation>): List<String> {
//    return list.filter {
//
//    }
//}

fun typeMappingToHumanReadableString(typeMapping: List<ConstantInformation>): String {
    val resultList = mutableListOf<String>()
    typeMapping.groupBy { it.type }.forEach { entry ->
        var singleResult = ""

        singleResult += entry.value
            .sortedBy { it.variable }
            .map { it.variable }
            .filterNotNull()
            .joinToString(", ")

        singleResult += " in ${entry.key}"

        resultList.add(singleResult)
    }

    return resultList.joinToString("\n")
}

fun generateTypeMapping(functions: List<Function>): List<ConstantInformation> {
    val result = mutableListOf<ConstantInformation>()
    // Expected Format example: (declare-fun NAryTree!val!2)
    val filteredFunctions = functions.filter {
        it.name == "declare-fun"
                && it.parameters.size == 3
                // Contains exactly two !
                && it.parameters[0].name?.count { symbol -> symbol == '!'} == 2 && it.parameters[0].parameters.isEmpty()
                // has no input parameters
                && it.parameters[1].name == null && it.parameters[1].parameters.isEmpty()
                // Last parameter is potentially a type
                && it.parameters[2].name != null && it.parameters[2].parameters.isEmpty()
    }


    for(singleFunction in filteredFunctions) {
        val symbol = singleFunction.parameters[0].name
            ?: throw RuntimeException("Invalid format")
        val type = singleFunction.parameters[2].name
            ?: throw RuntimeException("Invalid format")
        val index = singleFunction.parameters[0].name?.split("!")?.get(2)?.toInt()
            ?: throw RuntimeException("Invalid format")

        result.add(ConstantInformation(symbol, type, index, getVariableName(functions, type, index), getHumanReadable(functions, type, index)))
    }

    return result.toList()
}

fun getHumanReadable(functions: List<Function>, type: String, index: Int): String? {
    val intermediateResult = functions.find {
        val maybeInstantiation = it.parameters[0]
        maybeInstantiation.name != null
                && it.name == "define-fun"
                && maybeInstantiation.name.startsWith("%")
                && it.parameters[1].name == null && it.parameters[1].parameters.isEmpty()
                && it.parameters[2].name != null && it.parameters[2].parameters.isEmpty()
                && it.parameters[3].name == "${type}!val!${index}" && it.parameters[3].parameters.isEmpty()
    }

    if (intermediateResult == null) {
        return null;
    }

    val instantiation = intermediateResult.parameters[0]
    var constructorName = instantiation.name?.split("/")?.get(0)?.removePrefix("%")
        ?: throw RuntimeException("No name found")

    if(constructorName.startsWith("%")) {
        constructorName = constructorName.removePrefix("%")
        val inputIndex = instantiation.name.split("_")[1].removePrefix("x")
        return "${constructorName}${inputIndex}"
    }

    val arity: Int = instantiation.name.split("/")[1].toInt()

    var symbol = "${constructorName}("
    symbol += (0 until arity).map { "${constructorName}${it}" }.joinToString(", ")
    symbol += ")"

    return symbol

}

fun getVariableName(functions: List<Function>, type: String, index: Int): String? {
    val intermediateResult = functions.find {
        val maybeInstantiation = it.parameters[0]
        maybeInstantiation.name != null
                && it.name == "define-fun"
                && maybeInstantiation.name.startsWith("%%")
                && it.parameters[1].name == null && it.parameters[1].parameters.isEmpty()
                && it.parameters[2].name != null && it.parameters[2].parameters.isEmpty()
                && it.parameters[3].name == "${type}!val!${index}" && it.parameters[3].parameters.isEmpty()
    }

    if (intermediateResult == null) {
        return null;
    }

    val instantiation = intermediateResult.parameters[0]
    val constructorName = instantiation.name?.split("/")?.get(0)?.removePrefix("%%")
        ?: throw RuntimeException("No name found")
    val inputIndex = instantiation.name.split("_")[1].removePrefix("x")
    return "${constructorName}${inputIndex}"
//    return when(type) {
//        "NAryTree" -> "t"
//        "PLFormula" -> "f"
//        "Int" -> "z"
//        "Real" -> "x"
//        else -> throw RuntimeException("Unknown type")
//    } + index
}

data class ConstantInformation(
    val symbol: String,
    val type: String,
    val index: Int,
    val variable: String?,
    val humanReadable: String?
)

fun printTree(tree: Function, level: Int) {

    for(x in 0 until level)
        print("\t")

    if(tree.name == null && tree.parameters.isEmpty()) {
        print("()\n")
        return
    }

    if(tree.parameters.isNotEmpty())
        print("(")

    print("${tree.name ?: ""}\n")

    if(tree.parameters.isEmpty())
        return

    for(x in tree.parameters) {
        printTree(x, level + 1)
    }

    for(x in 0 until level)
        print("\t")

    if(tree.parameters.isNotEmpty())
        print(")\n")
}

fun parseFullParenthesis(input: String): Function {
    val processedInput = input.trim().replace(Regex(";.*\n"), "").replace("\n", " ").trim()

    if(processedInput == "()")
        return Function(null, listOf())

    if(processedInput.isNotEmpty() && !processedInput.contains(Regex("\\s"))) {
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


    val parameters: List<Function> = if(whitespaceSplit.size > 1) {
        parseParameters(whitespaceSplit.drop(parametersStart).joinToString(" "))
    } else {
        listOf()
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
            if(currentParameter.isNotEmpty())
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
                if(currentParameter.isNotEmpty())
                    parameters.add(currentParameter)

                currentParameter = ""
            }
        }
    }

    if(currentParameter.trim().isNotEmpty())
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