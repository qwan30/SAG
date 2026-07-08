import { fileURLToPath } from 'node:url';
import path from 'node:path';

export function isMainModule(metaUrl: string): boolean {
  if (!process.argv[1]) return false;
  
  try {
    const modulePath = fileURLToPath(metaUrl);
    let entryPath = process.argv[1];

    const stripExt = (p: string) => {
      const ext = path.extname(p);
      return ext ? p.slice(0, -ext.length) : p;
    };
    
    // Normalize path separators and lowercase on Windows for case-insensitivity
    const normalize = (p: string) => 
      process.platform === 'win32' ? path.resolve(p).toLowerCase() : path.resolve(p);

    return stripExt(normalize(modulePath)) === stripExt(normalize(entryPath));
  } catch {
    return false;
  }
}
