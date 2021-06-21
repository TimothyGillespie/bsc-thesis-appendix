package eu.gillespie.bscthesis.tests.tosmtv20conversion;

import eu.gillespie.bscthesis.converter.tosmt.v20.ToSmtV20Converter;
import eu.gillespie.bscthesis.request.Definition;
import eu.gillespie.bscthesis.request.FunctionDefinition;
import eu.gillespie.bscthesis.request.ProveStatementRequest;
import eu.gillespie.bscthesis.request.StatementTreeVertex;
import eu.gillespie.bscthesis.smt.v20.model.SmtV20DeclareFunction;
import eu.gillespie.bscthesis.tests.shared.ComparisonUtil;
import eu.gillespie.bscthesis.tests.shared.FileLoader;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;

class DeclareFunctionsFromProveStatementRequestTest {
    @Test
    void generatesAllSevenFunctionDefinitions() {
        StatementTreeVertex xTree = new StatementTreeVertex("x", Collections.emptyList());

        ProveStatementRequest request = new ProveStatementRequest(
                xTree,
                Arrays.asList(
                        new FunctionDefinition("depth", 2, Arrays.asList("BTree", "BTree"), "Int", Definition.builder().conditional(Collections.emptyList()).otherwise(xTree).build()),
                        new FunctionDefinition("size", 2, Arrays.asList("BTree", "BTree"), "Int", Definition.builder().conditional(Collections.emptyList()).otherwise(xTree).build()),
                        new FunctionDefinition("cuv", 0, Collections.emptyList(), "BTree", Definition.builder().conditional(Collections.emptyList()).otherwise(xTree).build()),
                        new FunctionDefinition("u", 0, Collections.emptyList(), "BTree", Definition.builder().conditional(Collections.emptyList()).otherwise(xTree).build()),
                        new FunctionDefinition("v", 0, Collections.emptyList(), "BTree", Definition.builder().conditional(Collections.emptyList()).otherwise(xTree).build()),
                        new FunctionDefinition("c", 2, Arrays.asList("BTree", "BTree"), "BTree", Definition.builder().conditional(Collections.emptyList()).otherwise(xTree).build()),
                        new FunctionDefinition("max", 2, Arrays.asList("Int", "Int"), "Int", Definition.builder().conditional(Collections.emptyList()).otherwise(xTree).build())
                )
        );

        assertEquals(
                ComparisonUtil.stripNewLines(FileLoader.load("smt/v20/provestatementrequest/sevenFunctionDeclarations.smt2")),
                ComparisonUtil.stripNewLines(ToSmtV20Converter.generateFunctionDeclarations(request).stream().map(SmtV20DeclareFunction::toSmtV20).collect(Collectors.joining()))
        );
    }
}
