package eu.gillespie.bscthesis.controller

import eu.gillespie.bscthesis.proveStatement
import eu.gillespie.bscthesis.model.ProveStatementRequest
import eu.gillespie.bscthesis.tosmtv20.convertToSmtV20String
import io.ktor.routing.*
import io.ktor.application.*
import io.ktor.request.*
import io.ktor.response.*

fun Application.statementRoutes() {
    routing() {
        post("/statement/prove/result") {
            val request = call.receive<ProveStatementRequest>()
            call.respond(proveStatement(request))
        }

        post("/statement/prove/smt2") {
            val request = call.receive<ProveStatementRequest>()
            call.respond(convertToSmtV20String(request))
        }
    }
}