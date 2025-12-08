import User from "../src/User.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();
  inputs.forEach((input) => {
    MissionUtils.Console.readLineAsync.mockReturnValueOnce(Promise.resolve(input));
  });
};

describe("User 클래스 테스트", () => {
  test("inputCarName: 자동차 이름을 올바르게 입력", async () => {
    mockQuestions(["pobi,woni,jun"]);
    const user = new User();
    await user.inputCarName();
    expect(user.carName).toBe("pobi,woni,jun");
  });

  test("inputTryCount: 시도 횟수를 올바르게 입력", async () => {
    mockQuestions(["5"]);
    const user = new User();
    await user.inputTryCount();
    expect(user.tryCount).toBe("5");
  });

  test("refinedName: 입력받은 자동차 이름을 쉼표로 구분", () => {
    const user = new User();
    user.carName = "pobi,woni,jun";
    expect(user.getRefinedName()).toEqual(["pobi", "woni", "jun"]);
  });

  test("tryCountValue: 입력받은 시도 횟수 값을 그대로 반환", () => {
    const user = new User();
    user.tryCount = "5";
    expect(user.getTryCountValue()).toBe("5");
  });
});
