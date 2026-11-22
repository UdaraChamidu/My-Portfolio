import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import * as espree from "espree";

function inventory(source) {
  const ast = espree.parse(source, { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: { jsx: true } });
  const projects = ast.body.find((node) => node.type === "VariableDeclaration" && node.declarations[0].id.name === "projects").declarations[0].init;
  return projects.elements.map((element) => Object.fromEntries(element.properties.filter((property) => property.key.name !== "description").map((property) => [property.key.name, property.value.type === "ArrayExpression" ? property.value.elements.map((entry) => entry.value) : property.value.value])));
}

test("project identities, order, types, media, links, and featured flags remain intact", () => {
  const baseline = inventory(execFileSync("git", ["show", "HEAD:src/components/ProjectsSection.jsx"], { encoding: "utf8" }));
  const current = inventory(readFileSync(new URL("../src/components/ProjectsSection.jsx", import.meta.url), "utf8"));
  assert.deepEqual(current, baseline);
  assert.equal(current.filter((project) => project.featured).length, 9);
});
