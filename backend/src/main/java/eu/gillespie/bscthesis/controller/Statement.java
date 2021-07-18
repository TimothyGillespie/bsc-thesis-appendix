package eu.gillespie.bscthesis.controller;

import eu.gillespie.bscthesis.request.ProveStatementRequest;
import eu.gillespie.bscthesis.response.ProveStatementResponse;
import org.javawebstack.framework.HttpController;
import org.javawebstack.httpserver.Exchange;
import org.javawebstack.httpserver.router.annotation.params.Body;
import org.javawebstack.httpserver.router.annotation.verbs.Post;

import static eu.gillespie.bscthesis.ProveStatementKt.proveStatement;
import static eu.gillespie.bscthesis.tosmtv20.ConvertRequestToSmtKt.convertToSmtV20String;

public class Statement extends HttpController {

    @Post("/statement/prove/z3")
    public String proveStatementHandleZ3(Exchange exchange, @Body ProveStatementRequest request) {
        request = exchange.body(ProveStatementRequest.class);

        return convertToSmtV20String(request);
    }

    @Post("/statement/prove/result")
    public ProveStatementResponse proveStatementHandleResult(Exchange exchange, @Body ProveStatementRequest request) {
        request = exchange.body(ProveStatementRequest.class);

        return proveStatement(request);
    }

}
