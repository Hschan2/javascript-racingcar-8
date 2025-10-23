import Valid from "../src/Valid.js";

describe("Valid 클래스 테스트", () => {
  describe("isNotThingCarName: 자동차 이름 입력 유효성 검사", () => {
    test("자동차 이름이 빈 배열일 경우 에러", async () => {
      const valid = new Valid([], "5");
      await expect(valid.isNotThingCarName()).rejects.toThrow("[ERROR] 자동차 이름을 입력하지 않았습니다.");
    });

    test("자동차 이름이 비어있지 않으면 에러 없음", async () => {
      const valid = new Valid(["pobi", "woni"], "5");
      await expect(valid.isNotThingCarName()).resolves.not.toThrow();
    });
  });

  describe("isOverNameLength: 자동차 이름 길이 유효성 검사", () => {
    test("자동차 이름이 5자를 초과할 경우 에러", async () => {
      const valid = new Valid(["pobi", "javaji"], "5");
      await expect(valid.isOverNameLength()).rejects.toThrow("[ERROR] 자동차 이름이 5글자를 초과합니다.");
    });

    test("모든 자동차 이름이 5자 이하일 경우 에러 없음", async () => {
      const valid = new Valid(["pobi", "woni"], "5");
      await expect(valid.isOverNameLength()).resolves.not.toThrow();
    });
  });

  describe("isNotThingTryCount: 시도 횟수 입력 유효성 검사", () => {
    test("시도 횟수가 빈 문자열일 경우 에러", async () => {
      const valid = new Valid(["pobi", "woni"], "");
      await expect(valid.isNotThingTryCount()).rejects.toThrow("[ERROR] 시도할 횟수를 입력하지 않았습니다.");
    });

    test("시도 횟수가 비어있지 않으면 에러 없음", async () => {
      const valid = new Valid(["pobi", "woni"], "5");
      await expect(valid.isNotThingTryCount()).resolves.not.toThrow();
    });
  });

  describe("isValid: 전체 유효성 검사", () => {
    test("모든 유효성 검사 통과", async () => {
      const valid = new Valid(["pobi", "woni"], "5");
      await expect(valid.isValid()).resolves.not.toThrow();
    });

    test("하나라도 유효성 검사를 통과하지 못하면 에러", async () => {
      const invalidName = new Valid(["pobi", "javaji"], "5");
      const invalidTryCount = new Valid(["pobi", "woni"], "");

      await expect(invalidName.isValid()).rejects.toThrow();
      await expect(invalidTryCount.isValid()).rejects.toThrow();
    });
  });
});
