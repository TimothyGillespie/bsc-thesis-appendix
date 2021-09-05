import Edge from "@tgillespie/graph/lib/models/Edge/Edge/Edge";
import FunctionGraphNode from "./FunctionGraphNode";

class FunctionGraphEdge<V extends FunctionGraphNode> extends Edge<V> {
  parameterNumber: number;

  constructor(vertexA: V, vertexB: V, parameterNumber: number) {
    super(vertexA, vertexB);
    this.parameterNumber = parameterNumber;
  }

  isDirected(): boolean {
    return true;
  }
}

export default FunctionGraphEdge;
