package eu.gillespie.bscthesis.request;

import com.google.gson.annotations.SerializedName;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

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
