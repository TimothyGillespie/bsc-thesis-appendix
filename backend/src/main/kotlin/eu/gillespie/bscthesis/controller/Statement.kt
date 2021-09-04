package eu.gillespie.bscthesis.controller

import eu.gillespie.bscthesis.proveStatement
import eu.gillespie.bscthesis.request.ProveStatementRequest
import io.ktor.routing.*
import io.ktor.application.*
import io.ktor.request.*
import io.ktor.response.*

fun Application.statementRoutes() {
    routing {
        post("/statement/prove/result") {
            val request = call.receive<ProveStatementRequest>()
            call.respond(proveStatement(request))
        }
    }
}