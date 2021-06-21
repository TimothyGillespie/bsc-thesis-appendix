package eu.gillespie.bscthesis.request;

import lombok.*;

import java.util.LinkedList;
import java.util.List;

@ToString
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class FunctionDefinition {
    @NonNull String name;
    @NonNull Integer arity;
    @NonNull List<String> inputTypes = new LinkedList<>();
    @NonNull String outputType;
    Definition definition;

}
