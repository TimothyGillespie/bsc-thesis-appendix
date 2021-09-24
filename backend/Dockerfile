FROM timothygillespie/z3prover:4.8.10

RUN apk add openjdk11
RUN mkdir /app
COPY ./target/bsc-thesis-backend.jar /app/bsc-thesis-backend.jar

ENTRYPOINT ["java", "-jar", "/app/bsc-thesis-backend.jar"]
