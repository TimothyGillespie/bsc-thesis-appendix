import eu.gillespie.bscthesis.parseModel.CounterModel
import eu.gillespie.bscthesis.parseModel.isInstantiationParameterName

fun counterModelToHumanReadableTypeDeclaration(model: CounterModel): String {
    return model.aliases
        .asSequence()
        .filter { it.instantiation?.startsWith("%%") ?: false }
        .sortedBy { it.index }
        .groupBy { it.type }
        .map { it.value.map { aliases -> aliases.humanReadableSymbol }.joinToString(", ") + " ∈ ${it.key}" }
        .joinToString("\n")
}

fun counterModelToHumanReadableConstructedStructuresDefinition(model: CounterModel): String {
    val aliasesToDefine = model.aliases
        .asSequence()
        .filter { it.instantiation?.startsWith("%") ?: false && !isInstantiationParameterName(it.instantiation)}
        .sortedBy { it.index }

    val sb = StringBuilder()

    aliasesToDefine.forEach {
        val relevantAliases = model.aliases
            .asSequence()
            .filter { relAlias ->  relAlias.instantiation?.startsWith("%${it.instantiation}") ?: false }
            .sortedBy { relAlias -> relAlias.instantiation?.split("_")?.last()?.removePrefix("x")?.toInt() }

        val split = it.instantiation?.removePrefix("%")?.split("/")
        val constructorName = split?.subList(0, split.lastIndex)?.joinToString("")

        val parameters = relevantAliases
            .map { it.humanReadableSymbol }
            .joinToString(", ")

        sb.append("\n")
        sb.append("${it.humanReadableSymbol} = ${constructorName}(${parameters})")
    }

    return sb.toString().removePrefix("\n")
}

fun counterModelToHumanReadableFunctionValuesProbes(model: CounterModel): List<String> {
    val aliasTypeMap = model.aliases.groupBy { it.type }

    return model.values.map { entry ->
        val aliasesToDefine = aliasTypeMap[entry.value.inputType] ?: listOf()

        aliasesToDefine.sortedBy { it.index }.map { alias ->
            val valueForAlias = entry.value.valueMapping[alias.systemSymbol] ?: entry.value.elseValue
            "${entry.key}(${alias.humanReadableSymbol}) = $valueForAlias"
        }.joinToString("\n")
    }
}