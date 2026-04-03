///| Classifies a character into one of 7 types for TinySegmenter.
/// M (kanji numerals) is matched before H (general kanji) because
/// their Unicode ranges overlap — the match order is load-bearing.
fn char_type(c : Char) -> String {
  match c {
    '一' | '二' | '三' | '四' | '五' | '六' | '七' | '八' | '九'
    | '十' | '百' | '千' | '万' | '億' | '兆' => "M"
    '一'..='龠' | '々' | '〆' | 'ヵ' | 'ヶ' => "H"
    'ぁ'..='ん' => "I"
    'ァ'..='ヴ' | 'ー' | 'ｱ'..='ﾝ' | 'ﾞ' | 'ｰ' => "K"
    'a'..='z' | 'A'..='Z' | 'ａ'..='ｚ' | 'Ａ'..='Ｚ' => "A"
    '0'..='9' | '０'..='９' => "N"
    _ => "O"
  }
}
