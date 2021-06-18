package eu.gillespie.bscthesis.converter.tosmt.v20;

import eu.gillespie.bscthesis.request.FunctionDefinition;
import eu.gillespie.bscthesis.request.ProveStatementRequest;
import eu.gillespie.bscthesis.request.StatementTreeVertex;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20Assert;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20DeclareFunction;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20File;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression;

import java.util.*;
import java.util.stream.Collectors;

public class ToSmtV20Converter {


    HashSet<SmtV20TopLevelExpression> topLevelExpressions = new HashSet<>();
    SmtV20File file;
    HashMap<String, Set<String>> symbolsOfType = new HashMap<>();


    public static String toSmtV20(ProveStatementRequest request) {
        ToSmtV20Converter instance = new ToSmtV20Converter();
        return instance.convert(request);
    }

    public ToSmtV20Converter() {
        SmtV20File file = new SmtV20File();
        this.file.setProduceUnsatCores(true);
        this.file.setSmtCoreMinimize(true);
    }

    public String convert(ProveStatementRequest request) {

        topLevelExpressions = getTopLevelExpressionSetFor(request.getFunctionDefinitions());


//        file.setTopLevelExpressions(topLevelExpressions);
        return file.toSmtV20();
    }

    public static SmtV20DeclareFunction toSmtV20DeclareFunction(FunctionDefinition functionDefinition) {
        return new SmtV20DeclareFunction(
                functionDefinition.getName(),
                functionDefinition.getOutputType(),
                functionDefinition.getInputTypes().toArray(new String[]{})
        );
    }

    public String toSmtV20ExpressionString(StatementTreeVertex tree, Map<String, String> typeBinding) {
        StringBuilder sb = new StringBuilder();
        sb.append("(");
        sb.append(tree.getSymbol());
        for(StatementTreeVertex singleParameter : tree.getParameters()) {
            sb.append(toSmtV20ExpressionString(singleParameter, typeBinding));
        }
        sb.append(")");

        return sb.toString();
    }

    public HashSet<SmtV20TopLevelExpression> getTopLevelExpressionSetFor(Collection<FunctionDefinition> functionDefinitions) {
        HashSet<SmtV20TopLevelExpression> topLevelExpressions = functionDefinitions
                .stream()
                .map(ToSmtV20Converter::toSmtV20DeclareFunction)
                .collect(Collectors.toCollection(HashSet::new));

        for(FunctionDefinition singleFuncDef : functionDefinitions) {

            SmtV20Assert assertion = new SmtV20Assert();
            assertion.setName(singleFuncDef.getName() + "Otherwise");
//            assertion.setAssertion(toSmtV20ExpressionString(singleFuncDef.getDefinition().getOtherwise()));
        }

        return topLevelExpressions;
    }

    private void generateSymbolsOfType(Collection<FunctionDefinition> functionDefinitions) {
        for(FunctionDefinition singleDefinition : functionDefinitions) {
            Set<String> foundTypes = symbolsOfType.getOrDefault(singleDefinition.getOutputType(), new HashSet<>());
            foundTypes.add(String.format("%s/%d", singleDefinition.getName(), singleDefinition.getArity()));
        }
    }

}
