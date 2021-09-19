package eu.gillespie.bscthesis

import eu.gillespie.bscthesis.model.StatementTreeVertex

fun main() {

    val tree = StatementTreeVertex(
        "=",
        listOf(
            StatementTreeVertex("c", listOf(
                StatementTreeVertex("u", listOf(StatementTreeVertex("x"))),
                StatementTreeVertex("v")
            )),
            StatementTreeVertex("u")
        )
    )

//    println(tree)
//    println(replaceInTree(tree, "u", StatementTreeVertex("v")))
//    println(replaceInTree(tree, StatementTreeVertex("u", listOf(StatementTreeVertex("x"))), StatementTreeVertex("v")))
}