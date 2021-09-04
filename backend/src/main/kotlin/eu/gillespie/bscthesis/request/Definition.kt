package eu.gillespie.bscthesis.request

import eu.gillespie.bscthesis.request.InputConstructor
import eu.gillespie.bscthesis.request.ConditionalDefinition
import java.util.LinkedList
import eu.gillespie.bscthesis.request.StatementTreeVertex

data class Definition (
    var inputVariable: List<String>? = null,
    var inputConstructor: InputConstructor? = null,
    var conditional: List<ConditionalDefinition> = LinkedList(),
    var otherwise: StatementTreeVertex,
)