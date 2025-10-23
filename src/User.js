import { MissionUtils } from '@woowacourse/mission-utils'

class User {
    constructor() {
        this.carName = null;
        this.tryCount = null;
    }

    async inputCarName() {
        this.carName = await MissionUtils.Console.readLineAsync("경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)");
    }

    async inputTryCount() {
        this.tryCount = await MissionUtils.Console.readLineAsync("시도할 횟수는 몇 회인가요?");
    }

    get refinedName() {
        return this.carName.split(',');
    }

    get tryCountValue() {
        return this.tryCount;
    }
}

export default User;
