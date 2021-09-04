package eu.gillespie.bscthesis.config

import eu.gillespie.bscthesis.controller.statementRoutes
import io.ktor.routing.*
import io.ktor.http.*
import io.ktor.features.*
import io.ktor.application.*
import io.ktor.response.*

fun Application.configureHttp() {
    install(AutoHeadResponse)

    routing {
        install(StatusPages) {
            exception<AuthenticationException> { cause ->
                call.respond(HttpStatusCode.Unauthorized)
            }
            exception<AuthorizationException> { cause ->
                call.respond(HttpStatusCode.Forbidden)
            }

            exception<Exception> { cause ->
                call.respond(HttpStatusCode.BadRequest)
            }

        }

        statementRoutes()

    }
}
class AuthenticationException : RuntimeException()
class AuthorizationException : RuntimeException()