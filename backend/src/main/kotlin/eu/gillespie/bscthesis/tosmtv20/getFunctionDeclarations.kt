package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.model.FunctionDefinition
import eu.gillespie.bscthesis.model.ProveStatementRequest
import eu.gillespie.bscthesis.model.smt.v20.SmtV20DeclareFunction
import java.util.*

fun getFunctionDeclarations(request: ProveStatementRequest): List<SmtV20DeclareFunction> {
    return getFunctionDeclarations(request.functionDefinitions)
}

fun getFunctionDeclarations(functionDefinitions: Collection<FunctionDefinition>): List<SmtV20DeclareFunction> {
    return functionDefinitions.map { getSingleFunctionDeclaration(it) }
}

fun getSingleFunctionDeclaration(functionDefinition: FunctionDefinition): SmtV20DeclareFunction {
    return SmtV20DeclareFunction(
        functionDefinition.name,
        functionDefinition.outputType,
        *functionDefinition.inputTypes.toTypedArray()
    )
}

fun generateFunctionDeclarationsFromConstructorInstantiation(instantiations: Map<String, ConstructorInstantiation>): List<SmtV20DeclareFunction> {
    val result = LinkedList<SmtV20DeclareFunction>()

    instantiations.forEach { _, value ->
        result.add(SmtV20DeclareFunction(value.constructor, value.type))
        result.addAll(value.parameters.map { singleParameter ->
            SmtV20DeclareFunction(singleParameter, value.type)
        })
    }

    return result
}

