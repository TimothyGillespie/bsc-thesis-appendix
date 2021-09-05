import Graph from "@tgillespie/graph/lib/models/Graph/Graph";
import {getFunctionTree} from "../getFunctionTree/getFunctionTree";
import getFunctionDependencyGraph from "./getFunctionDependencyGraph";
import {FunctionGraph} from "../formula";
import FunctionGraphNode from "../FunctionGraphNode";
import FunctionGraphEdge from "../FunctionGraphEdge";
import {vertexCompareTo} from "@tgillespie/graph/lib/models/Vertex/Vertex/Vertex";
import {edgeCompareTo} from "@tgillespie/graph/lib/models/Edge/Edge/Edge";

describe('getFunctionDependencyGraph(...)', () => {
  it("works", () => {
    const input = 'depth(x,e,u,e,size(e,x,c(e,i)))';
    const callTree = getFunctionTree(input);
    const generatedGraph = getFunctionDependencyGraph(callTree);

    const expectedGraph: FunctionGraph = new Graph();

    const depth = new FunctionGraphNode("depth", 5);
    const size = new FunctionGraphNode("size", 3);
    const c = new FunctionGraphNode("c", 2);
    const x = new FunctionGraphNode("x", 0);
    const e = new FunctionGraphNode("e", 0);
    const u = new FunctionGraphNode("u", 0);
    const i = new FunctionGraphNode("i", 0);

    expectedGraph.addVertex(
      depth, size, c, x, e, u, i
    );

    expectedGraph.addEdge(
      new FunctionGraphEdge(depth, x, 0),
      new FunctionGraphEdge(depth, e, 1),
      new FunctionGraphEdge(depth, u, 2),
      new FunctionGraphEdge(depth, e, 3),
      new FunctionGraphEdge(depth, size, 4),

      new FunctionGraphEdge(size, e, 0),
      new FunctionGraphEdge(size, x, 1),
      new FunctionGraphEdge(size, c, 2),

      new FunctionGraphEdge(c, e, 0),
      new FunctionGraphEdge(c, i, 1),
    );
    expect(generatedGraph.getListOfVertices().sort(vertexCompareTo)).toEqual(expectedGraph.getListOfVertices().sort(vertexCompareTo));
    expect(generatedGraph.getListOfEdges().sort(edgeCompareTo)).toEqual(expectedGraph.getListOfEdges().sort(edgeCompareTo));
  })
});
