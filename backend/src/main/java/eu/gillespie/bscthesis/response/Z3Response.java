package eu.gillespie.bscthesis.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Z3Response {
    String z3Version;

    Object model;

    Object unsatisfiableCore;
    Object proof;
}
