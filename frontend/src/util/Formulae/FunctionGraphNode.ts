import Vertex from "@tgillespie/graph/lib/models/Vertex/Vertex/Vertex";

class FunctionGraphNode extends Vertex {

  name: string;
  arity: number;

  constructor(name: string, arity: number) {
    super();
    this.name = name;
    this.arity = arity;
  }


  compareTo(other: this): number {
    const nameCompare = this.name.localeCompare(other.name);
    if(nameCompare != 0)
      return nameCompare;

    return this.arity - other.arity;
  }

  equals(other: any): boolean {
    return this.name === other.name && this.arity === other.arity;
  }

}

export default FunctionGraphNode;
