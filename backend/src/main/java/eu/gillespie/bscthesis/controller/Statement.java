package eu.gillespie.bscthesis.controller;

import eu.gillespie.bscthesis.request.ProveStatementRequest;
import org.javawebstack.framework.HttpController;
import org.javawebstack.httpserver.Exchange;
import org.javawebstack.httpserver.router.annotation.Body;
import org.javawebstack.httpserver.router.annotation.Post;

public class Statement extends HttpController {

    @Post("/statement/prove")
    public String proveStatementhandle(Exchange exchange, @Body ProveStatementRequest request) {
        return request.toString();
    }

}
