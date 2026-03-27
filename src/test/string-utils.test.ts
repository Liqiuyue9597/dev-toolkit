import { splitWords } from '../utils/string-utils';

// ─── Minimal test runner (zero dependencies) ─────────────────────────

let passed = 0;
let failed = 0;

function assert(label: string, actual: string[], expected: string[]): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    passed++;
    console.log(`  ✅ ${label}`);
  } else {
    failed++;
    console.log(`  ❌ ${label}`);
    console.log(`     expected: ${e}`);
    console.log(`     actual:   ${a}`);
  }
}

// ─── Tests ───────────────────────────────────────────────────────────

console.log('\n🧪 splitWords()\n');

// camelCase
assert('camelCase basic',       splitWords('myVarName'),      ['my', 'Var', 'Name']);
assert('camelCase single word', splitWords('hello'),           ['hello']);

// PascalCase
assert('PascalCase basic',      splitWords('MyVarName'),       ['My', 'Var', 'Name']);

// snake_case
assert('snake_case basic',      splitWords('my_var_name'),     ['my', 'var', 'name']);

// kebab-case
assert('kebab-case basic',      splitWords('my-var-name'),     ['my', 'var', 'name']);

// CONSTANT_CASE
assert('CONSTANT_CASE',         splitWords('MY_VAR_NAME'),     ['MY', 'VAR', 'NAME']);

// Consecutive uppercase (the tricky one)
assert('consecutive uppercase', splitWords('myHTMLParser'),    ['my', 'HTML', 'Parser']);
assert('all uppercase word',    splitWords('HTMLParser'),       ['HTML', 'Parser']);
assert('multiple acronyms',     splitWords('XMLHTTPRequest'),  ['XMLHTTP', 'Request']);

// Spaces
assert('space separated',       splitWords('hello world'),     ['hello', 'world']);
assert('extra whitespace',      splitWords('  hello  world '), ['hello', 'world']);

// Mixed delimiters
assert('mixed delimiters',      splitWords('my_var-name'),     ['my', 'var', 'name']);

// Numbers
assert('with numbers',          splitWords('item2Count'),      ['item', '2', 'Count']);
assert('numbers in snake',      splitWords('page_3_title'),    ['page', '3', 'title']);

// Edge cases
assert('empty string',          splitWords(''),                []);
assert('single char',           splitWords('a'),               ['a']);
assert('single uppercase',      splitWords('A'),               ['A']);

// ─── Summary ─────────────────────────────────────────────────────────

console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
