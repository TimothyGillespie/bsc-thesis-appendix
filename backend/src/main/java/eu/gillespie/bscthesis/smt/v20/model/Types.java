package eu.gillespie.bscthesis.smt.v20.model;

import lombok.Getter;

@Getter
public enum Types {
    INT("Int"),
    REAL("Real");

    String name;

    Types(String smtV20Name) {
        this.name = smtV20Name;
    }
}
