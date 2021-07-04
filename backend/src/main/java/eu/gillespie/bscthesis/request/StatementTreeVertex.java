package eu.gillespie.bscthesis.request;

import com.rits.cloning.Cloner;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20Expression;
import lombok.*;
import lombok.experimental.Delegate;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@ToString
@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
public class StatementTreeVertex implements SmtV20Expression {
    @NonNull String symbol;

    @NonNull List<StatementTreeVertex> parameters;

    public StatementTreeVertex(String symbol) {
        this.symbol = symbol;
        this.parameters = new LinkedList<>();
    }

    @Override
    public String toSmtV20() {
        StringBuilder sb = new StringBuilder();

        if(!getParameters().isEmpty())
            sb.append("(");

        sb.append(this.getSymbol());

        if(!getParameters().isEmpty()) {
            for (StatementTreeVertex singleParameter : this.getParameters()) {
                sb.append(" ");
                sb.append(singleParameter.toSmtV20());
            }
            sb.append(")");
        }

        return sb.toString();
    }

    public boolean containsOrEquals(StatementTreeVertex tree) {
        return this.equals(tree) || this.contains(tree);
    }

    public boolean contains(StatementTreeVertex tree) {
        return this.getParameters().stream().anyMatch(x -> x.containsOrEquals(tree));
    }

    public StatementTreeVertex getClone() {
        return new Cloner().deepClone(this);
    }
}
