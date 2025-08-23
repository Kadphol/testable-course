import * as uuid from "uuid";
import { GameResult } from "../poker/hand";

export class HandComparison {
  constructor() {
    // Initialize hand comparison logic here
  }

  compareHands(handId: string, anotherHandId: string): GameResult {
    // Implement hand comparison logic here
    return GameResult.Win;
  }
}

export class Controller {
  private handComparison: HandComparison;
  constructor(handComparison: HandComparison) {
    this.handComparison = handComparison;
  }

  async handle(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const match = url.pathname.match("/api/(.+)/showdown");
    const method = request.method;
    if (!match || method !== "POST") {
      return new Response("unsupported", {
        status: 501,
      });
    }
    const handId = match[1] as string;
    try {
      const body = (await request.json()) as { another_hand_id: string };
      const anotherHandId = body["another_hand_id"];
      if (!anotherHandId) {
        return new Response("invalid request", { status: 422 });
      }
      if (!(uuid.validate(handId) && uuid.validate(anotherHandId))) {
        return new Response("invalid request", { status: 422 });
      }
      const result = this.handComparison.compareHands(handId, anotherHandId);
      return new Response(JSON.stringify({ result: getResult(result) }), {
        status: 200,
      });
    } catch (error) {
      if (error instanceof SyntaxError) {
        return new Response("invalid request", { status: 422 });
      }

      if ((error as Error).message === "not found") {
        return new Response("not found", { status: 404 });
      }

      return new Response("unknown error", { status: 500 });
    }
  }
}

function getResult(result: GameResult): string {
  switch (result) {
    case GameResult.Win:
      return "win";
    case GameResult.Lose:
      return "lose";
    case GameResult.Draw:
      return "draw";
  }
}
