package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.information.AvailableTypes
import eu.gillespie.bscthesis.model.ProveStatementRequest
import eu.gillespie.bscthesis.model.smt.v20.SmtV20DefineSort

fun getSortDeclarations(request: ProveStatementRequest)
    = getSortDeclarations(extractAllCustomTypes(request))

fun getSortDeclarations(sorts: Collection<AvailableTypes>)
    = sorts.map { SmtV20DefineSort(it) }