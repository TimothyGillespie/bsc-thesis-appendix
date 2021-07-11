package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.request.*
import eu.gillespie.bscthesis.smt.v20.model.SmtV20ForAll
import eu.gillespie.bscthesis.smt.v20.model.SmtV20NamedAssert
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20AssertableExpression
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression
import java.lang.RuntimeException

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
    if(functionDefinition.definition == null)
        return listOf()

    if(hasInputConstructor(functionDefinition))
        return generateDefinitionsWithInputConstructor(functionDefinition, request, constructorInstantiations)

    if(hasInputVariables(functionDefinition))
        return generateDefinitionsWithInputVariables(functionDefinition, request)

    return generateConstantDefinition(functionDefinition, request)
}



fun generateDefinitionsWithInputConstructor(
    functionDefinition: FunctionDefinition,
    request: ProveStatementRequest,
    constructorInstantiations: Map<String, ConstructorInstantiation>
): List<SmtV20TopLevelExpression> {
    val result = mutableListOf<SmtV20AssertableExpression>()
    val inputConstructor = functionDefinition.definition?.inputConstructor
        ?: throw RuntimeException("Input constructor is not defined")

    val leftHandSideInput = listOf(StatementTreeVertex(inputConstructor.name))
    var i: Int = 1

    for (singleConditional in functionDefinition.definition?.conditional ?: listOf()) {
        result.add(
            SmtV20NamedAssert(
                generateFunctionName(functionDefinition, i.toString()),
                applyConstructorInstantiation(
                    generateIfThenConditionalDefinition(
                        functionDefinition,
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
            generateFunctionName(functionDefinition, "Otherwise"),
            applyConstructorInstantiation(
                generateOtherwiseConditionalDefinition(functionDefinition, leftHandSideInput),
                constructorInstantiations,
                inputConstructor
            )
        )
    )

    return result
}

fun generateDefinitionsWithInputVariables(
    functionDefinition: FunctionDefinition,
    request: ProveStatementRequest,
): List<SmtV20TopLevelExpression> {
    val result = mutableListOf<SmtV20NamedAssert>()
    val inputVariables = functionDefinition.definition?.inputVariable
        ?: throw RuntimeException()

    val inputVariableTrees = inputVariables.map { StatementTreeVertex(it) }

    var i: Int = 1

    for (singleConditional in functionDefinition.definition?.conditional ?: listOf()) {

        result.add(
            SmtV20NamedAssert(
                generateFunctionName(functionDefinition, i.toString()),
                generateIfThenConditionalDefinition(
                    functionDefinition,
                    singleConditional,
                    inputVariableTrees,
                )
            )
        )

        i++
    }

    result.add(
        SmtV20NamedAssert(
            generateFunctionName(functionDefinition, "Otherwise"),
            generateOtherwiseConditionalDefinition(functionDefinition, inputVariableTrees)
        )
    )

    val variableBindings = inputVariables.zip(functionDefinition.inputTypes).toMap()


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
    functionDefinition: FunctionDefinition,
    request: ProveStatementRequest
): List<SmtV20TopLevelExpression> {
    val result = mutableListOf<SmtV20AssertableExpression>()

    var i: Int = 1

    for (singleConditional in functionDefinition.definition?.conditional ?: listOf()) {
        result.add(
            SmtV20NamedAssert(
                generateFunctionName(functionDefinition, i.toString()),
                generateIfThenConditionalDefinition(
                    functionDefinition,
                    singleConditional,
                    listOf(),
                )
            )
        )

        i++
    }

    result.add(
        SmtV20NamedAssert(
            generateFunctionName(functionDefinition, "Otherwise"),
            generateOtherwiseConditionalDefinition(functionDefinition, listOf())
        )
    )

    return result
}

fun generateIfThenConditionalDefinition(functionDefinition: FunctionDefinition, conditionalDefinition: ConditionalDefinition, leftHandSideInput: List<StatementTreeVertex>): StatementTreeVertex {
    val valueDefinition = generateValueDefinition(functionDefinition, conditionalDefinition.then, leftHandSideInput)
    val conditionalValueDefinition = generateIfThenDefinition(conditionalDefinition.condition, valueDefinition)
    return conditionalValueDefinition
}

fun generateOtherwiseConditionalDefinition(functionDefinition: FunctionDefinition, leftHandSideInput: List<StatementTreeVertex>): StatementTreeVertex {
    if(functionDefinition.definition == null)
        throw RuntimeException()

    val usedConditions: List<StatementTreeVertex> = functionDefinition.definition!!.conditional.map {
        it.condition
    }
    val valueDefinition = generateValueDefinition(functionDefinition, functionDefinition.definition!!.otherwise, leftHandSideInput)
    val conditionalValueDefinition = generateOtherwiseDefinition(usedConditions, valueDefinition)
    return conditionalValueDefinition
}

//fun generateConditionalOtherwiseDefinition(functionDefinition: FunctionDefinition, leftHandSideInput: List<StatementTreeVertex>)

fun generateValueDefinition(functionDefinition: FunctionDefinition, value: StatementTreeVertex, leftHandSideInput: List<StatementTreeVertex>): StatementTreeVertex {
    val leftHandSide = StatementTreeVertex(
        functionDefinition.name,
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

fun generateFunctionName(definition: FunctionDefinition, postFix: String): String {
    return "definition${definition.name.replaceFirstChar { c -> c.uppercase() }}Arity${definition.arity}InputTypes${definition.inputTypes.joinToString("")}OutputType${definition.outputType}${postFix}"
}