package eu.gillespie.bscthesis.request;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ToString
@Getter
public class Definition {
    List<String> inputVariable;

    List<ConditionalDefinition> conditional;

    StatementTreeVertex otherwise;

}
