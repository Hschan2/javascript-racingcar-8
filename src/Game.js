import { MissionUtils } from '@woowacourse/mission-utils'

class Game {
    constructor(carName, tryCount) {
        this.tryCount = tryCount;
        this.participants = {};

        carName.forEach(name => {
            this.participants[name] = '';
        })
    }

    async game() {
        MissionUtils.Console.print("실행 결과");
        for (let i = 0; i < this.tryCount; i++) {
            await this.racing();
        }
    }

    async racing() {
        const names = Object.keys(this.participants);
        names.forEach(name => {
            const randomNum = MissionUtils.Random.pickNumberInRange(0, 9);
            if (randomNum >= 4) {
                this.participants[name] += '-';
            }
            MissionUtils.Console.print(`${name} : ${this.participants[name]}`);
        })
    }

    async result() {
        const allLengths = Object.values(this.participants).map(track => track.length);
        if (allLengths.length === 0) {
        }
        const maxLength = Math.max(...allLengths);

        const winners = Object.keys(this.participants).filter(name => {
            return this.participants[name].length === maxLength;
        });

        MissionUtils.Console.print(`최종 우승자 : ${winners.join(', ')}`);
    }
}

export default Game;
