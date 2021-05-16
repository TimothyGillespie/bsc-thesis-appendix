package eu.gillespie.bscthesis.tests.shared;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Objects;

public class FileLoader {
    public static String load(String filePath) {
        ClassLoader classLoader = FileLoader.class.getClassLoader();
        File file = new File(Objects.requireNonNull(classLoader.getResource(filePath)).getFile());
        try {
            return new String(Files.readAllBytes(file.toPath()));
        } catch (IOException e) {
            // For tests we don't need to handle exceptions - the test should just fail
            throw new RuntimeException(e);
        }
    }
}
