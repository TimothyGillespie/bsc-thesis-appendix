package eu.gillespie.bscthesis.response


class ProveStatementResponse(
    val satisfiability: List<Boolean>,
    val unsatCore: List<String>,
    val proof: String,
)