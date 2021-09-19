package eu.gillespie.bscthesis

import eu.gillespie.bscthesis.utils.setEnv
import io.ktor.server.netty.*
import mu.KotlinLogging
import java.io.File

fun main(args: Array<String>) {
        val logger = KotlinLogging.logger("eu.gillespie.bscthesis")

        val envFile = File(".env")

        var envError = false

        if(!envFile.isFile) {
                logger.error("No .env file was found. Program will proceed with default configurations.")
                envError = true
        }

        if(!envError && envFile.readLines().any { it.isNotBlank() && it.count { char -> char == '=' } == 0 }) {
                logger.error("The environment file did not contain an '=' on any non empty line. Program will proceed with default configurations.")
                envError = true
        }

        if(!envError) {
                val lines = envFile.readLines().filter { it.isNotBlank() }
                val env = lines.associate {
                        val key = it.split("=")[0]
                        val valueList = it.split("=").toMutableList()
                        valueList.removeAt(0)

                        val value = valueList.joinToString("")

                        key to value
                }

                setEnv(env)

                logger.info("Loaded ${lines.size} ${if (lines.size == 1) "entry" else "entries"} successfully.")
        }

        EngineMain.main(args)
}