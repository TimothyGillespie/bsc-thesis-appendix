package eu.gillespie.bscthesis.request;

import lombok.*;

import java.util.LinkedList;
import java.util.List;

@ToString
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode
public class FunctionDefinition {

    @EqualsAndHashCode.Include
    @NonNull String name;
    @EqualsAndHashCode.Include
    @NonNull Integer arity;

    @NonNull List<String> inputTypes = new LinkedList<>();
    @NonNull String outputType;
    Definition definition;

}
