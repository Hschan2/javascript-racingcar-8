import Game from "../src/Game.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.forEach((number) => {
    MissionUtils.Random.pickNumberInRange.mockReturnValueOnce(number);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("Game 클래스 테스트", () => {
  test("constructor: 참가자를 올바르게 초기화", () => {
    const game = new Game(["pobi", "woni"], "5");
    expect(game.participants).toEqual({ pobi: "", woni: "" });
  });

  describe("racing: 레이싱 로직 테스트", () => {
    test("랜덤 숫자가 4 이상일 때 전진", async () => {
      mockRandoms([4, 3]);
      const logSpy = getLogSpy();
      const game = new Game(["pobi", "woni"], "1");

      await game.racing();

      expect(game.participants.pobi).toBe("-");
      expect(game.participants.woni).toBe("");
      expect(logSpy).toHaveBeenCalledWith("pobi : -");
      expect(logSpy).toHaveBeenCalledWith("woni : ");
    });
  });

  describe("result: 최종 우승자 발표 테스트", () => {
    test("단독 우승자가 있을 경우 올바르게 출력", async () => {
      const logSpy = getLogSpy();
      const game = new Game(["pobi", "woni"], "1");
      game.participants = { pobi: "--", woni: "-" };

      await game.result();

      expect(logSpy).toHaveBeenCalledWith("최종 우승자 : pobi");
    });

    test("공동 우승자가 있을 경우 쉼표로 구분하여 모두 출력", async () => {
      const logSpy = getLogSpy();
      const game = new Game(["pobi", "woni", "jun"], "1");
      game.participants = { pobi: "--", woni: "-", jun: "--" };

      await game.result();

      expect(logSpy).toHaveBeenCalledWith("최종 우승자 : pobi, jun");
    });

    test("모든 참가자가 전진하지 않았을 경우 모두 우승자로 출력", async () => {
      const logSpy = getLogSpy();
      const game = new Game(["pobi", "woni"], "1");
      game.participants = { pobi: "", woni: "" };

      await game.result();

      expect(logSpy).toHaveBeenCalledWith("최종 우승자 : pobi, woni");
    });
  });

  test("game: 전체 게임 흐름 테스트", async () => {
    mockRandoms([9, 0, 8, 1]);
    const logSpy = getLogSpy();
    const game = new Game(["pobi", "woni"], "2");

    await game.game();

    expect(game.participants).toEqual({ pobi: "--", woni: "" });

    await game.result();
    expect(logSpy).toHaveBeenCalledWith("최종 우승자 : pobi");
  });
});
