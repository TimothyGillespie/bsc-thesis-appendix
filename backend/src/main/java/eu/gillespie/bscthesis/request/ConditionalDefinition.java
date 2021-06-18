package eu.gillespie.bscthesis.request;

import com.google.gson.annotations.SerializedName;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20AssertableExpression;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
public class ConditionalDefinition {
    @SerializedName("condition")
    StatementTreeVertex condition;

    @SerializedName("then")
    StatementTreeVertex then;

}
