package eu.gillespie.bscthesis.request;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ToString
@Getter
public class StatementTreeVertex {
    String symbol;

    List<StatementTreeVertex> parameters;

}
