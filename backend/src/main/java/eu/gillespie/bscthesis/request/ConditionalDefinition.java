package eu.gillespie.bscthesis.request;

import com.google.gson.annotations.SerializedName;
import lombok.ToString;

@ToString
public class ConditionalDefinition {
    @SerializedName("condition")
    StatementTreeVertex condition;

    @SerializedName("then")
    StatementTreeVertex then;
}
