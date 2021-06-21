package eu.gillespie.bscthesis.converter.tosmt.v20;

import eu.gillespie.bscthesis.request.*;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20ForAll;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20NamedAssert;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20DeclareFunction;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20File;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20Expression;
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

    public static List<SmtV20DeclareFunction> generateFunctionDeclarations(ProveStatementRequest request) {
        return request.getFunctionDefinitions().stream().map((singleDefinition) -> new SmtV20DeclareFunction(
                singleDefinition.getName(),
                singleDefinition.getOutputType(),
                singleDefinition.getInputTypes().toArray(new String[] {})
        )).collect(Collectors.toList());
    }

    public static List<SmtV20Expression> generateFunctionDefinitions(FunctionDefinition functionDefinition) {
        LinkedList<SmtV20Expression> result = new LinkedList<>();
        Map<String, String> bindings = null;
        if(functionDefinition.getDefinition() != null && functionDefinition.getDefinition().getInputVariable() != null && functionDefinition.getDefinition().getInputVariable().size() > 0) {
            if(functionDefinition.getInputTypes().size() != functionDefinition.getDefinition().getInputVariable().size())
                throw new RuntimeException("Non equal list length of parameters and input types");

            bindings = new HashMap<>();
            for(int i = 0; i < functionDefinition.getInputTypes().size(); i++) {
                bindings.put(functionDefinition.getDefinition().getInputVariable().get(i), functionDefinition.getInputTypes().get(i));
            }
        }

        LinkedList<StatementTreeVertex> usedConditions = new LinkedList<>();
        if(functionDefinition.getDefinition() != null) {
            int i = 1;
            for (ConditionalDefinition conditional : functionDefinition.getDefinition().getConditional()) {
                StatementTreeVertex conditionTree = conditional.getCondition();
                StatementTreeVertex thenTree = new StatementTreeVertex(
                        "=",
                        Arrays.asList(
                                new StatementTreeVertex(
                                        functionDefinition.getName(),
                                        functionDefinition.getDefinition().getInputVariable().stream().map((inputVariable) -> new StatementTreeVertex(inputVariable, Collections.emptyList())).collect(Collectors.toList())
                                ),
                                conditional.getThen()
                        )
                );

                usedConditions.add(conditionTree);
                StatementTreeVertex compositionalTree = new StatementTreeVertex(
                        "=>",
                        Arrays.asList(conditionTree, thenTree)
                );

                result.add(
                        new SmtV20NamedAssert(
                            String.format("%sArity%dNumber%d", functionDefinition.getName(), functionDefinition.getArity(), i),
                            new SmtV20ForAll(
                                compositionalTree,
                                bindings
                            )
                        )
                );

                i++;
            }
        }

        StatementTreeVertex elseCompositional = new StatementTreeVertex(
            "=>",
            Arrays.asList(
                new StatementTreeVertex(
                    "not",
                    usedConditions
                ),
                new StatementTreeVertex(
                    "=",
                    Arrays.asList(
                            new StatementTreeVertex(
                                    functionDefinition.getName(),
                                    functionDefinition.getDefinition().getInputVariable().stream().map((inputVariable) -> new StatementTreeVertex(inputVariable, Collections.emptyList())).collect(Collectors.toList())
                            ),
                            functionDefinition.getDefinition().getOtherwise()
                    )
                )
            )
        );

        result.add(
                new SmtV20NamedAssert(
                    String.format("%sArity%dElse", functionDefinition.getName(), functionDefinition.getArity()),
                    new SmtV20ForAll(
                        elseCompositional,
                        bindings
                    )
                )
        );

        return result;
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

//            SmtV20NamedAssert assertion = new SmtV20NamedAssert();
//            assertion.setName();
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
