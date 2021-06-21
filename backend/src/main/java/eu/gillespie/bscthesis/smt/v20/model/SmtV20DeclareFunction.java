package eu.gillespie.bscthesis.smt.v20.model;

import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
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
        String parameterTypeString = String.join(" ", this.getParameterTypes());

        return String.format("(declare-fun %s (%s) %s)", this.getName(), parameterTypeString, this.getOutputType());
    }
}
