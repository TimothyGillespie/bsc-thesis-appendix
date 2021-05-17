package eu.gillespie.bscthesis.smt.v20.model;

import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression;
import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;
import java.util.stream.Collectors;

@Getter
@Setter
public class SmtV20DeclareFunction implements SmtV20TopLevelExpression {

    String name;
    String[] parameterTypes;
    String outputType;

    public SmtV20DeclareFunction(String name, String outputType, String... parameterTypes) {
        this.name = name;
        this.outputType = outputType;
        this.parameterTypes = parameterTypes;
    }

    @Override
    public String toSmtV20() {
        String parameterTypeString = Arrays.stream(this.getParameterTypes()).collect(Collectors.joining(" "));

        return String.format("(declare-fun %s (%s) %s)", this.getName(), parameterTypeString, this.getOutputType());
    }
}
