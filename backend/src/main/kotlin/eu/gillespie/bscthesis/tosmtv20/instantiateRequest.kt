package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.request.ProveStatementRequest
import eu.gillespie.bscthesis.request.StatementTreeVertex
import eu.gillespie.bscthesis.statementtreetransform.replaceInTree

fun instantiateRequest(request: ProveStatementRequest, constructorInstantiation: Map<String, ConstructorInstantiation>) {
    instantiateStatementTree(request, constructorInstantiation)
}

fun instantiateStatementTree(request: ProveStatementRequest, constructorInstantiation: Map<String, ConstructorInstantiation>) {
    constructorInstantiation.forEach { (key, value) ->
        request.statementTree = replaceInTree(request.statementTree, key, StatementTreeVertex(value.constructor))
    }
}
