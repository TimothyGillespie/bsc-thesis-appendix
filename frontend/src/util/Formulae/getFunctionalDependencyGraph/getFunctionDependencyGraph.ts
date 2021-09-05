import Graph from "@tgillespie/graph/lib/models/Graph/Graph";
import NamedVertex from "@tgillespie/graph/lib/models/Vertex/NamedVertex/NamedVertex";
import {FunctionGraph, FunctionTreeNode} from "../formula";
import FunctionGraphNode from "../FunctionGraphNode";
import FunctionGraphEdge from "../FunctionGraphEdge";

function getFunctionDependencyGraph(tree: FunctionTreeNode, g: FunctionGraph = new Graph()): FunctionGraph {
  const parentVertex = new FunctionGraphNode(tree.symbol, tree.parameters.length);
  g.addVertex(parentVertex);

  tree.parameters.forEach((child, index) => {
    const childVertex = new FunctionGraphNode(child.symbol, child.parameters.length);
    g.addVertex(childVertex);
    g.addEdge(new FunctionGraphEdge(parentVertex, childVertex, index));
    getFunctionDependencyGraph(child, g);
  });

  return g;
}

export default getFunctionDependencyGraph;
