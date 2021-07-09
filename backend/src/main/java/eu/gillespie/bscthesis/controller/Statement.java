package eu.gillespie.bscthesis.controller;

import eu.gillespie.bscthesis.converter.tosmt.v20.ToSmtV20Converter;
import eu.gillespie.bscthesis.request.ProveStatementRequest;
import org.javawebstack.framework.HttpController;
import org.javawebstack.httpserver.Exchange;
import org.javawebstack.httpserver.router.annotation.params.Body;
import org.javawebstack.httpserver.router.annotation.verbs.Post;

public class Statement extends HttpController {

    @Post("/statement/prove")
    public String proveStatementhandle(Exchange exchange, @Body ProveStatementRequest request) {
        request = exchange.body(ProveStatementRequest.class);
        return ToSmtV20Converter.toSmtV20(request);
    }

}
