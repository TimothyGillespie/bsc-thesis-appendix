package eu.gillespie.bscthesis.request;

import com.google.gson.annotations.SerializedName;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20Assert;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20File;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20Expression;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@ToString
public class ProveStatementRequest {
    @SerializedName("statement_tree")
    StatementTreeVertex statementTree;

    @SerializedName("function_definitions")
    List<FunctionDefinition> functionDefinitions;

}
