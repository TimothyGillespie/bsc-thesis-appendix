package eu.gillespie.bscthesis.statementtreetransform

import eu.gillespie.bscthesis.request.StatementTreeVertex

fun replaceInTree(tree: StatementTreeVertex, toReplace: StatementTreeVertex, replaceWith: StatementTreeVertex): StatementTreeVertex {
    val treeCopy: StatementTreeVertex = tree.createClone();

    if(treeCopy == toReplace)
        return replaceWith.createClone()

    treeCopy.parameters = treeCopy.parameters.map {
        replaceInTree(it, toReplace, replaceWith)
    }

    return treeCopy
}

fun replaceInTree(tree: StatementTreeVertex, toReplace: String, replaceWith: StatementTreeVertex): StatementTreeVertex {
    val treeCopy: StatementTreeVertex = tree.createClone()

    if(treeCopy.symbol == toReplace)
        return replaceWith.createClone()

    treeCopy.parameters = treeCopy.parameters.map {
        replaceInTree(it, toReplace, replaceWith)
    }

    return treeCopy
}