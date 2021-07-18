package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.request.ProveStatementRequest
import eu.gillespie.bscthesis.request.StatementTreeVertex
import eu.gillespie.bscthesis.smt.v20.model.SmtV20NamedAssert
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression
import eu.gillespie.bscthesis.statementtreetransform.replaceInTree

fun generateInductiveProperties(request: ProveStatementRequest, constructorInstantiation: Map<String, ConstructorInstantiation>): List<SmtV20TopLevelExpression> {
    val result = HashSet<StatementTreeVertex>()
    val statementTree = request.statementTree.createClone()

    for((constructorFunctionSymbol, instantiation) in constructorInstantiation) {
        for (instantiatedParameter in instantiation.parameters) {
            request.constructorDefinitions.forEach {
                if (it.functions.find { function -> function.symbol == constructorFunctionSymbol } != null)
                    result.add(
                        replaceInTree(
                            statementTree,
                            it.term,
                            StatementTreeVertex(instantiatedParameter)
                        )
                    )
            }
        }
    }

    return result.mapIndexed { i, it -> SmtV20NamedAssert("inductionAssumption$i", it) }
}