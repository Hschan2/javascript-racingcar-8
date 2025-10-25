class Valid {
    constructor(carName, tryCount) {
        this.carName = carName;
        this.tryCount = tryCount;
    }

    isValid() {
        this.validateCarNameIsNotEmpty();
        this.validateCarNameLength();
        this.validateTryCountIsNotEmpty();
    }

    validateCarNameIsNotEmpty() {
        if (this.carName.length === 0) {
            throw new Error("[ERROR] 자동차 이름을 입력하지 않았습니다.");
        }
    }

    validateCarNameLength() {
        for (const name of this.carName) {
            if (name.length > 5) {
                throw new Error("[ERROR] 자동차 이름이 5글자를 초과합니다.");
            }
        }
    }

    validateTryCountIsNotEmpty() {
        if (this.tryCount.length === 0) {
            throw new Error("[ERROR] 시도할 횟수를 입력하지 않았습니다.");
        }
    }
}

export default Valid;
