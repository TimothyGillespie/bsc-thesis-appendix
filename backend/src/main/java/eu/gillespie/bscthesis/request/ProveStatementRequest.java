package eu.gillespie.bscthesis.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@ToString
public class ProveStatementRequest {
    StatementTreeVertex statementTree;

    List<FunctionDefinition> functionDefinitions;

}
