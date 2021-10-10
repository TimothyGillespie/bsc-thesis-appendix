package eu.gillespie.bscthesis.model.response

import eu.gillespie.bscthesis.parseModel.CounterModel


class ProveStatementResponse(
    val satisfiability: SatisfiabilityResponsePart,
    val counterModel: CounterModelResponsePart?,
)

// a value is null if the previous was false (unsatisfiable), thus functionDefinitions cannot be null
data class SatisfiabilityResponsePart(
    val functionDefinitions: String,
    val inductiveHypothesis: String?,
    val additionalConstraints: String?,
    val inductiveBasis: String?,
    val inductiveStep: String?,
)

data class CounterModelResponsePart(
    val parsed: CounterModel,
    val humanReadable: HumanReadableCounterModelResponsePart,
    val raw: String,
)

data class HumanReadableCounterModelResponsePart(
    val typing: String,
    val constantDefinitions: String,
    // One for each function
    val functionDefinitions: List<String>,
)
