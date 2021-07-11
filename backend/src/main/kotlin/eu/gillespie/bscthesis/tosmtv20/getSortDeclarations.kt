package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.request.ProveStatementRequest
import eu.gillespie.bscthesis.smt.v20.model.SmtV20DefineSort

fun getSortDeclarations(request: ProveStatementRequest)
    = getSortDeclarations(extractAllCustomTypes(request))

fun getSortDeclarations(sorts: Collection<String>)
    = sorts.map { SmtV20DefineSort(it) }