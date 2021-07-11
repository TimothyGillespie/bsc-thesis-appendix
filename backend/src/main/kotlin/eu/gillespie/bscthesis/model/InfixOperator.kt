package eu.gillespie.bscthesis.model

enum class InfixOperator(
    val z3Symbol: String,
    val priority: Int,
    val humanReadableSymbol: String? = null
) {
    ADDITION("+", 0),
    SUBSTRACTION("-", 0),
    DIVISION("/", 0),
    MULTIPLICATION("*", 0),

    EQUALITY("=", 1),
    GREATER(">", 1),
    LESS("<", 1),
    GEQ(">=", 1, "≥"),
    LEQ("=<", 1, "≤"),

    AND("and", 2, "∧"),
    OR("or", 2, "∨"),
    XOR("xor", 2, "⊻"),
    IMPLICATION("=>", 2, "⟹"),
    REVERSED_IMPLICATION("<=", 2, "⟸"),
    EQUIVALENCE("<=>", 2, "⟺");

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

