package eu.gillespie.bscthesis.request;

import com.google.gson.annotations.SerializedName;
import lombok.ToString;

import java.util.List;

@ToString
public class Definition {
    @SerializedName("input_variable")
    List<String> inputVariable;

    @SerializedName("conditional")
    List<ConditionalDefinition> conditional;

    @SerializedName("otherwise")
    String otherwise;
}