package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.request.ProveStatementRequest
import eu.gillespie.bscthesis.request.StatementTreeVertex
import eu.gillespie.bscthesis.statementtreetransform.replaceInTree

fun instantiateRequest(request: ProveStatementRequest, constructorInstantiation: Map<String, ConstructorInstantiation>) {
    instantiateStatementTree(request, constructorInstantiation)
}

fun instantiateByConstructorTerm(tree :StatementTreeVertex, request: ProveStatementRequest, constructorInstantiation: Map<String, ConstructorInstantiation>): StatementTreeVertex {
    var resultTree = tree.createClone()
    constructorInstantiation.forEach { (key, value) ->
        request.constructorDefinitions.forEach {
            if(it.functions.find { function -> function.symbol == key} != null)
                resultTree = replaceInTree(resultTree, it.term, StatementTreeVertex(value.constructor))
        }
    }
    return resultTree
}

fun instantiateStatementTree(request: ProveStatementRequest, constructorInstantiation: Map<String, ConstructorInstantiation>) {
    request.statementTree = instantiateByConstructorTerm(request.statementTree, request, constructorInstantiation)
}
