import { ERROR_MESSAGE } from "./constant/message";

class Valid {
    constructor(carName, tryCount) {
        this.carName = carName;
        this.tryCount = tryCount;
    }

    isValid() {
        this.validateCarNameIsNotEmpty();
        this.validateCarNameLength();
        this.validateTryCountIsNotEmpty();
        this.validateTryCountIsNotPositiveNumber();
        this.validateTryCountIsNotNumber();
    }

    validateCarNameIsNotEmpty() {
        if (this.carName.length === 0 || this.carName.some(name => name.trim().length === 0)) {
            throw new Error(ERROR_MESSAGE.VALID_CAR_NAME_NOT_EMPTY);
        }
    }

    validateCarNameLength() {
        for (const name of this.carName) {
            if (name.length > 5) {
                throw new Error(ERROR_MESSAGE.VALID_CAR_NAME_LENGTH);
            }
        }
    }

    validateTryCountIsNotEmpty() {
        if (this.tryCount.length === 0) {
            throw new Error(ERROR_MESSAGE.VALID_TRY_COUNT_NOT_EMPTY);
        }
    }

    validateTryCountIsNotPositiveNumber() {
        if (Number(this.tryCount) === 0 || Number(this.tryCount) < 0) {
            throw new Error(ERROR_MESSAGE.VALID_TRY_COUNT_NOT_POSITIVE_NUMBER);
        }
    }

    validateTryCountIsNotNumber() {
        if (!Number.isInteger(Number(this.tryCount))) {
            throw new Error(ERROR_MESSAGE.VALID_TRY_COUNT_NOT_NUMBER);
        }
    }
}

export default Valid;
