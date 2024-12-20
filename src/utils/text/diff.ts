export interface DiffResult {
  type: 'add' | 'remove' | 'equal';
  value: string;
}

export function computeDiff(text1: string, text2: string): DiffResult[] {
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  const result: DiffResult[] = [];
  
  let i = 0, j = 0;
  while (i < lines1.length || j < lines2.length) {
    if (i < lines1.length && j < lines2.length && lines1[i] === lines2[j]) {
      result.push({ type: 'equal', value: lines1[i] });
      i++; j++;
    } else if (j < lines2.length) {
      result.push({ type: 'add', value: lines2[j] });
      j++;
    } else if (i < lines1.length) {
      result.push({ type: 'remove', value: lines1[i] });
      i++;
    }
  }
  
  return result;
}