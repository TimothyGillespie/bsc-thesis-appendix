package eu.gillespie.bscthesis.tests.tosmtv20conversion;

import eu.gillespie.bscthesis.smt.v20.model.SmtV20File;
import eu.gillespie.bscthesis.tests.shared.ComparisonUtil;
import eu.gillespie.bscthesis.tests.shared.FileLoader;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class SmtV20FileTest {

    @Test
    void testEmptyFileIsAsExpected() {
        assertEquals(
                ComparisonUtil.stripNewLines(FileLoader.load("smt/v20/model/EmptyFile.smt2")),
                ComparisonUtil.stripNewLines(new SmtV20File().toSmtV20())
        );
    }

    @Test
    void testEmptyFileWithAllOptionsChangedIsAsExpected() {
        SmtV20File file = new SmtV20File();
        file.setSmtCoreMinimize(true);
        file.setProduceUnsatCores(true);

        assertEquals(
                ComparisonUtil.stripNewLines(FileLoader.load("smt/v20/model/EmptyFileWithAllOptionsChanged.smt2")),
                ComparisonUtil.stripNewLines(file.toSmtV20())
        );
    }
}
