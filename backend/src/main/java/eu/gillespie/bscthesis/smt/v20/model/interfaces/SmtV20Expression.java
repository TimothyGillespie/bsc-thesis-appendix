package eu.gillespie.bscthesis.smt.v20.model.interfaces;

import lombok.NonNull;

public interface SmtV20Expression {
    @NonNull
    public String toSmtV20();
}
