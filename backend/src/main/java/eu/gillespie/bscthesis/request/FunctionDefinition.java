package eu.gillespie.bscthesis.request;

import com.google.gson.annotations.SerializedName;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20DeclareFunction;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20AssertableExpression;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression;
import lombok.ToString;

import java.util.List;

@ToString
public class FunctionDefinition implements SmtV20TopLevelExpression {
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

    @Override
    public String toSmtV20() {
        StringBuilder sb = new StringBuilder();
        SmtV20DeclareFunction function = new SmtV20DeclareFunction(this.name, this.outputType, this.inputTypes.toArray(new String[]{}));

        sb.append(function.toSmtV20());
        sb.append("\\n");


        return sb.toString();
    }
}
