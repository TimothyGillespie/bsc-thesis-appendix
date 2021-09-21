package eu.gillespie.bscthesis.config

import eu.gillespie.bscthesis.controller.statementRoutes
import io.ktor.routing.*
import io.ktor.http.*
import io.ktor.features.*
import io.ktor.application.*
import io.ktor.response.*

fun Application.configureHttp() {
    install(AutoHeadResponse)
    install(CORS) {
        anyHost()
        host("0.0.0.0:4200")
        header(HttpHeaders.ContentType)
        header(HttpHeaders.AccessControlAllowOrigin)
        header(HttpHeaders.AccessControlAllowHeaders)
        header(HttpHeaders.AccessControlAllowMethods)
        method(HttpMethod.Options)
        method(HttpMethod.Head)
        method(HttpMethod.Get)
        method(HttpMethod.Post)
        method(HttpMethod.Delete)
        method(HttpMethod.Put)
    }

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