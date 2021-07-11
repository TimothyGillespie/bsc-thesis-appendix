package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.request.FunctionDefinition

fun hasInputConstructor(functionDefinition: FunctionDefinition): Boolean {
    if(functionDefinition.definition == null || functionDefinition.definition!!.inputConstructor == null)
        return false

    return true
}

fun hasInputVariables(functionDefinition: FunctionDefinition): Boolean {
    if(functionDefinition.definition == null || functionDefinition.definition!!.inputVariable == null)
        return false

    return true
}