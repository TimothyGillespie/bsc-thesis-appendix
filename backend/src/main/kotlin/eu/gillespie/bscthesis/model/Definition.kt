package eu.gillespie.bscthesis.model

import java.util.LinkedList

data class Definition (
    var inputVariable: List<String>? = null,
    var inputConstructor: InputConstructor? = null,
    var conditional: List<ConditionalDefinition> = LinkedList(),
    var otherwise: StatementTreeVertex,
)