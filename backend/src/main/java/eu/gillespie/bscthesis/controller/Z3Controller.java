package eu.gillespie.bscthesis.controller;

import eu.gillespie.bscthesis.request.Z3Request;
import eu.gillespie.bscthesis.response.Z3Response;
import org.javawebstack.framework.HttpController;
import org.javawebstack.httpserver.Exchange;
import org.javawebstack.httpserver.router.annotation.params.Body;
import org.javawebstack.httpserver.router.annotation.verbs.Post;

public class Z3Controller extends HttpController {

    @Post("z3")
    public Z3Response handle(Exchange exchange, @Body Z3Request request) {
        return new Z3Response();
    }

}
