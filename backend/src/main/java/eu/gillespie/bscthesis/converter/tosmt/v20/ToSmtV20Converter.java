package eu.gillespie.bscthesis.converter.tosmt.v20;

import eu.gillespie.bscthesis.request.*;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20ForAll;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20NamedAssert;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20DeclareFunction;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20File;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression;
import lombok.NonNull;

import java.util.*;
import java.util.stream.Collectors;

public class ToSmtV20Converter {

    SmtV20File file;

    public static String toSmtV20(ProveStatementRequest request) {
        ToSmtV20Converter instance = new ToSmtV20Converter();
        List<SmtV20TopLevelExpression> topLevelExpressions = new LinkedList<>();
        return instance.convert(request);
    }

    public ToSmtV20Converter() {
        SmtV20File file = new SmtV20File();
        file.setProduceUnsatCores(true);
        file.setSmtCoreMinimize(true);
        this.file = file;
    }

    public static List<SmtV20DeclareFunction> generateFunctionDeclarations(ProveStatementRequest request) {
        return request.getFunctionDefinitions().stream().map((singleDefinition) -> new SmtV20DeclareFunction(
                singleDefinition.getName(),
                singleDefinition.getOutputType(),
                singleDefinition.getInputTypes().toArray(new String[] {})
        )).collect(Collectors.toList());
    }


    public HashMap<String, String> getParameterTypeBinding(@NonNull FunctionDefinition functionDefinition, FunctionDefinition constructorFunction) {
        FunctionDefinition functionDefinitionToObtainInputTypesOf = constructorFunction != null ? constructorFunction : functionDefinition;
        List<String> inputTypes = functionDefinitionToObtainInputTypesOf.getInputTypes();
        List<String> inputVariables = new LinkedList<>();


        Definition definition = functionDefinition.getDefinition();
        if(definition == null)
            throw new RuntimeException("No definition exists on function definition");

        if(constructorFunction == null)
            inputVariables = definition.getInputVariable();

        if(constructorFunction != null && definition.getInputConstructor() != null)
            inputVariables = definition.getInputConstructor().getBoundVariables();

        return getParameterTypeBinding(inputVariables, inputTypes);

    }

    public HashMap<String, String> getParameterTypeBinding(List<String> inputVariable, List<String> inputTypes) {
        inputVariable = inputVariable == null ? new LinkedList<>() : inputVariable;
        inputTypes = inputTypes == null ? new LinkedList<>() : inputTypes;
        if(inputVariable.size() != inputTypes.size())
            throw new RuntimeException("Non equal list length of parameters and input types");

        if(inputVariable.size() == 0)
            return null;

        HashMap<String, String> bindings = new HashMap<>();
        for(int i = 0; i < inputTypes.size(); i++) {
            bindings.put(inputVariable.get(i), inputTypes.get(i));
        }
        return bindings;
    }

    public HashSet<SmtV20NamedAssert> generateFunctionDefinitions(@NonNull FunctionDefinition functionDefinition, FunctionDefinition inputConstructor) {
        HashSet<SmtV20NamedAssert> result = new HashSet<>();

        if(functionDefinition.getDefinition() == null) {
            return result;
        }
        HashMap<String, String> bindings = getParameterTypeBinding(functionDefinition, inputConstructor);


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
                                        inputConstructor != null
                                                ? Collections.singletonList(new StatementTreeVertex(inputConstructor.getName(), functionDefinition.getDefinition().getInputConstructor().getBoundVariables().stream().map(inputVariable -> new StatementTreeVertex(inputVariable, Collections.emptyList())).collect(Collectors.toList())))
                                                : functionDefinition.getDefinition().getInputVariable().stream().map((inputVariable) -> new StatementTreeVertex(inputVariable, Collections.emptyList())).collect(Collectors.toList())
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

        StatementTreeVertex elseCompositional;


        if(usedConditions.isEmpty()) {
            elseCompositional = new StatementTreeVertex(
                    "=",
                    Arrays.asList(
                            new StatementTreeVertex(
                                    functionDefinition.getName(),
                                    inputConstructor != null
                                            ? Collections.singletonList(new StatementTreeVertex(inputConstructor.getName(), functionDefinition.getDefinition().getInputConstructor().getBoundVariables().stream().map(inputVariable -> new StatementTreeVertex(inputVariable, Collections.emptyList())).collect(Collectors.toList())))
                                            : functionDefinition.getDefinition().getInputVariable().stream().map((inputVariable) -> new StatementTreeVertex(inputVariable, Collections.emptyList())).collect(Collectors.toList())

                            ),
                            functionDefinition.getDefinition().getOtherwise()
                    )
            );
        } else {
            elseCompositional = new StatementTreeVertex(
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
                                                    inputConstructor != null
                                                            ? Collections.singletonList(new StatementTreeVertex(inputConstructor.getName(), functionDefinition.getDefinition().getInputConstructor().getBoundVariables().stream().map(inputVariable -> new StatementTreeVertex(inputVariable, Collections.emptyList())).collect(Collectors.toList())))
                                                            : functionDefinition.getDefinition().getInputVariable().stream().map((inputVariable) -> new StatementTreeVertex(inputVariable, Collections.emptyList())).collect(Collectors.toList())

                                            ),
                                            functionDefinition.getDefinition().getOtherwise()
                                    )
                            )
                    )
            );
        }

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

        List<SmtV20TopLevelExpression> topLevelExpressions = getTopLevelExpressions(request.getFunctionDefinitions());

        file.setTopLevelExpressions(topLevelExpressions);
        return file.toSmtV20();
    }

    public static SmtV20DeclareFunction toSmtV20DeclareFunction(FunctionDefinition functionDefinition) {
        return new SmtV20DeclareFunction(
                functionDefinition.getName(),
                functionDefinition.getOutputType(),
                functionDefinition.getInputTypes().toArray(new String[]{})
        );
    }

    public LinkedList<SmtV20TopLevelExpression> getTopLevelExpressions(Collection<FunctionDefinition> functionDefinitions) {
        LinkedList<SmtV20TopLevelExpression> result = new LinkedList<>(getDeclareFunction(functionDefinitions));
        result.addAll(generateFunctionDefinitions(functionDefinitions));
        return result;
    }


    public HashSet<SmtV20DeclareFunction> getDeclareFunction(Collection<FunctionDefinition> functionDefinitions) {
        return functionDefinitions
            .stream()
            .map(ToSmtV20Converter::toSmtV20DeclareFunction)
            .collect(Collectors.toCollection(HashSet::new));
    }

    public HashSet<SmtV20NamedAssert> generateFunctionDefinitions(Collection<FunctionDefinition> functionDefinitions) {
        return functionDefinitions.stream()
                .map(x -> this.generateFunctionDefinitions(
                        x,
                        x.getDefinition() != null && x.getDefinition().getInputConstructor() != null
                            ? functionDefinitions.stream().filter(y -> y.getName().equals(x.getDefinition().getInputConstructor().getName()) && y.getArity().equals(x.getDefinition().getInputConstructor().getArity())).findFirst().orElseThrow(RuntimeException::new)
                            : null
                ))
                .flatMap(HashSet::stream)
                .collect(Collectors.toCollection(HashSet::new));
    }

}
