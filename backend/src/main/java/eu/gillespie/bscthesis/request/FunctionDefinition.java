package eu.gillespie.bscthesis.request;

import com.google.gson.annotations.SerializedName;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20DeclareFunction;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20AssertableExpression;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression;
import lombok.ToString;

import java.util.List;

@ToString
public class FunctionDefinition {
    String name;

    Integer arity;

    List<String> inputTypes;

    String outputType;

    Definition definition;

}
