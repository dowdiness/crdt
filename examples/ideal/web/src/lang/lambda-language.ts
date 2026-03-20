import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";
import { parser } from "./lambda-parser.js";

const lambdaHighlight = styleTags({
  "let if then else": t.keyword,
  Lambda: t.keyword,
  Dot: t.punctuation,
  "LetDef/VariableName": t.definition(t.variableName),
  VariableName: t.variableName,
  Number: t.number,
  Operator: t.arithmeticOperator,
  "( )": t.paren,
  "=": t.definitionOperator,
});

const lambdaLanguage = LRLanguage.define({
  name: "lambda",
  parser: parser.configure({ props: [lambdaHighlight] }),
  languageData: {
    commentTokens: {},
  },
});

export function lambda(): LanguageSupport {
  return new LanguageSupport(lambdaLanguage);
}
