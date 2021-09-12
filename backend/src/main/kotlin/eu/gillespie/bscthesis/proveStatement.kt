package eu.gillespie.bscthesis


import eu.gillespie.bscthesis.request.ProveStatementRequest
import eu.gillespie.bscthesis.response.ProveStatementResponse
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

    val response: List<String> = Runtime.getRuntime().exec("z3 ./${fileName}").inputStream.bufferedReader().use { it.readText()}.split("\n")

    file.delete()

    val countOfCheckSats = 5

    val satifiability = response.subList(0,countOfCheckSats).map { it == "sat" }
    val unsatCore = response.get(countOfCheckSats).removePrefix("(").removeSuffix(")").split(" ")
    val model = response.subList(countOfCheckSats, response.size - 1).joinToString("\n")

    return ProveStatementResponse(satifiability, listOf(), model)
}