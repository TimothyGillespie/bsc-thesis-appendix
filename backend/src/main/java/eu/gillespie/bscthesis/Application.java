package eu.gillespie.bscthesis;

import eu.gillespie.bscthesis.controller.Z3Controller;
import org.javawebstack.framework.HttpController;
import org.javawebstack.framework.WebApplication;
import org.javawebstack.framework.config.Config;
import org.javawebstack.httpserver.HTTPServer;
import org.javawebstack.orm.exception.ORMConfigurationException;
import org.javawebstack.orm.wrapper.SQL;

import java.util.logging.ConsoleHandler;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Application extends WebApplication {

    public static void main(String[] args) {
        Application instance = new Application();
        instance.start();
    }

    @Override
    protected void setupConfig(Config config) {
        config.addEnvFile(".env");
        config.set("http.server.port", "3333");
    }

    @Override
    protected void setupModels(SQL sql) throws ORMConfigurationException {
        Handler handler = new ConsoleHandler();
        handler.setLevel(Level.WARNING);
        Logger.getLogger("ORM").addHandler(handler);
        Logger.getLogger("ORM").setLevel(Level.WARNING);
    }

    @Override
    protected void setupServer(HTTPServer httpServer) {
        httpServer.controller("api/v1", HttpController.class, Z3Controller.class.getPackage());
    }
}
