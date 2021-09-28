FROM maven:3.8.2-jdk-11-slim as build
WORKDIR /backend
COPY . .
RUN ["mvn", "-B", "clean", "package"]

FROM timothygillespie/z3prover:4.8.10

RUN apk add openjdk11
RUN mkdir /app
COPY --from=build /backend/target/bsc-thesis-backend.jar /app/bsc-thesis-backend.jar
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/bsc-thesis-backend.jar"]
