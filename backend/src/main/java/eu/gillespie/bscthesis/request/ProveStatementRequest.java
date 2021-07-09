package eu.gillespie.bscthesis.request;

import lombok.*;
import lombok.experimental.Accessors;
import java.util.List;

@Accessors(chain = true)
@Getter
@Setter
@ToString
@AllArgsConstructor
public class ProveStatementRequest {
    @NonNull String constructorSymbol;
    @NonNull StatementTreeVertex statementTree;
    @NonNull List<FunctionDefinition> functionDefinitions;

}
