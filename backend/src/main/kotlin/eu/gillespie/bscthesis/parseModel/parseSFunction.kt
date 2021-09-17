package eu.gillespie.bscthesis.parseModel

import eu.gillespie.bscthesis.exceptions.SyntaxException

fun parseFullParenthesis(input: String): SFunction {
    val processedInput = input.trim().replace(Regex(";.*\n"), "").replace("\n", " ").trim()

    if(processedInput == "()")
        return SFunction(null, listOf())

    if(processedInput.isNotEmpty() && !processedInput.contains(Regex("\\s"))) {
        return SFunction(processedInput, listOf())
    }
    if(!processedInput.startsWith("(")) {
        throw SyntaxException("Input does not start with a '('.")
    }

    if(!processedInput.endsWith(")")) {
        throw SyntaxException("Input does not end with a ')'.")
    }

    val inner = processedInput.removePrefix("(").removeSuffix(")").trim()

    val whitespaceSplit = inner.split(Regex("\\s+"))

    val parametersStart: Int
    val functionName: String?
    if(whitespaceSplit[0].startsWith("(")) {
        functionName = null
        parametersStart = 0
    } else {
        functionName = whitespaceSplit[0]
        parametersStart = 1
    }


    val parameters: List<SFunction> = if(whitespaceSplit.size > 1) {
        parseParameters(whitespaceSplit.drop(parametersStart).joinToString(" "))
    } else {
        listOf()
    }

    return SFunction(
        functionName,
        parameters
    )

}

fun parseParameters(input: String): List<SFunction> {
    var inCommentSection = false
    var level = 0

    val parameters = mutableListOf<String>()
    var currentParameter = ""

    for(c in input) {
        if(inCommentSection) {
            if (c == '\n') {
                inCommentSection = false
            }
            continue
        }

        if(c == ';') {
            inCommentSection = true
            continue
        }

        if(level == 0 && Regex("^\\s$").matches(c.toString())) {
            if(currentParameter.isNotEmpty())
                parameters.add(currentParameter)

            currentParameter = ""
            continue
        }

        currentParameter += c

        if(c == '(') {
            if(level == 0) {
                if(currentParameter.length > 1)
                    parameters.add(currentParameter)

                currentParameter = "("
            }
            level++
        }

        if(c == ')') {
            level--
            if(level == 0) {
                if(currentParameter.isNotEmpty())
                    parameters.add(currentParameter)

                currentParameter = ""
            }
        }
    }

    if(currentParameter.trim().isNotEmpty())
        parameters.add(currentParameter)

    return parameters.map { parseFullParenthesis(it) }
}