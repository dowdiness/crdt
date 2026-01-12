fn main {
  let dot = "digraph { node2 [label=\"Plus\\n+\"] [color=\"red\"]; }"
  match @parser.parse_dot(dot) {
    Some(graph) => {
      println("Parsed graph successfully")
      println("Statements: \(graph.statements.length())")
      for i, stmt in graph.statements {
        println("Statement \(i): \(stmt)")
      }
    }
    None => println("Failed to parse")
  }
}
