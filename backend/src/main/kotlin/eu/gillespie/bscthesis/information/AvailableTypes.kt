package eu.gillespie.bscthesis.information

import com.google.gson.annotations.SerializedName

enum class AvailableTypes(val smtName: String, val displayName: String, val smtNative: Boolean = false) {
    @SerializedName("Int")
    IntegerNumber("Int", "integer", true),
    @SerializedName("Real")
    RealNumber("Real", "real number", true),
    Bool("Bool", "boolean", true),

    NAryTree("NAryTree", "n-ary tree"),
//    NonEmptyNAryTree("NonEmptyNAryTree", "non-empty n-ary tree"),
    PLFormula("PLFormula", "formula of propositional logic");

    fun toTypeDescription() = TypeDescription(smtName, displayName, smtNative)

    // Using the smt name as this could cause errors otherwise while a human may understand it
    override fun toString(): String {
        return smtName
    }
}

data class TypeDescription(
    val smtName: String,
    val displayName: String,
    val smtNative: Boolean,
)