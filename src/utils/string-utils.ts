/**
 * Core string utility: splits any formatted string into a word array.
 * This is the foundation for all case-transform functions.
 *
 * Examples:
 *   splitWords("myVarName")       → ["my", "Var", "Name"]
 *   splitWords("my_var_name")     → ["my", "var", "name"]
 *   splitWords("my-var-name")     → ["my", "var", "name"]
 *   splitWords("MY_VAR_NAME")     → ["MY", "VAR", "NAME"]
 *   splitWords("myHTMLParser")    → ["my", "HTML", "Parser"]
 *   splitWords("  hello  world ") → ["hello", "world"]
 */
export function splitWords(input: string): string[] {
  // Single regex match approach (similar to lodash _.words):
  // Pattern breakdown:
  //   [A-Z]+(?=[A-Z][a-z])  — consecutive uppercase followed by uppercase+lowercase → captures "HTM" from "HTMLParser"
  //   [A-Z][a-z]+           — one uppercase then lowercase(s) → captures "Parser", "Var", "Name"
  //   [A-Z]+                — all-uppercase word (e.g. in CONSTANT_CASE)
  //   [a-z]+                — all-lowercase word
  //   [0-9]+                — numeric segments
  const matches = input.match(
    /[A-Z]+(?=[A-Z][a-z])|[A-Z]?[a-z]+|[A-Z]+|[0-9]+/g
  );
  return matches ?? [];
}
