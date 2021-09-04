package eu.gillespie.bscthesis.config

import com.google.gson.FieldNamingPolicy
import io.ktor.features.*
import io.ktor.application.*
import io.ktor.gson.*

fun Application.configureSerialization() {
    install(ContentNegotiation) {
        gson {
            setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
        }
    }
}
