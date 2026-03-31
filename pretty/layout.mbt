///|
pub enum Layout[A] {
  Empty
  Text(String)
  Line
  HardLine
  Nest(Int, Layout[A])
  Concat(Layout[A], Layout[A])
  Group(Layout[A])
  Annotate(A, Layout[A])
} derive(Show, Eq)
