package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.model.ConditionalDefinition
import eu.gillespie.bscthesis.model.FunctionDefinition
import eu.gillespie.bscthesis.model.ProveStatementRequest
import eu.gillespie.bscthesis.model.StatementTreeVertex
import eu.gillespie.bscthesis.smt.v20.model.SmtV20ForAll
import eu.gillespie.bscthesis.smt.v20.model.SmtV20NamedAssert
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20AssertableExpression
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression
import java.lang.IllegalStateException

fun generateFunctionDefinitions(request: ProveStatementRequest, constructorInstantiations: Map<String, ConstructorInstantiation>): List<SmtV20TopLevelExpression> {
    return request.functionDefinitions
        .map { definition -> generateDefinitionsForSingleFunctionDefinition(definition, request, constructorInstantiations) }
        .flatten()
}

fun generateDefinitionsForSingleFunctionDefinition(
    functionDefinition: FunctionDefinition,
    request: ProveStatementRequest,
    constructorInstantiations: Map<String, ConstructorInstantiation>
): List<SmtV20TopLevelExpression> {
    val listOfDefinitions = getListOfDefinitionsWithDetails(functionDefinition)
    return listOfDefinitions.mapIndexed { i, it -> generateDefinitionForSingleDefinitionWithDetails(it, request, constructorInstantiations, i + 1)} .flatten()
}

fun generateDefinitionForSingleDefinitionWithDetails(definitionWithDetails: DefinitionWithDetails, request: ProveStatementRequest, constructorInstantiations: Map<String, ConstructorInstantiation>, definitionCount: Int): List<SmtV20TopLevelExpression> {
    if(definitionWithDetails is InputConstructorDefinitionWithDetails)
        return generateDefinitionsWithInputConstructor(definitionWithDetails, request, constructorInstantiations, definitionCount)

    if(definitionWithDetails is InputVariablesDefinitionWithDetails)
        return generateDefinitionsWithInputVariables(definitionWithDetails, request, definitionCount)

    if(definitionWithDetails is BlankDefinitionDefinitionWithDetails)
        return generateConstantDefinition(definitionWithDetails, request, definitionCount)

    throw IllegalStateException("Unknown DefinitionWithDetail Object")
}



fun generateDefinitionsWithInputConstructor(
    definition: InputConstructorDefinitionWithDetails,
    request: ProveStatementRequest,
    constructorInstantiations: Map<String, ConstructorInstantiation>,
    definitionCount: Int
): List<SmtV20TopLevelExpression> {
    val result = mutableListOf<SmtV20AssertableExpression>()
    val inputConstructor = definition.inputConstructor

    val leftHandSideInput = listOf(StatementTreeVertex(inputConstructor.name))
    var i = 1

    for (singleConditional in definition.details.conditional) {
        result.add(
            SmtV20NamedAssert(
                generateFunctionName(definition, i.toString(), definitionCount),
                applyConstructorInstantiation(
                    generateIfThenConditionalDefinition(
                        definition,
                        singleConditional,
                        leftHandSideInput,
                    ),
                    constructorInstantiations,
                    inputConstructor
                )
            )
        )

        i++
    }

    result.add(
        SmtV20NamedAssert(
            generateFunctionName(definition, "Otherwise", definitionCount),
            applyConstructorInstantiation(
                generateOtherwiseConditionalDefinition(definition, leftHandSideInput),
                constructorInstantiations,
                inputConstructor
            )
        )
    )

    return result
}

fun generateDefinitionsWithInputVariables(
    definition: InputVariablesDefinitionWithDetails,
    request: ProveStatementRequest,
    definitionCount: Int
): List<SmtV20TopLevelExpression> {
    val result = mutableListOf<SmtV20NamedAssert>()
    val inputVariableTrees = definition.inputVariables.map { StatementTreeVertex(it) }

    var i: Int = 1

    for (singleConditional in definition.details.conditional ) {

        result.add(
            SmtV20NamedAssert(
                generateFunctionName(definition, i.toString(), definitionCount),
                generateIfThenConditionalDefinition(
                    definition,
                    singleConditional,
                    inputVariableTrees,
                )
            )
        )

        i++
    }

    result.add(
        SmtV20NamedAssert(
            generateFunctionName(definition, "Otherwise", definitionCount),
            generateOtherwiseConditionalDefinition(definition, inputVariableTrees)
        )
    )

    val variableBindings = definition.inputVariables.zip(definition.details.inputTypes).toMap()


    return result.map {
        SmtV20NamedAssert(
            it.name,
            SmtV20ForAll(
                it.assertion,
                variableBindings
            )
        )
    }
}


fun generateConstantDefinition(
    definition: BlankDefinitionDefinitionWithDetails,
    request: ProveStatementRequest,
    definitionCount: Int
): List<SmtV20TopLevelExpression> {
    val result = mutableListOf<SmtV20AssertableExpression>()

    var i = 1

    for (singleConditional in definition.details.conditional) {
        result.add(
            SmtV20NamedAssert(
                generateFunctionName(definition, i.toString(), definitionCount),
                generateIfThenConditionalDefinition(
                    definition,
                    singleConditional,
                    listOf(),
                )
            )
        )

        i++
    }

    result.add(
        SmtV20NamedAssert(
            generateFunctionName(definition, "Otherwise", definitionCount),
            generateOtherwiseConditionalDefinition(definition, listOf())
        )
    )

    return result
}

fun generateIfThenConditionalDefinition(definition: DefinitionWithDetails, conditionalDefinition: ConditionalDefinition, leftHandSideInput: List<StatementTreeVertex>): StatementTreeVertex {
    val valueDefinition = generateValueDefinition(definition, conditionalDefinition.then, leftHandSideInput)
    val conditionalValueDefinition = generateIfThenDefinition(conditionalDefinition.condition, valueDefinition)
    return conditionalValueDefinition
}

fun generateOtherwiseConditionalDefinition(definition: DefinitionWithDetails, leftHandSideInput: List<StatementTreeVertex>): StatementTreeVertex {
    val usedConditions: List<StatementTreeVertex> = definition.details.conditional.map {
        it.condition
    }
    val valueDefinition = generateValueDefinition(definition, definition.details.otherwise, leftHandSideInput)
    val conditionalValueDefinition = generateOtherwiseDefinition(usedConditions, valueDefinition)
    return conditionalValueDefinition
}

//fun generateConditionalOtherwiseDefinition(functionDefinition: FunctionDefinition, leftHandSideInput: List<StatementTreeVertex>)

fun generateValueDefinition(definition: DefinitionWithDetails, value: StatementTreeVertex, leftHandSideInput: List<StatementTreeVertex>): StatementTreeVertex {
    val leftHandSide = StatementTreeVertex(
        definition.details.name,
        leftHandSideInput
    )

    val rightHandSide = value

    return StatementTreeVertex(
        "=",
        listOf(leftHandSide, rightHandSide)
    )
}

fun generateIfThenDefinition(condition: StatementTreeVertex, valueDefinition: StatementTreeVertex): StatementTreeVertex {
    return StatementTreeVertex(
        "=>",
        listOf(condition, valueDefinition)
    )
}

fun generateOtherwiseDefinition(usedConditions: List<StatementTreeVertex>, valueDefinition: StatementTreeVertex): StatementTreeVertex {
    if(usedConditions.size > 1) {
        val negatedConditions = StatementTreeVertex(
            "not",
            listOf(
                StatementTreeVertex(
                    "and",
                    usedConditions
                )
            )
        )

        return generateIfThenDefinition(negatedConditions, valueDefinition)
    }

    if(usedConditions.size == 1) {
        val negatedConditions = StatementTreeVertex(
            "not",
            usedConditions
        )

        return generateIfThenDefinition(negatedConditions, valueDefinition)
    }


    return valueDefinition
}

fun generateFunctionName(definition: DefinitionWithDetails, postFix: String, definitionCount: Int): String {
    return "definition${definition.details.name.replaceFirstChar { c -> c.uppercase() }}Number${definitionCount}Arity${definition.details.arity}InputTypes${definition.details.inputTypes.joinToString("")}OutputType${definition.details.outputType}${postFix}"
}