package eu.gillespie.bscthesis.tests

import counterModelToHumanReadableConstructedStructuresDefinition
import counterModelToHumanReadableFunctionValuesProbes
import counterModelToHumanReadableTypeDeclaration
import eu.gillespie.bscthesis.exceptions.SyntaxException
import eu.gillespie.bscthesis.exceptions.UnknownTypeExpection
import eu.gillespie.bscthesis.parseModel.parseCounterModel
import eu.gillespie.bscthesis.parseModel.parseFullParenthesis
import eu.gillespie.bscthesis.tests.shared.FileLoader
import java.lang.RuntimeException
import java.util.*
import kotlin.test.Test


class Test {
    @Test
    fun test() {
        val raw = FileLoader.load("smt/generatedModel.smt2")

        val tree = parseFullParenthesis(raw)

        val counterModel = parseCounterModel(tree.parameters)
        println()
        println(counterModelToHumanReadableTypeDeclaration(counterModel))
        println()
        println(counterModelToHumanReadableConstructedStructuresDefinition(counterModel))
        println()
        println(counterModelToHumanReadableFunctionValuesProbes(counterModel).joinToString("\n\n"))
        println()
    }

}