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
public class ProveStatementRequest implements SmtV20Expression {
    @SerializedName("statement_tree")
    StatementTreeVertex statementTree;

    @SerializedName("function_definitions")
    List<FunctionDefinition> functionDefinitions;


    @Override
    public String toSmtV20() {
        SmtV20File file = new SmtV20File();

        List<SmtV20TopLevelExpression> topLevelExpressions = new LinkedList<>(this.functionDefinitions);

        SmtV20Assert statement = new SmtV20Assert();
        statement.setAssertion(statementTree);
        statement.setName("statement");
        topLevelExpressions.add(statement);

        file.setTopLevelExpressions(topLevelExpressions);
        file.setSmtCoreMinimize(true);
        file.setProduceUnsatCores(true);

        return file.toSmtV20();
    }
}
