package eu.gillespie.bscthesis.parseModel

import eu.gillespie.bscthesis.exceptions.SyntaxException
import eu.gillespie.bscthesis.exceptions.UnknownTypeException
import eu.gillespie.bscthesis.information.AvailableTypes
import eu.gillespie.bscthesis.model.SFunction

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
            getVariableBaseForType(AvailableTypes.valueOf(type)) + index,
            type,
            index,
            instantiationAliasMappings[systemSymbol]
        )
    }.toSet()

    val values: Map<String, FunctionValue> = filteredFunctions
        .filter { isFunctionValueDefinition(it) && parseIfThenElse(it.parameters[3]) != null }
        .map {
            val functionName = it.parameters[0].name ?: SyntaxException("Function name was null")
            val (valueMapping, otherwise) = parseIfThenElse(it.parameters[3])!!
            val inputType = it.parameters[1].parameters[0].parameters[0].name ?: "Unknown"

            (functionName as String) to FunctionValue(valueMapping, otherwise, inputType)
        }.toMap()

    return CounterModel(aliases, values)
}

fun parseIfThenElse(ite: SFunction, previousMapping: Map<String, String> = mapOf()): Pair<Map<String, String>, String>? {
    if(ite.name != "ite")
        return Pair(previousMapping, ite.toString())

    val condition = ite.parameters[0]
    val then = ite.parameters[1]
    val otherwise = ite.parameters[2]

    // This is the case with functions which like max
    if(condition.name != "=") {
        return null
//        throw SyntaxException("ITE function did not use equality.")
    }

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
fun getVariableBaseForType(type: AvailableTypes): String {
    return when(type) {
        AvailableTypes.NAryTree -> "tree"
        AvailableTypes.PLFormula -> "formula"
        AvailableTypes.IntegerNumber -> "n"
        AvailableTypes.RealNumber -> "x"
        else -> throw UnknownTypeException(type)
    }
}