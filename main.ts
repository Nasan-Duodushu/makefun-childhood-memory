// Make the AI Judge Feel Nostalgic: A Childhood Memory — entry program.
// Writes one childhood-memory sentence (<=280 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

class MemoryEntry {
  private readonly sentence: string;

  constructor(sentence: string) {
    this.sentence = sentence;
  }

  charCount(): number {
    return [...this.sentence].length;
  }

  validate(): void {
    const n = this.charCount();
    if (n < 1 || n > 280) {
      throw new Error(`sentence is ${n} chars, outside the 1-280 gate`);
    }
    if (this.sentence.trim() !== this.sentence) {
      throw new Error("entry must not start or end with whitespace");
    }
    if (this.sentence.includes("\n")) {
      throw new Error("entry must be a single sentence on one line");
    }
  }

  write(path: string): void {
    this.validate();
    mkdirSync("/output", { recursive: true });
    writeFileSync(path, this.sentence, "utf8");
  }
}

const entry = new MemoryEntry(
  "Grandma's kitchen smelled of rice steam and rain on the tin roof, and she would press the burnt crust from the bottom of the pot into my palm, as if it were a secret meant only for the two of us.",
);
entry.write("/output/entry.txt");
console.log(`wrote ${entry.charCount()} chars to /output/entry.txt`);
