package eu.gillespie.bscthesis.smt.v20.model;

import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20Expression;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

import java.util.LinkedList;
import java.util.List;

@Accessors(chain = true)
@Getter
@Setter
public class SmtV20File implements SmtV20Expression {

    private static final String optionTemplate = "(set-option %s %s)\n";

    boolean produceUnsatCores = false;
    boolean smtCoreMinimize = false;

    List<SmtV20TopLevelExpression> topLevelExpressions;


    public SmtV20File() {
        this.setTopLevelExpressions(new LinkedList<>());
    }

    public SmtV20File declareFunction(String name, String outputType, String... parameterTypes) {
        this.getTopLevelExpressions().add(new SmtV20DeclareFunction(name, outputType, parameterTypes));
        return this;
    }

    public SmtV20File defineSort(String name) {
        this.getTopLevelExpressions().add(new SmtV20DefineSort(name));
        return this;
    }

    public boolean addTopLevelExpression(SmtV20TopLevelExpression topLevelExpression) {
        return this.getTopLevelExpressions().add(topLevelExpression);
    }

    @Override
    public String toSmtV20() {
        StringBuilder sb = new StringBuilder();

        sb.append(String.format(optionTemplate, ":produce-unsat-cores", String.valueOf(this.isProduceUnsatCores())));
        sb.append(String.format(optionTemplate, ":smt.core.minimize", String.valueOf(this.isSmtCoreMinimize())));

        for(SmtV20TopLevelExpression singleTopLevelExpression : topLevelExpressions)
            sb.append(singleTopLevelExpression.toSmtV20())
                    .append("\n");

        sb.append("(exit)");
        return sb.toString();
    }
}
