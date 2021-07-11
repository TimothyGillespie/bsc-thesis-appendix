package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.request.FunctionDefinition
import eu.gillespie.bscthesis.request.InputConstructor
import eu.gillespie.bscthesis.request.StatementTreeVertex
import eu.gillespie.bscthesis.statementtreetransform.replaceInTree
import java.lang.RuntimeException

fun applyConstructorInstantiation(tree: StatementTreeVertex, constructorInstantiation: Map<String, ConstructorInstantiation>, inputConstructor: InputConstructor): StatementTreeVertex {
    val applicableConstructorInstantiation = constructorInstantiation[inputConstructor.name]
        ?: throw RuntimeException("Could not find instantiation for input constructor ${inputConstructor.name}/${inputConstructor.arity}")

    val replacementMapping: Map<String, String> = inputConstructor.boundVariables.zip(applicableConstructorInstantiation.parameters).toMutableList()
        .apply { add(Pair(inputConstructor.name, applicableConstructorInstantiation.constructor)) }
        .toMap()

    var resultTree = tree.createClone()

    for ( (previous, instantiation) in replacementMapping) {
        resultTree = replaceInTree(resultTree, previous, StatementTreeVertex(instantiation))
    }

    return resultTree

}