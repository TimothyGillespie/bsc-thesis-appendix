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


        val counterModel = parseCounterModel(tree.parameters)
        println()
        println(counterModelToHumanReadableTypeDeclaration(counterModel))
        println()
        println(counterModelToHumanReadableConstructedStructuresDefinition(counterModel))
        println()
        println(counterModelToHumanReadableFunctionValuesProbes(counterModel).joinToString("\n\n"))
        println()
    }

}


fun counterModelToHumanReadableTypeDeclaration(model: CounterModel): String {
    return model.aliases
        .asSequence()
        .filter { it.instantiation?.startsWith("%%") ?: false }
        .sortedBy { it.index }
        .groupBy { it.type }
        .map { it.value.map { aliases -> aliases.humanReadableSymbol }.joinToString(", ") + " ∈ ${it.key}" }
        .joinToString("\n")
}

fun counterModelToHumanReadableConstructedStructuresDefinition(model: CounterModel): String {
    val aliasesToDefine = model.aliases
        .asSequence()
        .filter { it.instantiation?.startsWith("%") ?: false && !isInstantiationParameterName(it.instantiation)}
        .sortedBy { it.index }

    val sb = StringBuilder()

    aliasesToDefine.forEach {
        val relevantAliases = model.aliases
            .asSequence()
            .filter { relAlias ->  relAlias.instantiation?.startsWith("%${it.instantiation}") ?: false }
            .sortedBy { relAlias -> relAlias.instantiation?.split("_")?.last()?.removePrefix("x")?.toInt() }

        val split = it.instantiation?.removePrefix("%")?.split("/")
        val constructorName = split?.subList(0, split.lastIndex)?.joinToString("")

        val parameters = relevantAliases
            .map { it.humanReadableSymbol }
            .joinToString(", ")

        sb.append("\n")
        sb.append("${it.humanReadableSymbol} = ${constructorName}(${parameters})")
    }

    return sb.toString().removePrefix("\n")
}

fun counterModelToHumanReadableFunctionValuesProbes(model: CounterModel): List<String> {
    val aliasTypeMap = model.aliases.groupBy { it.type }

    return model.values.map { entry ->
        val aliasesToDefine = aliasTypeMap[entry.value.inputType] ?: listOf()

        aliasesToDefine.sortedBy { it.index }.map { alias ->
            val valueForAlias = entry.value.valueMapping[alias.systemSymbol] ?: entry.value.elseValue
            "${entry.key}(${alias.humanReadableSymbol}) = $valueForAlias"
        }.joinToString("\n")
    }
}

fun parseCounterModel(functions: List<SFunction>): CounterModel {
    val filteredFunctions = functions.filter { isRelevantForCounterHumanReadableCounterModel(it) }

    val aliasDeclarationFunctions = filteredFunctions.filter { isAliasDeclaration(it) }
    val instantiationAliasMappings = filteredFunctions
        .filter { isInstantiationAliasMapping(it) }
        .map { it.parameters[3].name to it.parameters[0].name }.toMap()

    val aliases = aliasDeclarationFunctions.map {
        val systemSymbol = it.parameters[0].name ?: throw SyntaxException("Alias system symbol was unexpectedly null")
        val index = systemSymbol.split("!")[2].toInt()
        val type = it.parameters[2].name ?: throw SyntaxException("Alias did not specify a type unexpectedly")

        Alias(
            systemSymbol,
            getVariableBaseForType(type) + index,
            type,
            index,
            instantiationAliasMappings[systemSymbol]
        )
    }.toSet()

    val values: Map<String, FunctionValue> = filteredFunctions
        .filter { isFunctionValueDefinition(it) }
        .map {
            val functionName = it.parameters[0].name ?: SyntaxException("Function name was null")
            val (valueMapping, otherwise) = parseIfThenElse(it.parameters[3])
            val inputType = it.parameters[1].parameters[0].parameters[0].name ?: "Unknown"

            (functionName as String) to FunctionValue(valueMapping, otherwise, inputType)
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

        return "( ${name}${ if (name != null) " " else "" }${parameters.map { it.toString() }.joinToString(" ")}${ if (parameters.isNotEmpty()) " " else "" })"
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
    val elseValue: String,
    val inputType: String,
)