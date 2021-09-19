package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.model.ProveStatementRequest
import eu.gillespie.bscthesis.model.StatementTreeVertex
import eu.gillespie.bscthesis.model.smt.v20.SmtV20NamedAssert
import eu.gillespie.bscthesis.model.smt.v20.interfaces.SmtV20TopLevelExpression
import eu.gillespie.bscthesis.statementtreetransform.replaceInTree

fun generateStatementToProof(request: ProveStatementRequest, constructorInstantiation: Map<String, ConstructorInstantiation>): SmtV20TopLevelExpression {
    var results = mutableSetOf<StatementTreeVertex>(request.statementTree.createClone())
    var newResults = mutableSetOf<StatementTreeVertex>()


    for(currentConstructorDef in request.constructorDefinitions) {
        for(singleTree in results) {
            for( singleConstructorFunc in currentConstructorDef.functions) {
                if(singleConstructorFunc.arity == 0)
                    continue

                val respectiveInstantiation = constructorInstantiation[singleConstructorFunc.symbol]
                if(respectiveInstantiation != null)
                    newResults.add(
                        replaceInTree(
                        singleTree,
                        currentConstructorDef.term,
                        StatementTreeVertex(respectiveInstantiation.constructor)
                    )
                    )
            }
        }

        results = newResults
        newResults = mutableSetOf()
    }

    val resultList = results.toList();

    return SmtV20NamedAssert(
        "statementToProve",
        StatementTreeVertex(
            "not",
            if(results.size >= 2)
                listOf(StatementTreeVertex("and", resultList))
            else
                resultList
        )
    )
}