package eu.gillespie.bscthesis.model.response


class ProveStatementResponse(
    val satisfiability: List<Boolean>,
    val unsatCore: List<String>,
    val model: String,
)