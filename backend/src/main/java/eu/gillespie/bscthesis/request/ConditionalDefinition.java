package eu.gillespie.bscthesis.request;

import com.google.gson.annotations.SerializedName;
import lombok.ToString;

@ToString
public class ConditionalDefinition {
    @SerializedName("condition")
    String condition;

    @SerializedName("then")
    String then;
}
