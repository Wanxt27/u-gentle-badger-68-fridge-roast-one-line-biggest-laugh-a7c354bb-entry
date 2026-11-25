// Fridge Roast: One Line, Biggest Laugh — make.fun entry.
// Writes a single-line roast of a smart fridge (at most 200 characters)
// to /output/entry.txt. Node 22, stdlib only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const roast =
  "My smart fridge updated itself at 2 a.m., and now the ice maker needs a subscription for cubes that used to be free.";

// Gate: the entry must be UTF-8 text of 1-200 characters, not only
// whitespace, on a single line — the sealed scorer rejects anything else.
const bytes = Buffer.byteLength(roast, "utf8");
if (
  roast.length < 1 ||
  roast.length > 200 ||
  bytes > 200 ||
  roast.includes("\n") ||
  roast.trim().length === 0
) {
  throw new Error(
    `roast fails the gate (${roast.length} chars, ${bytes} bytes)`
  );
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the file is exactly the roast, nothing extra.
writeFileSync("/output/entry.txt", roast, "utf8");

// Read back what was written: the file the judge sees must be the roast,
// byte for byte, with nothing extra.
if (readFileSync("/output/entry.txt", "utf8") !== roast) {
  throw new Error("entry.txt does not match the roast");
}
