package eu.gillespie.bscthesis.request;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.LinkedList;
import java.util.List;

@ToString
@Getter
@Builder
public class Definition {
    List<String> inputVariable = null;
    // inputConstructor
    List<ConditionalDefinition> conditional = new LinkedList<>();
    StatementTreeVertex otherwise;
}
