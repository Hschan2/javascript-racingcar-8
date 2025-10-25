import { MissionUtils } from '@woowacourse/mission-utils';

class Game {
    constructor(carName, tryCount) {
        this.tryCount = tryCount;
        this.participants = {};

        carName.forEach(name => {
            this.participants[name] = '';
        });
    }

    play() {
        MissionUtils.Console.print('\n실행 결과');
        for (let i = 0; i < this.tryCount; i++) {
            this._moveCars();
            this._printRoundStatus();
        }
        this.printWinners();
    }

    _moveCars() {
        const names = Object.keys(this.participants);
        names.forEach(name => {
            const randomNum = MissionUtils.Random.pickNumberInRange(0, 9);
            if (randomNum >= 4) {
                this.participants[name] += '-';
            }
        });
    }

    _printRoundStatus() {
        const names = Object.keys(this.participants);
        names.forEach(name => {
            MissionUtils.Console.print(`${name} : ${this.participants[name]}`);
        });
        MissionUtils.Console.print('');
    }

    printWinners() {
        const winners = this._getWinners();
        MissionUtils.Console.print(`최종 우승자 : ${winners.join(', ')}`);
    }

    _getWinners() {
        const allLengths = Object.values(this.participants).map(track => track.length);
        const maxLength = Math.max(...allLengths);

        if (maxLength === 0) {
            return [];
        }

        return Object.keys(this.participants).filter(name => {
            return this.participants[name].length === maxLength;
        });
    }
}

export default Game;