package eu.gillespie.bscthesis.request;

import com.google.gson.annotations.SerializedName;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Z3Request {
    @SerializedName("some_input")
    Object someInput;
}
