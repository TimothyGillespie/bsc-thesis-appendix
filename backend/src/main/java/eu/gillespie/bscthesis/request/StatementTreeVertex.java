package eu.gillespie.bscthesis.request;

import com.google.gson.annotations.SerializedName;
import lombok.ToString;

import java.util.List;

@ToString
public class StatementTreeVertex {
    @SerializedName("symbol")
    String symbol;

    @SerializedName("parameters")
    List<StatementTreeVertex> parameters;

}
