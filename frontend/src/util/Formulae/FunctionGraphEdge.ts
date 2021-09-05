import Edge from "@tgillespie/graph/lib/models/Edge/Edge/Edge";
import FunctionGraphNode from "./FunctionGraphNode";

class FunctionGraphEdge<V extends FunctionGraphNode> extends Edge<V> {
  parameterIndex: number;

  constructor(vertexA: V, vertexB: V, parameterIndex: number) {
    super(vertexA, vertexB);
    this.parameterIndex = parameterIndex;
  }

  isDirected(): boolean {
    return true;
  }
}

export default FunctionGraphEdge;
