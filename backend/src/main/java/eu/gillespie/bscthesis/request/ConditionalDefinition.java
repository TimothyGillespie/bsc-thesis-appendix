package eu.gillespie.bscthesis.request;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@RequiredArgsConstructor
public class ConditionalDefinition {
    @NonNull StatementTreeVertex condition;
    @NonNull StatementTreeVertex then;

}
