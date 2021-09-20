package eu.gillespie.bscthesis.information

enum class AvailableTypes(val smtName: String, val displayName: String) {
    IntegerNumber("Int", "integer"),
    RealNumber("Real", "real number"),
    NAryTree("NAryTree", "n-ary tree"),
    PLFormula("PLFormula", "formula");

    fun toTypeDescription() = TypeDescription(smtName, displayName)
}

data class TypeDescription(
    val smtName: String,
    val displayName: String,
)