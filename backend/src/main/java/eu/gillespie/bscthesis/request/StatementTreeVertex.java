package eu.gillespie.bscthesis.request;

import com.google.gson.annotations.SerializedName;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20AssertableExpression;
import lombok.ToString;

import java.util.List;

@ToString
public class StatementTreeVertex implements SmtV20AssertableExpression {
    @SerializedName("symbol")
    String symbol;

    @SerializedName("parameters")
    List<StatementTreeVertex> parameters;

    @Override
    public String toSmtV20() {
        return null;
    }
}
