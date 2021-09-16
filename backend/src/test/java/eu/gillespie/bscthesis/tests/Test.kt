package eu.gillespie.bscthesis.tests

import eu.gillespie.bscthesis.exceptions.SyntaxException
import eu.gillespie.bscthesis.exceptions.UnknownTypeExpection
import eu.gillespie.bscthesis.tests.shared.FileLoader
import java.lang.RuntimeException
import java.util.*
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


//        val typeMapping = generateTypeMapping(tree.parameters)
//        println(typeMappingToHumanReadableString(typeMapping))
//        println(typeMapping.filter { it.humanReadable?.contains("(") ?: false })

        println(parseCounterModel(tree.parameters))
    }

}

fun parseCounterModel(functions: List<SFunction>): CounterModel {
    val filteredFunctions = functions.filter { isRelevantForCounterHumanReadableCounterModel(it) }

    val aliasDeclarationFunctions = filteredFunctions.filter { isAliasDeclaration(it) }
    val instantiationAliasMappings = filteredFunctions
        .filter { isInstantiationAliasMapping(it) }
        .map { it.parameters[2].name to it.parameters[0].name }.toMap()

    val aliases = aliasDeclarationFunctions.map {
        val systemSymbol = it.parameters[0].name ?: throw SyntaxException("Alias system symbol was unexpectedly null")
        val index = systemSymbol.split("!")[2].toInt()
        val type = it.parameters[2].name ?: throw SyntaxException("Alias did not specify a type unexpectedly")

        Alias(
            systemSymbol,
            getVariableBaseForType(type) + index,
            type,
            index,
            instantiationAliasMappings[type]
        )
    }.toSet()

    val values: Map<String, FunctionValue> = filteredFunctions
        .filter { isFunctionValueDefinition(it) }
        .map {
            val functionName = it.parameters[0].name ?: SyntaxException("Function name was null")
            val (valueMapping, otherwise) = parseIfThenElse(it.parameters[3])

            (functionName as String) to FunctionValue(valueMapping, otherwise)
        }.toMap()

    return CounterModel(aliases, values)
}

fun parseIfThenElse(ite: SFunction, previousMapping: Map<String, String> = mapOf()): Pair<Map<String, String>, String> {
    if(ite.name != "ite")
        return Pair(previousMapping, ite.toString())

    val condition = ite.parameters[0]
    val then = ite.parameters[1]
    val otherwise = ite.parameters[2]

    if(condition.name != "=")
        throw SyntaxException("ITE function did not use equality.")

    val systemSymbol = condition.parameters[1].name ?: throw SyntaxException("The System symbols name was unexpectedly empty")
    val value = then.toString()

    val newMapping = previousMapping.toMutableMap()
    newMapping[systemSymbol] = value

    return parseIfThenElse(otherwise, newMapping.toMap())
}

fun isFunctionDefinition(function: SFunction) = function.name == "define-fun"
        && function.parameters.size > 1
        && function.parameters[1].name?.startsWith("definition") ?: false

fun isInductiveBasis(function: SFunction) = function.name == "define-fun"
        && function.parameters.size > 1
        && function.parameters[1].name?.equals("inductiveBasis") ?: false

fun isInductionAssumption(function: SFunction) = function.name == "define-fun"
        && function.parameters.size > 1
        && function.parameters[1].name?.startsWith("inductionAssumption") ?: false

fun isStatementToProve(function: SFunction) = function.name == "define-fun"
        && function.parameters.size > 1
        && function.parameters[1].name?.equals("Statement to prove") ?: false


fun isRelevantForCounterHumanReadableCounterModel(function: SFunction) = !isFunctionDefinition(function)
        && !isInductiveBasis(function)
        && !isInductionAssumption(function)
        && !isStatementToProve(function)
        && (
            isInstantiationAliasMapping(function)
                    ||  isAliasDeclaration(function)
                    ||  isFunctionValueDefinition(function)
        )

fun isFunctionValueDefinition(function: SFunction): Boolean {
    if (function.name != "define-fun")
        return false

    val functionName: SFunction = function.parameters[0]
    val inputTypes: SFunction = function.parameters[1]
    val outputType = function.parameters[2]
    val valueDefinition = function.parameters[3]

    listOf(functionName, outputType).forEach {
        if (it.parameters.isNotEmpty())
            return false
    }

    listOf(functionName, outputType, valueDefinition).forEach {
        if (it.name == null)
            return false
    }

    return inputTypes.parameters.isNotEmpty()
            && inputTypes.name == null
            && valueDefinition.name == "ite"
            && valueDefinition.parameters.isNotEmpty()
}

fun isInstantiationConstructorName(name: String?) = name != null
        && name.startsWith("%") && !name.startsWith("%%")
fun isInstantiationParameterName(name: String?) = name != null
        && name.startsWith("%%")

fun isInstantiationName(name: String?) = isInstantiationParameterName(name) || isInstantiationConstructorName(name)

fun isInstantiationAliasMapping(function: SFunction): Boolean {
    if (function.parameters.size != 4)
        return false

    val instantiationName: SFunction = function.parameters[0]
    val parameters: SFunction = function.parameters[1]
    val type = function.parameters[2]
    val alias = function.parameters[3]

    listOf(instantiationName, parameters, type, alias).forEach {
        if (it.parameters.isNotEmpty())
            return false
    }

    listOf(instantiationName, type, alias).forEach {
        if (it.name == null)
            return false
    }

    if(parameters.name != null)
        return false


    return isInstantiationName(instantiationName.name)
            && alias.name?.count { it == '!' } == 2
}

fun isAliasDeclaration(function: SFunction): Boolean = function.name == "declare-fun"
        && function.parameters.size == 3
        // Contains exactly two !
        && function.parameters[0].name?.count { symbol -> symbol == '!'} == 2 && function.parameters[0].parameters.isEmpty()
        // has no input parameters
        && function.parameters[1].name == null && function.parameters[1].parameters.isEmpty()
        // Last parameter is potentially a type
        && function.parameters[2].name != null && function.parameters[2].parameters.isEmpty()


/*
    Previously
 */

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

fun generateTypeMapping(functions: List<SFunction>): List<ConstantInformation> {
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

fun getHumanReadable(functions: List<SFunction>, type: String, index: Int): String? {
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

// Could be a map as well but this allows throwing an exception instead of handling this individually each time
fun getVariableBaseForType(type: String): String {
    return when(type) {
        "NAryTree" -> "tree"
        "PLFormula" -> "formula"
        "Int" -> "n"
        "Real" -> "x"
        else -> throw UnknownTypeExpection(type)
    }
}

fun getVariableName(functions: List<SFunction>, type: String, index: Int): String? {
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
}

data class ConstantInformation(
    val symbol: String,
    val type: String,
    val index: Int,
    val variable: String?,
    val humanReadable: String?
)

fun printTree(tree: SFunction, level: Int) {

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

fun parseFullParenthesis(input: String): SFunction {
    val processedInput = input.trim().replace(Regex(";.*\n"), "").replace("\n", " ").trim()

    if(processedInput == "()")
        return SFunction(null, listOf())

    if(processedInput.isNotEmpty() && !processedInput.contains(Regex("\\s"))) {
        return SFunction(processedInput, listOf())
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


    val parameters: List<SFunction> = if(whitespaceSplit.size > 1) {
        parseParameters(whitespaceSplit.drop(parametersStart).joinToString(" "))
    } else {
        listOf()
    }

    return SFunction(
        functionName,
        parameters
    )

}

fun parseParameters(input: String): List<SFunction> {
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

data class SFunction(
    val name: String?,
    val parameters: List<SFunction> = LinkedList()
) {
    override fun toString(): String {
        if(parameters.isNotEmpty() && name == null)
            return "()"

        if(parameters.isEmpty() && name != null)
            return name

        return "( ${name}${parameters.map { it.toString() }.joinToString(" ")}${ if (parameters.isNotEmpty()) " " else "" })"
    }
}


data class CounterModel(
    val aliases: Set<Alias>,
    // Function Name -> value
    val values: Map<String, FunctionValue>
    )

data class Alias(
    val systemSymbol: String,
    val humanReadableSymbol: String,
    val type: String,
    val index: Int,
    val instantiation: String?,
)

data class FunctionValue (
    // Input as System Symbol -> value
    val valueMapping: Map<String, String>,
    val elseValue: String
)