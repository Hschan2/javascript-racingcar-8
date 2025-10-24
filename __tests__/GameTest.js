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
  test("constructor: 참가자를 올바르게 초기화해야 한다", () => {
    const game = new Game(["pobi", "woni"], "5");
    expect(game.participants).toEqual({ pobi: "", woni: "" });
  });

  describe("자동차 전진 로직 (_moveCars)", () => {
    test("랜덤 숫자가 4 이상일 때 전진해야 한다", () => {
      // given
      mockRandoms([4, 3]);
      const game = new Game(["pobi", "woni"], "1");

      // when
      game._moveCars();

      // then
      expect(game.participants.pobi).toBe("-");
      expect(game.participants.woni).toBe("");
    });

    test("랜덤 숫자가 4 미만일 때 멈춰야 한다", () => {
      // given
      mockRandoms([0, 9]);
      const game = new Game(["pobi", "woni"], "1");

      // when
      game._moveCars();

      // then
      expect(game.participants.pobi).toBe("");
      expect(game.participants.woni).toBe("-");
    });
  });

  describe("우승자 계산 로직 (_getWinners)", () => {
    test("단독 우승자가 있을 경우 해당 우승자만 배열로 반환해야 한다", () => {
      // given
      const game = new Game(["pobi", "woni"], "1");
      game.participants = { pobi: "--", woni: "-" };

      // when
      const winners = game._getWinners();

      // then
      expect(winners).toEqual(["pobi"]);
    });

    test("공동 우승자가 있을 경우 모든 우승자를 배열로 반환해야 한다", () => {
      // given
      const game = new Game(["pobi", "woni", "jun"], "1");
      game.participants = { pobi: "--", woni: "-", jun: "--" };

      // when
      const winners = game._getWinners();

      // then
      expect(winners).toEqual(["pobi", "jun"]);
    });

    test("아무도 전진하지 않았을 경우 빈 배열을 반환해야 한다", () => {
      // given
      const game = new Game(["pobi", "woni"], "1");
      game.participants = { pobi: "", woni: "" };

      // when
      const winners = game._getWinners();

      // then
      expect(winners).toEqual([]);
    });
  });

  describe("우승자 출력 (printWinners)", () => {
    test("계산된 우승자들을 형식에 맞게 올바르게 출력해야 한다", () => {
      // given
      const logSpy = getLogSpy();
      const game = new Game(["pobi", "woni", "jun"], "1");
      game.participants = { pobi: "--", woni: "-", jun: "--" };

      // when
      game.printWinners();

      // then
      expect(logSpy).toHaveBeenCalledWith("최종 우승자 : pobi, jun");
    });
  });

  describe("전체 게임 흐름 테스트 (play)", () => {
    test("게임이 시작부터 끝까지 올바르게 동작하고 결과를 출력해야 한다", async () => {
      // given
      mockRandoms([9, 0, 8, 1]); // pobi: 전진, woni: 멈춤, pobi: 전진, woni: 멈춤
      const logSpy = getLogSpy();
      const game = new Game(["pobi", "woni"], "2");

      // when
      await game.play();

      // then
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