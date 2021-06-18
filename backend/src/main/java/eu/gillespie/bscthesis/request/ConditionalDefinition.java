package eu.gillespie.bscthesis.request;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class ConditionalDefinition {
    StatementTreeVertex condition;

    StatementTreeVertex then;

}
