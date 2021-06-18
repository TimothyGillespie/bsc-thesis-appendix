package eu.gillespie.bscthesis.request;

import lombok.ToString;

import java.util.List;

@ToString
public class Definition {
    List<String> inputVariable;

    List<ConditionalDefinition> conditional;

    StatementTreeVertex otherwise;

}
