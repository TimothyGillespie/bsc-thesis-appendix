package eu.gillespie.bscthesis.tests.tosmtv20conversion;

import eu.gillespie.bscthesis.converter.tosmt.v20.ToSmtV20Converter;
import eu.gillespie.bscthesis.request.ConditionalDefinition;
import eu.gillespie.bscthesis.request.Definition;
import eu.gillespie.bscthesis.request.FunctionDefinition;
import eu.gillespie.bscthesis.request.StatementTreeVertex;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20NamedAssert;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20Expression;
import eu.gillespie.bscthesis.tests.shared.ComparisonUtil;
import eu.gillespie.bscthesis.tests.shared.FileLoader;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FunctionDefinitionToSmtV20Test {
    @Test
    void correctConversionToSmtV20Simple() {
        assertEquals(
                ComparisonUtil.stripNewLines(FileLoader.load("smt/v20/provestatementrequest/functionDefinitionsWithInputVariableAndConditional.smt2")),
                ComparisonUtil.stripNewLines(
                        ToSmtV20Converter.generateFunctionDefinitions(
                            new FunctionDefinition(
                                    "max",
                                    2,
                                    Arrays.asList("Int", "Int"),
                                    "Int",
                                    Definition.builder()
                                        .inputVariable(Arrays.asList("a", "b"))
                                        .conditional(Arrays.asList(
                                                new ConditionalDefinition(
                                                        new StatementTreeVertex(
                                                                ">",
                                                                Arrays.asList(
                                                                        new StatementTreeVertex("a", Collections.emptyList()),
                                                                        new StatementTreeVertex("b", Collections.emptyList())
                                                                )
                                                        ),
                                                        new StatementTreeVertex(
                                                                "a",
                                                                Collections.emptyList()
                                                        )
                                                )

                                        )).otherwise(new StatementTreeVertex("b", Collections.emptyList())).build()
                            )
                    ).stream().map(SmtV20Expression::toSmtV20).collect(Collectors.joining())
                )
        );
    }
}
