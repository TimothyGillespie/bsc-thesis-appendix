package eu.gillespie.bscthesis.converter.statementtreevertex;

import eu.gillespie.bscthesis.request.StatementTreeVertex;
import lombok.NonNull;

import java.util.*;
import java.util.stream.Collectors;

public class StatementTreeVertexGenerator {
    public static StatementTreeVertex embedTree(@NonNull StatementTreeVertex treeToEmbed, @NonNull String parentSymbol, @NonNull Collection<StatementTreeVertex> parametersBefore, @NonNull Collection<StatementTreeVertex> parametersAfter) {
        List<StatementTreeVertex> parameters = parametersBefore.stream().map(StatementTreeVertex::createClone).collect(Collectors.toList());
        parameters.add(treeToEmbed.createClone());
        parameters.addAll(parametersAfter.stream().map(StatementTreeVertex::createClone).collect(Collectors.toList()));

        return new StatementTreeVertex(parentSymbol, parameters);
    }

    public static StatementTreeVertex embedTree(@NonNull StatementTreeVertex treeToEmbed, @NonNull String parentSymbol, @NonNull Collection<StatementTreeVertex> parametersBefore) {
        return StatementTreeVertexGenerator.embedTree(treeToEmbed, parentSymbol, parametersBefore, Collections.emptyList());
    }

    public static StatementTreeVertex embedTree(@NonNull StatementTreeVertex treeToEmbed, @NonNull String parentSymbol) {
        return StatementTreeVertexGenerator.embedTree(treeToEmbed, parentSymbol, Collections.emptyList());
    }

    public static StatementTreeVertex join(String parentSymbol, StatementTreeVertex a, StatementTreeVertex b) {
        return new StatementTreeVertex(parentSymbol, Arrays.asList(a.createClone(), b.createClone()));
    }

    public static StatementTreeVertex joinWithCondition(StatementTreeVertex condition, @NonNull StatementTreeVertex then) {
        if(condition != null)
            return join("=>", condition, then);

        return then;
    }

//    public static StatementTreeVertex generateElseConditionTree(Collection<StatementTreeVertex> conditionsToNegate, @NonNull StatementTreeVertex then, Map<String, String> constructorMapping) {
//
//    }

    public static StatementTreeVertex generateElseConditionTree(Collection<StatementTreeVertex> conditionsToNegate, StatementTreeVertex then) {
        if(conditionsToNegate == null || conditionsToNegate.size() == 0)
            return then;

        if(conditionsToNegate.size() == 1)
            return joinWithCondition(
                    new StatementTreeVertex("not", new LinkedList<>(conditionsToNegate)),
                    then
            );


        return joinWithCondition(
                embedTree(
                        new StatementTreeVertex("and", new LinkedList<>(conditionsToNegate)),
                        "not"
                ),
                then
        );

    }

//    public static StatementTreeVertex generateConditionalDefinition(StatementTreeVertex condition, String definedSymbol, StatementTreeVertex definition, Map<String, String> constructorMapping) {
//
//    }
//
//    public static StatementTreeVertex generateConditionalDefinition(StatementTreeVertex condition, String definedSymbol, StatementTreeVertex definition) {
//
//    }
}
