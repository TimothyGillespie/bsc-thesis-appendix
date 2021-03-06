package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.information.AvailableTypes
import eu.gillespie.bscthesis.model.ProveStatementRequest
import eu.gillespie.bscthesis.model.StatementTreeVertex
import eu.gillespie.bscthesis.model.smt.v20.SmtV20NamedAssert
import eu.gillespie.bscthesis.model.smt.v20.interfaces.SmtV20TopLevelExpression
import eu.gillespie.bscthesis.statementtreetransform.replaceInTree
import java.lang.RuntimeException

fun getSortSpecificConstraints(request: ProveStatementRequest, constructorInstantiation: Map<String, ConstructorInstantiation>): List<SmtV20TopLevelExpression> {
    return extractAllCustomTypes(request).map { getSortSpecificConstraints(it, request, constructorInstantiation) }.flatten()
}

fun getSortSpecificConstraints(sort: AvailableTypes, request: ProveStatementRequest, constructorInstantiation: Map<String, ConstructorInstantiation>): List<SmtV20TopLevelExpression> {
    return when(sort) {
        AvailableTypes.NAryTree -> loadNAryTreeConstraints(request, constructorInstantiation)
//        AvailableTypes.NonEmptyNAryTree -> loadNonEmptyNAryTreeConstraints(request, constructorInstantiation)
        AvailableTypes.PLFormula -> loadPLFormulaConstraints(request, constructorInstantiation)
        else -> throw RuntimeException("Unknown sort ${sort.toTypeDescription()} was given")
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
        if(singleInstantiation.type != AvailableTypes.NAryTree)
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

//fun loadNonEmptyNAryTreeConstraints(request: ProveStatementRequest, constructorInstantiation: Map<String, ConstructorInstantiation>): List<SmtV20TopLevelExpression> {
//    val result = mutableSetOf<StatementTreeVertex>()
//
//    for((_, singleInstantiation) in constructorInstantiation) {
//        if(singleInstantiation.type != AvailableTypes.NonEmptyNAryTree)
//            continue
//
//        for(singleParameter in singleInstantiation.parameters)
//            for (singleConstraint in treeConstraints) {
//                result.add(
//                    replaceInTree(
//                        replaceInTree(singleConstraint, "%tree", StatementTreeVertex(singleInstantiation.constructor)),
//                        "%tree_sub",
//                        StatementTreeVertex(singleParameter)
//                    )
//                )
//            }
//    }
//
//    //  unary can be ignored as it is always consistent
//    val binaryOrMoreInstantiations = constructorInstantiation.filter { it.value.type == AvailableTypes.NonEmptyNAryTree && it.value.parameters.size >= 2 }.values;
//    val nularyInstantiations = constructorInstantiation.filter { it.value.type == AvailableTypes.NonEmptyNAryTree && it.value.parameters.isEmpty() }.values;
//
//
//    if(nularyInstantiations.isNotEmpty())
//        for(singleInstantiation in binaryOrMoreInstantiations) {
//            val equalityTerms = singleInstantiation.parameters.map { parentParameter ->
//                if(nularyInstantiations.size >= 2) {
//                    return@map StatementTreeVertex(
//                        "or",
//                        nularyInstantiations.map { nullary ->
//                            StatementTreeVertex(
//                                "=",
//                                listOf(
//                                    StatementTreeVertex(parentParameter),
//                                    StatementTreeVertex(nullary.constructor)
//                                )
//                            )
//                        }
//                    )
//                }
//                StatementTreeVertex(
//                    "=",
//                    listOf(
//                        StatementTreeVertex(parentParameter),
//                        StatementTreeVertex(nularyInstantiations.first().constructor)
//                    )
//                )
//            }.toList()
//
//            result.add(StatementTreeVertex(
//                "and",
//                    listOf(
//                        StatementTreeVertex(
//                            "=>",
//                            equalityTerms
//                        ),
//                        StatementTreeVertex(
//                            "=>",
//                            equalityTerms.reversed()
//                        )
//                    )
//            ))
//        }
//
//    return result.map { SmtV20NamedAssert(null, it) }
//}

fun loadPLFormulaConstraints(request: ProveStatementRequest, constructorInstantiation: Map<String, ConstructorInstantiation>): List<SmtV20TopLevelExpression> {
    val result = mutableSetOf<StatementTreeVertex>()

    for((_, singleInstantiation) in constructorInstantiation) {
        if(singleInstantiation.type != AvailableTypes.PLFormula)
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

    val constructorsSymbols = constructorInstantiation.values.filter { it.type == AvailableTypes.PLFormula }.map { it.constructor }
    val pairwiseMatch = mutableSetOf<Pair<String, String>>()

    for(i in 0..constructorsSymbols.size - 1) {
        val firstSymbol = constructorsSymbols.get(i)
        for(k in i+1..constructorsSymbols.size - 1) {
            val secondSymbol = constructorsSymbols.get(k)
            pairwiseMatch.add(Pair(firstSymbol, secondSymbol))
        }
    }

    result.addAll(pairwiseMatch.map {
        StatementTreeVertex(
            "not",
            listOf(
                StatementTreeVertex(
                    "=",
                    listOf(StatementTreeVertex(it.first), StatementTreeVertex(it.second))
                )
            )
        )
    })

    return result.map { SmtV20NamedAssert(null, it) }
}