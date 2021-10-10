package eu.gillespie.bscthesis


import counterModelToHumanReadableConstructedStructuresDefinition
import counterModelToHumanReadableFunctionValuesProbes
import counterModelToHumanReadableTypeDeclaration
import eu.gillespie.bscthesis.exceptions.SolverException
import eu.gillespie.bscthesis.model.ProveStatementRequest
import eu.gillespie.bscthesis.model.response.CounterModelResponsePart
import eu.gillespie.bscthesis.model.response.HumanReadableCounterModelResponsePart
import eu.gillespie.bscthesis.model.response.ProveStatementResponse
import eu.gillespie.bscthesis.model.response.SatisfiabilityResponsePart
import eu.gillespie.bscthesis.parseModel.parseCounterModel
import eu.gillespie.bscthesis.parseModel.parseFullParenthesis
import eu.gillespie.bscthesis.tosmtv20.convertToSmtV20String
import java.io.File
import java.util.*

fun proveStatement(request: ProveStatementRequest): ProveStatementResponse {
    val uuid: String = UUID.randomUUID().toString();

    val smtV20Code = convertToSmtV20String(request)
    val fileName = "${uuid}.smt2"
    val file = File("./${fileName}").apply {
        createNewFile()
        writeText(smtV20Code)
    }

    File("./debug.smt2").apply {
        createNewFile()
        writeText(smtV20Code)
    }

    val response: List<String> = Runtime.getRuntime().exec("${System.getenv("Z3COMMAND") ?: "z3"} ./${fileName}").inputStream.bufferedReader().use { it.readText()}.split("\n")

    file.delete()

    val countOfCheckSats = 5

    if(response.size < countOfCheckSats)
        throw SolverException("Unexpected amount of lines (fewer than ${countOfCheckSats})")

    val satisfiabilities = response.subList(0,countOfCheckSats)

    if(!satisfiabilities.all { it == "sat" || it == "unsat" || it == "unknown" })
        throw SolverException("Unexpected result, it seems z3 could not parse the request and throw an error:\n\n ${response}")

    val functionDefinition = satisfiabilities[0]
    val inductiveHypothesis = satisfiabilities[1]
    val additionalConstraints = satisfiabilities[2]
    val inductiveBasis = satisfiabilities[3]
    val inductiveStep = satisfiabilities[4]

    val satisfiabilityResponsePart = SatisfiabilityResponsePart(
        functionDefinition,
        if(isSatOrUnknown(functionDefinition)) inductiveHypothesis else null,
        if(isSatOrUnknown(inductiveHypothesis)) additionalConstraints else null,
        if(isSatOrUnknown(additionalConstraints)) inductiveBasis else null,
        if(isSatOrUnknown(inductiveBasis)) inductiveStep else null,
    )

    var counterModelResponsePart: CounterModelResponsePart? = null
    if(inductiveStep == "sat") {
        val raw  = response.subList(countOfCheckSats, response.size - 1).joinToString("\n")
        val parsedSFunction = parseFullParenthesis(raw)
        if(parsedSFunction.name == "error")
            throw SolverException("Solver threw error for generating counter model although it was expected to have one.")

        val counterModel = parseCounterModel(parsedSFunction.parameters)
        val humandReadable = HumanReadableCounterModelResponsePart(
            counterModelToHumanReadableTypeDeclaration(counterModel),
            counterModelToHumanReadableConstructedStructuresDefinition(counterModel),
            counterModelToHumanReadableFunctionValuesProbes(counterModel),
        )

        counterModelResponsePart = CounterModelResponsePart(counterModel, humandReadable, raw)
    }
    return ProveStatementResponse(satisfiabilityResponsePart, counterModelResponsePart)
}

fun isSatOrUnknown(input: String?): Boolean {
    input ?: return false
    return input == "sat" || input == "unknown"
}