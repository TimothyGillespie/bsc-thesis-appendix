package eu.gillespie.bscthesis.request;

import com.google.gson.annotations.SerializedName;
import lombok.ToString;

import java.util.List;

@ToString
public class StatementTree {
    @SerializedName("symbol")
    String symbol;

    @SerializedName("parameters")
    List<StatementTree> parameters;

}
