package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.request.ProveStatementRequest
import eu.gillespie.bscthesis.request.StatementTreeVertex
import eu.gillespie.bscthesis.smt.v20.model.SmtV20NamedAssert
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression
import eu.gillespie.bscthesis.statementtreetransform.replaceInTree
import java.lang.RuntimeException

fun getSortSpecificConstraints(request: ProveStatementRequest, constructorInstantiation: Map<String, ConstructorInstantiation>): List<SmtV20TopLevelExpression> {
    return extractAllCustomTypes(request).map { getSortSpecificConstraints(it, request, constructorInstantiation) }.flatMap { it }
}

fun getSortSpecificConstraints(sort: String, request: ProveStatementRequest, constructorInstantiation: Map<String, ConstructorInstantiation>): List<SmtV20TopLevelExpression> {
    when(sort) {
        "NAryTree" -> return loadNAryTreeConstraints(request, constructorInstantiation)
        "NonEmptyNAryTree" -> return loadNonEmptyNAryTreeConstraints(request, constructorInstantiation)
        else -> throw RuntimeException("Unknown sort ${sort} was given")
    }
}

val tree = StatementTreeVertex("%tree")
val treeSub = StatementTreeVertex("%tree_sub")

val nonRecursive = listOf(
    StatementTreeVertex(
        "not",
        listOf(
            StatementTreeVertex(
                "=",
                listOf(tree, treeSub)
            )
        )
    )
)

val treeConstraints = nonRecursive

fun loadNAryTreeConstraints(request: ProveStatementRequest, constructorInstantiation: Map<String, ConstructorInstantiation>): List<SmtV20TopLevelExpression> {
    val result = mutableSetOf<StatementTreeVertex>()

    for((_, singleInstantiation) in constructorInstantiation) {
        if(singleInstantiation.type != "NAryTree")
            continue

        for(singleParameter in singleInstantiation.parameters)
            for (singleConstraint in treeConstraints) {
                result.add(
                    replaceInTree(
                        replaceInTree(singleConstraint, "%tree", StatementTreeVertex(singleInstantiation.constructor)),
                    "%tree_sub",
                    StatementTreeVertex(singleParameter)
                    )
                )
            }
    }

    return result.map { SmtV20NamedAssert(null, it) }
}

fun loadNonEmptyNAryTreeConstraints(request: ProveStatementRequest, constructorInstantiation: Map<String, ConstructorInstantiation>): List<SmtV20TopLevelExpression> {
    return listOf()
}