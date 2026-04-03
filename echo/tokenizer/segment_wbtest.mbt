test "char_type - kanji numerals (M)" {
  inspect(char_type('一'), content="M")
  inspect(char_type('十'), content="M")
  inspect(char_type('万'), content="M")
  inspect(char_type('億'), content="M")
}

test "char_type - kanji (H)" {
  inspect(char_type('今'), content="H")
  inspect(char_type('日'), content="H")
  inspect(char_type('食'), content="H")
  inspect(char_type('々'), content="H")
  inspect(char_type('〆'), content="H")
}

test "char_type - hiragana (I)" {
  inspect(char_type('あ'), content="I")
  inspect(char_type('い'), content="I")
  inspect(char_type('ん'), content="I")
  inspect(char_type('は'), content="I")
}

test "char_type - katakana (K)" {
  inspect(char_type('ア'), content="K")
  inspect(char_type('ン'), content="K")
  inspect(char_type('ー'), content="K")
}

test "char_type - ASCII (A)" {
  inspect(char_type('a'), content="A")
  inspect(char_type('Z'), content="A")
  inspect(char_type('ａ'), content="A") // fullwidth
}

test "char_type - digits (N)" {
  inspect(char_type('0'), content="N")
  inspect(char_type('9'), content="N")
  inspect(char_type('０'), content="N") // fullwidth
}

test "char_type - other (O)" {
  inspect(char_type('。'), content="O")
  inspect(char_type('、'), content="O")
  inspect(char_type(' '), content="O")
  inspect(char_type('!'), content="O")
}

test "char_type - M before H priority" {
  // Kanji numerals like 一 fall in kanji range but should be M, not H
  inspect(char_type('一'), content="M")
  inspect(char_type('三'), content="M")
}
