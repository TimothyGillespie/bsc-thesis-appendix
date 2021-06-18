package eu.gillespie.bscthesis.request;

import lombok.ToString;

import java.util.List;

@ToString
public class StatementTreeVertex {
    String symbol;

    List<StatementTreeVertex> parameters;

}
