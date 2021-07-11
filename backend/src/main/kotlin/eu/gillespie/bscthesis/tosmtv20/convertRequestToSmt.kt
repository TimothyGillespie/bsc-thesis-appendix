package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.request.ProveStatementRequest
import eu.gillespie.bscthesis.smt.v20.model.SmtV20CheckSat
import eu.gillespie.bscthesis.smt.v20.model.SmtV20File
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression
import java.util.*

fun convertRequestToSmtV20List(request: ProveStatementRequest): List<SmtV20TopLevelExpression> {

    validateRequest(request)

    val constructorInstantiation = generateConstructorInstantiation(request)
    val inductiveProperties = generateInductiveProperties(request, constructorInstantiation)
    instantiateRequest(request, constructorInstantiation)

    val result = LinkedList<SmtV20TopLevelExpression>()

    result.addAll(getSortDeclarations(request))
    result.addAll(generateFunctionDeclarationsFromConstructorInstantiation(constructorInstantiation))
    result.addAll(getFunctionDeclarations(request))

    result.addAll(getSortSpecificConstraints(request, constructorInstantiation))

    result.addAll(generateFunctionDefinitions(request, constructorInstantiation))
    result.add(SmtV20CheckSat())

    result.addAll(inductiveProperties)
    result.add(SmtV20CheckSat())

    result.addAll(generateAdditionalConstraints(request))
    result.add(SmtV20CheckSat())

    result.add(generateStatementToProof(request))
    result.add(SmtV20CheckSat())

    return result
}

fun convertToSmtV20String(request: ProveStatementRequest): String {
    val file = SmtV20File()
    file.produceUnsatCores = true
    file.smtCoreMinimize = true

    file.topLevelExpressions = convertRequestToSmtV20List(request).toMutableList()

    return file.toSmtV20()
}