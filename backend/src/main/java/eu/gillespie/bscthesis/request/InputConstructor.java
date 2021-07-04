package eu.gillespie.bscthesis.request;

import lombok.*;

import java.util.List;

@Data
public class InputConstructor {
    @NonNull String name;
    @NonNull Integer arity;
    @NonNull List<String> boundVariables;
}
