package eu.gillespie.bscthesis.tests.tosmtv20conversion;

import eu.gillespie.bscthesis.request.StatementTreeVertex;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20File;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20NamedAssert;
import eu.gillespie.bscthesis.tests.shared.ComparisonUtil;
import eu.gillespie.bscthesis.tests.shared.FileLoader;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.LinkedList;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class StatementTreeVertexToSmtV20Test {

    @Test
    void testSimpleConversion() {
        StatementTreeVertex tree = new StatementTreeVertex(
            "=",
            Arrays.asList(
                    new StatementTreeVertex(
                        "3",
                        new LinkedList<>()
                    ),
                    new StatementTreeVertex(
                            "depth",
                            Arrays.asList(
                                    new StatementTreeVertex("u", new LinkedList<>()),
                                    new StatementTreeVertex("v", new LinkedList<>()))
                    )
            )
        );

        assertEquals(
            ComparisonUtil.stripNewLines(FileLoader.load("smt/v20/statementtree/3EqDepthUV.smt2")),
            ComparisonUtil.stripNewLines(tree.toSmtV20())
        );
    }

}
