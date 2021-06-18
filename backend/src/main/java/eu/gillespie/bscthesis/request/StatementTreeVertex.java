package eu.gillespie.bscthesis.request;

import com.google.gson.annotations.SerializedName;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20AssertableExpression;
import lombok.ToString;

import java.util.List;

@ToString
public class StatementTreeVertex {
    String symbol;

    List<StatementTreeVertex> parameters;

}
