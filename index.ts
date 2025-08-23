import type { GameResult, Hand } from "./src/poker/hand";
import { printResult } from "./src/printer";
import { Reader } from "./src/reader";

function main() {
  const reader = new Reader("./test_input/sample.json");
  const hands = reader.read() as Hand[];

  // eslint-disable-next-line no-console
  console.log(
    printResult(hands[0]?.compareHand(hands[1] as Hand) as GameResult),
  );
}

main();
