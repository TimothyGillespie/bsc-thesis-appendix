package eu.gillespie.bscthesis.parseModel

data class CounterModel(
    val aliases: Set<Alias>,
    // Function Name -> value
    val values: Map<String, FunctionValue>
)

data class Alias(
    val systemSymbol: String,
    val humanReadableSymbol: String,
    val type: String,
    val index: Int,
    val instantiation: String?,
)

data class FunctionValue (
    // Input as System Symbol -> value
    val valueMapping: Map<String, String>,
    val elseValue: String,
    val inputType: String,
)