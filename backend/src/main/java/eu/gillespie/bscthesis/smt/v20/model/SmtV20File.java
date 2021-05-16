package eu.gillespie.bscthesis.smt.v20.model;

import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20Expression;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
public class SmtV20File implements SmtV20Expression {

    private static final String optionTemplate = "(set-option %s %s)\n";

    boolean produceUnsatCores = false;
    boolean smtCoreMinimize = false;

    @Setter(AccessLevel.PRIVATE)
    @Getter(AccessLevel.PRIVATE)
    List<SmtV20TopLevelExpression> topLevelExpressions;


    public SmtV20File() {
        this.setTopLevelExpressions(new LinkedList<>());
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
