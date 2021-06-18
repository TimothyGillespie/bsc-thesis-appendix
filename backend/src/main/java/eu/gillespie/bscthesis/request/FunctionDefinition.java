package eu.gillespie.bscthesis.request;

import lombok.ToString;

import java.util.List;

@ToString
public class FunctionDefinition {
    String name;

    Integer arity;

    List<String> inputTypes;

    String outputType;

    Definition definition;

}
