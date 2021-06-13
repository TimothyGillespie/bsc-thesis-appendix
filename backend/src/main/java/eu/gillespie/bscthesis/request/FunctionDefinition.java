package eu.gillespie.bscthesis.request;

import com.google.gson.annotations.SerializedName;
import lombok.ToString;

import java.util.List;

@ToString
public class FunctionDefinition {
    @SerializedName("name")
    String name;

    @SerializedName("arity")
    Integer arity;

    @SerializedName("input_types")
    List<String> inputTypes;

    @SerializedName("output_type")
    String outputType;

    @SerializedName("definition")
    Definition definition;
}
