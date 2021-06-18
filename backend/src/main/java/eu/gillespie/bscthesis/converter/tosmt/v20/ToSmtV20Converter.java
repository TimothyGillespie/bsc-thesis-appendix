package eu.gillespie.bscthesis.converter.tosmt.v20;

import eu.gillespie.bscthesis.request.FunctionDefinition;
import eu.gillespie.bscthesis.request.ProveStatementRequest;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20Assert;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20DeclareFunction;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20File;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression;

public class ToSmtV20Converter {

    public static String toSmtV20(ProveStatementRequest request) {

        SmtV20File file = new SmtV20File();
        file.setProduceUnsatCores(true);
        file.setSmtCoreMinimize(true);


        return file.toSmtV20();
    }

    public static SmtV20DeclareFunction toSmtV20DeclareFunction(FunctionDefinition functionDefinition) {
        return new SmtV20DeclareFunction(
                functionDefinition.getName(),
                functionDefinition.getOutputType(),
                functionDefinition.getInputTypes().toArray(new String[]{})
        );
    }
}
