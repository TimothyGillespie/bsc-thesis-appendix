package eu.gillespie.bscthesis.parseModel

import java.util.*

data class SFunction(
    val name: String?,
    val parameters: List<SFunction> = LinkedList()
) {
    override fun toString(): String {
        if(parameters.isNotEmpty() && name == null)
            return "()"

        if(parameters.isEmpty() && name != null)
            return name

        return "( ${name}${ if (name != null) " " else "" }${parameters.map { it.toString() }.joinToString(" ")}${ if (parameters.isNotEmpty()) " " else "" })"
    }
}