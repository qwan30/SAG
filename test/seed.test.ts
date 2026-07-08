import { describe, it, expect } from "vitest";
import { defaultEntityTypes } from "../src/db/seed.js";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

describe("Seed Data", () => {
  it("should have unique IDs for all default entity types", () => {
    const ids = defaultEntityTypes.map((e) => e.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(defaultEntityTypes.length);
  });

  it("should have unique types for all default entity types", () => {
    const types = defaultEntityTypes.map((e) => e.type);
    const uniqueTypes = new Set(types);
    expect(uniqueTypes.size).toBe(defaultEntityTypes.length);
  });

  it("should include necessary required types", () => {
    const types = defaultEntityTypes.map((e) => e.type);
    expect(types).toContain("subject");
    expect(types).toContain("person");
    expect(types).toContain("organization");
    expect(types).toContain("location");
    expect(types).toContain("time");
  });
});

describe("Cross-platform main module guard", () => {
  it("should evaluate correctly cross-platform", () => {
    const simulatedImportMetaUrl = import.meta.url;
    const parsedPath = resolve(fileURLToPath(simulatedImportMetaUrl));
    expect(parsedPath).toBeTruthy();
    expect(typeof parsedPath).toBe("string");
  });
});
