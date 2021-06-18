package eu.gillespie.bscthesis.request;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ToString
@Getter
public class FunctionDefinition {
    String name;

    Integer arity;

    List<String> inputTypes;

    String outputType;

    Definition definition;

}
