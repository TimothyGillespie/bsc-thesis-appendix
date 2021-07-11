package eu.gillespie.bscthesis.request

import java.util.LinkedList
import eu.gillespie.bscthesis.request.Definition
import lombok.*

data class FunctionDefinition (
    var name: String,
    var arity: Int,
    var inputTypes: List<String> = LinkedList(),
    var outputType: String,
    var definition: Definition? = null
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as FunctionDefinition

        if (name != other.name) return false

        return true
    }

    override fun hashCode(): Int {
        return name.hashCode() ?: 0
    }
}