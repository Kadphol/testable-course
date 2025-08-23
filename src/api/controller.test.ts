import { describe, expect, it } from "bun:test";
import { Controller, HandComparison } from "./controller";
import { GameResult } from "../poker/hand";
import * as uuid from "uuid";

class MockHandComparison implements HandComparison {
  private result: GameResult;

  constructor(result: GameResult = GameResult.Win) {
    this.result = result;
  }

  compareHands(playerHand: string, opponentHand: string): GameResult {
    return this.result;
  }
}

const testPlayerId = uuid.v4();

describe("Controller", () => {
  it("should return 501 when unsupported method", async () => {
    const controller = new Controller(new MockHandComparison());
    const request = new Request(
      new URL("/something", "http://host.com").toString(),
      {
        method: "POST",
      },
    );

    const response = await controller.handle(request);
    expect(response.status).toBe(501);
    const body = await response.text();
    expect(body).toBe("unsupported");
  });

  it("should return 422 when body is not json", async () => {
    const controller = new Controller(new MockHandComparison());
    const request = new Request(
      new URL(`/api/${testPlayerId}/showdown`, "http://host.com").toString(),
      {
        method: "POST",
        body: "not json",
      },
    );

    const response = await controller.handle(request);
    expect(response.status).toBe(422);
    const body = await response.text();
    expect(body).toBe("invalid request");
  });

  it("should return 422 when body is not valid json", async () => {
    const controller = new Controller(new MockHandComparison());
    const request = new Request(
      new URL(`/api/${testPlayerId}/showdown`, "http://host.com").toString(),
      {
        method: "POST",
        body: JSON.stringify({ invalid_field: "value" }),
      },
    );

    const response = await controller.handle(request);
    expect(response.status).toBe(422);
    const body = await response.text();
    expect(body).toBe("invalid request");
  });

  it("should return 422 when body with another_hand_id is not uuid", async () => {
    const controller = new Controller(new MockHandComparison());
    const request = new Request(
      new URL(`/api/${testPlayerId}/showdown`, "http://host.com").toString(),
      {
        method: "POST",
        body: JSON.stringify({ another_hand_id: "not-uuid" }),
      },
    );

    const response = await controller.handle(request);
    expect(response.status).toBe(422);
    const body = await response.text();
    expect(body).toBe("invalid request");
  });

  it("should return 422 when player id is not uuid", async () => {
    const controller = new Controller(new MockHandComparison());
    const request = new Request(
      new URL("/api/no/showdown", "http://host.com").toString(),
      {
        method: "POST",
        body: JSON.stringify({ player_id: uuid.v4() }),
      },
    );

    const response = await controller.handle(request);
    expect(response.status).toBe(422);
    const body = await response.text();
    expect(body).toBe("invalid request");
  });

  it("should return 200 when player id is valid", async () => {
    const controller = new Controller(new MockHandComparison());
    const request = new Request(
      new URL(`/api/${testPlayerId}/showdown`, "http://host.com").toString(),
      {
        method: "POST",
        body: JSON.stringify({ another_hand_id: uuid.v4() }),
      },
    );

    const response = await controller.handle(request);
    expect(response.status).toBe(200);
    const body = (await response.json()) as { result: string };
    expect(body["result"]).toBe("win");
  });

  it("should return 200 and lose when model return lose", async () => {
    const controller = new Controller(new MockHandComparison(GameResult.Lose));
    const request = new Request(
      new URL(`/api/${testPlayerId}/showdown`, "http://host.com").toString(),
      {
        method: "POST",
        body: JSON.stringify({ another_hand_id: uuid.v4() }),
      },
    );

    const response = await controller.handle(request);
    expect(response.status).toBe(200);
    const body = (await response.json()) as { result: string };
    expect(body["result"]).toBe("lose");
  });

  it("should return 200 and draw when model return draw", async () => {
    const controller = new Controller(new MockHandComparison(GameResult.Draw));
    const request = new Request(
      new URL(`/api/${testPlayerId}/showdown`, "http://host.com").toString(),
      {
        method: "POST",
        body: JSON.stringify({ another_hand_id: uuid.v4() }),
      },
    );

    const response = await controller.handle(request);
    expect(response.status).toBe(200);
    const body = (await response.json()) as { result: string };
    expect(body["result"]).toBe("draw");
  });

  class MockErrorHandComparison implements HandComparison {
    compareHands(handId: string, anotherHandId: string): GameResult {
      throw new Error("not found");
    }
  }

  it.only("should return 404 when model return error", async () => {
    const controller = new Controller(new MockErrorHandComparison());
    const request = new Request(
      new URL(`/api/${testPlayerId}/showdown`, "http://host.com").toString(),
      {
        method: "POST",
        body: JSON.stringify({ another_hand_id: uuid.v4() }),
      },
    );

    const response = await controller.handle(request);
    expect(response.status).toBe(404);
    expect(await response.text()).toBe("not found");
  });
});
