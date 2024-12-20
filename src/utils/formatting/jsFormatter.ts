export function formatJavaScript(code: string): string {
  return code
    .replace(/{\s*/g, ' {\n  ')
    .replace(/}\s*/g, '\n}\n')
    .replace(/;\s*/g, ';\n  ')
    .replace(/,\s*/g, ', ')
    .replace(/\s*=\s*/g, ' = ')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

export function minifyJavaScript(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,=])\s*/g, '$1')
    .trim();
}