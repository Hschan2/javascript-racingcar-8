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
  test("constructor: 참가자 올바르게 초기화", () => {
    const game = new Game(["pobi", "woni"], "5");
    expect(game.participants).toEqual({ pobi: "", woni: "" });
  });

  describe("자동차 전진 로직 (_moveCars)", () => {
    test("랜덤 숫자가 4 이상일 때 전진", () => {
      mockRandoms([4, 3]);
      const game = new Game(["pobi", "woni"], "1");

      game._moveCars();

      expect(game.participants.pobi).toBe("-");
      expect(game.participants.woni).toBe("");
    });

    test("랜덤 숫자가 4 미만일 때 그대로 유지", () => {
      mockRandoms([0, 9]);
      const game = new Game(["pobi", "woni"], "1");

      game._moveCars();

      expect(game.participants.pobi).toBe("");
      expect(game.participants.woni).toBe("-");
    });
  });

  describe("우승자 계산 로직 (_getWinners)", () => {
    test("단독 우승자가 있을 경우 해당 우승자만 배열로 반환", () => {
      const game = new Game(["pobi", "woni"], "1");
      game.participants = { pobi: "--", woni: "-" };

      const winners = game._getWinners();

      expect(winners).toEqual(["pobi"]);
    });

    test("공동 우승자가 있을 경우 모든 우승자를 배열로 반환", () => {
      const game = new Game(["pobi", "woni", "jun"], "1");
      game.participants = { pobi: "--", woni: "-", jun: "--" };

      const winners = game._getWinners();

      expect(winners).toEqual(["pobi", "jun"]);
    });

    test("아무도 전진하지 않았을 경우 빈 배열 반환", () => {
      const game = new Game(["pobi", "woni"], "1");
      game.participants = { pobi: "", woni: "" };

      const winners = game._getWinners();

      expect(winners).toEqual([]);
    });
  });

  describe("우승자 출력 (printWinners)", () => {
    test("계산된 우승자들을 형식에 맞게 올바르게 출력", () => {
      const logSpy = getLogSpy();
      const game = new Game(["pobi", "woni", "jun"], "1");
      game.participants = { pobi: "--", woni: "-", jun: "--" };

      game.printWinners();

      expect(logSpy).toHaveBeenCalledWith("최종 우승자 : pobi, jun");
    });
  });

  describe("전체 게임 흐름 테스트 (play)", () => {
    test("게임이 시작부터 끝까지 올바르게 동작하고 결과 출력", async () => {
      mockRandoms([9, 0, 8, 1]);
      const logSpy = getLogSpy();
      const game = new Game(["pobi", "woni"], "2");

      await game.play();

      const expectedFinalState = { pobi: "--", woni: "" };
      expect(game.participants).toEqual(expectedFinalState);

      const expectedLogs = [
        "\n실행 결과",
        "pobi : -",
        "woni : ",
        "",
        "pobi : --",
        "woni : ",
        "",
        "최종 우승자 : pobi",
      ];

      expectedLogs.forEach((log) => {
        expect(logSpy).toHaveBeenCalledWith(log);
      });
    });
  });
});