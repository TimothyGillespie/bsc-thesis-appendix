package eu.gillespie.bscthesis.request;

import com.google.gson.annotations.SerializedName;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20DeclareFunction;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20AssertableExpression;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression;
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
