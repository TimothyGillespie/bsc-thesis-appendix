package eu.gillespie.bscthesis.controller;

import eu.gillespie.bscthesis.request.ProveStatementRequest;
import lombok.NonNull;
import org.javawebstack.framework.HttpController;
import org.javawebstack.httpserver.Exchange;
import org.javawebstack.httpserver.router.annotation.params.Body;
import org.javawebstack.httpserver.router.annotation.verbs.Post;

public class Statement extends HttpController {

    @Post("/statement/prove")
    public String proveStatementhandle(Exchange exchange, @NonNull @Body ProveStatementRequest request) {
        return request.toString();
    }

}
