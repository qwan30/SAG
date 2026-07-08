import { describe, it, expect, afterEach } from "vitest";
import { isMainModule } from "../src/utils/is-main.js";
import { pathToFileURL } from "node:url";

describe("isMainModule", () => {
  const originalArgv = process.argv;
  const originalPlatform = process.platform;

  afterEach(() => {
    Object.defineProperty(process, 'argv', { value: originalArgv });
    Object.defineProperty(process, 'platform', { value: originalPlatform });
  });

  it("should return true when module matches argv[1] on Linux", () => {
    Object.defineProperty(process, 'platform', { value: 'linux' });
    Object.defineProperty(process, 'argv', { 
      value: ['node', '/app/src/db/migrate.ts'] 
    });
    
    const metaUrl = pathToFileURL('/app/src/db/migrate.ts').href;
    expect(isMainModule(metaUrl)).toBe(true);
  });

  it("should return false when module does not match argv[1]", () => {
    Object.defineProperty(process, 'argv', { 
      value: ['node', '/app/src/db/seed.ts'] 
    });
    
    const metaUrl = pathToFileURL('/app/src/db/migrate.ts').href;
    expect(isMainModule(metaUrl)).toBe(false);
  });

  it("should return true when module matches argv[1] on Windows (different case)", () => {
    Object.defineProperty(process, 'platform', { value: 'win32' });
    Object.defineProperty(process, 'argv', { 
      value: ['node', 'c:\\app\\src\\db\\migrate.ts'] 
    });
    
    // simulate import.meta.url which has uppercase drive letter
    const metaUrl = pathToFileURL('C:\\app\\src\\db\\migrate.ts').href;
    expect(isMainModule(metaUrl)).toBe(true);
  });

  it("should return true even when argv[1] lacks file extension", () => {
    Object.defineProperty(process, 'platform', { value: 'linux' });
    Object.defineProperty(process, 'argv', { 
      value: ['node', '/app/src/db/migrate'] 
    });
    
    const metaUrl = pathToFileURL('/app/src/db/migrate.ts').href;
    expect(isMainModule(metaUrl)).toBe(true);
  });

  it("should return false if process.argv[1] is undefined", () => {
    Object.defineProperty(process, 'argv', { value: ['node'] });
    const metaUrl = pathToFileURL('/app/src/db/migrate.ts').href;
    expect(isMainModule(metaUrl)).toBe(false);
  });
});
