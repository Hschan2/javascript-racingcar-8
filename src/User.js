import { MissionUtils } from '@woowacourse/mission-utils'
import { INPUT_MESSAGE } from './constant/message';

class User {
    constructor() {
        this.carName = null;
        this.tryCount = null;
    }

    async inputCarName() {
        this.carName = await MissionUtils.Console.readLineAsync(INPUT_MESSAGE.INPUT_CAR_NAME);
    }

    async inputTryCount() {
        this.tryCount = await MissionUtils.Console.readLineAsync(INPUT_MESSAGE.INPUT_TRY_COUNT);
    }

    getRefinedName() {
        return this.carName.split(',');
    }

    getTryCountValue() {
        return this.tryCount;
    }
}

export default User;
