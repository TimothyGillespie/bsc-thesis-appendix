package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.model.*
import java.util.*

fun getListOfAllDefinitionsWithDetails(request: ProveStatementRequest): List<DefinitionWithDetails> {
    return request.functionDefinitions.map { getListOfDefinitionsWithDetails(it) }.flatten()
}

fun getListOfDefinitionsWithDetails(functionDefinition: FunctionDefinition): List<DefinitionWithDetails> {
    return  functionDefinition.definition
        .map{ convertDefinitionToFunctionDefinitionWithDetails(it, functionDefinition) }
}

fun convertDefinitionToFunctionDefinitionWithDetails(definition: Definition, functionDefinition: FunctionDefinition): DefinitionWithDetails {
    val detailContainer = DetailContainer(functionDefinition.name, functionDefinition.arity, functionDefinition.inputTypes, functionDefinition.outputType, definition.conditional, definition.otherwise)

    val inputConstructor = definition.inputConstructor
    if(inputConstructor != null)
        return InputConstructorDefinitionWithDetails(inputConstructor, detailContainer)

    val inputParameters = definition.inputVariable
    if(inputParameters != null)
        return InputVariablesDefinitionWithDetails(inputParameters, detailContainer)

    return BlankDefinitionDefinitionWithDetails(detailContainer)
}

data class DetailContainer(
    val name: String,
    val arity: Int,
    val inputTypes: List<String> = LinkedList(),
    val outputType: String,
    val conditional: List<ConditionalDefinition> = LinkedList(),
    val otherwise: StatementTreeVertex
)

interface DefinitionWithDetails {
    val details: DetailContainer
}

data class InputConstructorDefinitionWithDetails(
    val inputConstructor: InputConstructor,
    override val details: DetailContainer,
) : DefinitionWithDetails

data class InputVariablesDefinitionWithDetails(
    val inputVariables: List<String>,
    override val details: DetailContainer,
) : DefinitionWithDetails

data class BlankDefinitionDefinitionWithDetails(
    override val details: DetailContainer
) : DefinitionWithDetails


