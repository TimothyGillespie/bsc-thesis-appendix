package eu.gillespie.bscthesis.model

import eu.gillespie.bscthesis.information.AvailableTypes
import java.util.LinkedList

data class FunctionDefinition (
    var name: String,
    var arity: Int,
    var inputTypes: List<AvailableTypes> = LinkedList(),
    var outputType: AvailableTypes,
    var definition: List<Definition> = LinkedList()
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as FunctionDefinition

        if (name != other.name) return false

        return true
    }

    override fun hashCode(): Int {
        return name.hashCode()
    }
}