package eu.gillespie.bscthesis.model

enum class InfixOperator(
    val z3Symbol: String,
    val priority: Int,
    val humanReadableSymbol: String? = null
) {
    ADDITION("+", 1),
    SUBSTRACTION("-", 1),

    DIVISION("/", 0),
    MULTIPLICATION("*", 0),

    EQUALITY("=", 2),
    GREATER(">", 2),
    LESS("<", 2),
    GEQ(">=", 2, "≥"),
    LEQ("=<", 2, "≤"),

    AND("and", 3, "∧"),
    OR("or", 3, "∨"),
    XOR("xor", 3, "⊻"),
    IMPLICATION("=>", 3, "⟹"),
    REVERSED_IMPLICATION("<=", 3, "⟸"),
    EQUIVALENCE("<=>", 3, "⟺");

    companion object {
        fun byZ3Symbol(symbol: String): InfixOperator? {
            return InfixOperator.values().find { it.z3Symbol.lowercase() == symbol.lowercase() }
        }

        fun isZ3Symbol(symbol: String): Boolean {
            return byZ3Symbol(symbol) != null
        }
    }

    override fun toString(): String {
        return humanReadableSymbol ?: z3Symbol
    }

}
