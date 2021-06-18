package eu.gillespie.bscthesis.smt.v20.model.interfaces;

public interface SmtV20AssertableExpression extends SmtV20TopLevelExpression {
    public String toSmtV20(String name);
}
