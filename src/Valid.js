class Valid {
    constructor(carName, tryCount) {
        this.carName = carName;
        this.tryCount = tryCount;
    }

    async isValid() {
        await this.isNotThingCarName();
        await this.isOverNameLength();
        await this.isNotThingTryCount();
    }

    async isNotThingCarName() {
        if (this.carName.length === 0) {
            throw new Error("[ERROR] 자동차 이름을 입력하지 않았습니다.");
        }
    }

    async isOverNameLength() {
        for (const name of this.carName) {
            if (name.length > 5) {
                throw new Error("[ERROR] 자동차 이름이 5글자를 초과합니다.");
            }
        }
    }

    async isNotThingTryCount() {
        if (this.tryCount.length === 0) {
            throw new Error("[ERROR] 시도할 횟수를 입력하지 않았습니다.");
        }
    }
}

export default Valid;
