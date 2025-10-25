import Valid from "../src/Valid.js";

describe("Valid 클래스 테스트", () => {
  describe("validateCarNameIsNotEmpty: 자동차 이름 입력 유효성 검사", () => {
    test("자동차 이름이 빈 배열일 경우 에러", () => {
      const valid = new Valid([], "5");
      expect(() => valid.validateCarNameIsNotEmpty()).toThrow("[ERROR] 자동차 이름을 입력하지 않았습니다.");
    });

    test("자동차 이름이 비어있지 않으면 에러 없음", () => {
      const valid = new Valid(["pobi", "woni"], "5");
      expect(() => valid.validateCarNameIsNotEmpty()).not.toThrow();
    });
  });

  describe("validateCarNameLength: 자동차 이름 길이 유효성 검사", () => {
    test("자동차 이름이 5자를 초과할 경우 에러", () => {
      const valid = new Valid(["pobi", "javaji"], "5");
      expect(() => valid.validateCarNameLength()).toThrow("[ERROR] 자동차 이름이 5글자를 초과합니다.");
    });

    test("모든 자동차 이름이 5자 이하일 경우 에러 없음", () => {
      const valid = new Valid(["pobi", "woni"], "5");
      expect(() => valid.validateCarNameLength()).not.toThrow();
    });
  });

  describe("validateTryCountIsNotEmpty: 시도 횟수 입력 유효성 검사", () => {
    test("시도 횟수가 빈 문자열일 경우 에러", () => {
      const valid = new Valid(["pobi", "woni"], "");
      expect(() => valid.validateTryCountIsNotEmpty()).toThrow("[ERROR] 시도할 횟수를 입력하지 않았습니다.");
    });

    test("시도 횟수가 비어있지 않으면 에러 없음", () => {
      const valid = new Valid(["pobi", "woni"], "5");
      expect(() => valid.validateTryCountIsNotEmpty()).not.toThrow();
    });
  });

  describe("isValid: 전체 유효성 검사", () => {
    test("모든 유효성 검사 통과", () => {
      const valid = new Valid(["pobi", "woni"], "5");
      expect(() => valid.isValid()).not.toThrow();
    });

    test("하나라도 유효성 검사를 통과하지 못하면 에러", () => {
      const invalidName = new Valid(["pobi", "javaji"], "5");
      const invalidTryCount = new Valid(["pobi", "woni"], "");

      expect(() => invalidName.isValid()).toThrow();
      expect(() => invalidTryCount.isValid()).toThrow();
    });
  });
});
