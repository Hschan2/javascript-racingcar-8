import Game from "./Game";
import User from "./User";
import Valid from "./Valid";

class App {
  async run() {
    await this.user();
  }

  async user() {
    const user = new User();

    await user.inputCarName();
    await user.inputTryCount();

    const carNames = user.refinedName;
    const tryCount = user.tryCountValue;

    await this.valid(carNames, tryCount);
  }

  async valid(carNames, tryCount) {
    const valid = new Valid(carNames, tryCount);

    await valid.isValid();

    await this.game(carNames, tryCount);
  }

  async game(carNames, tryCount) {
    const game = new Game(carNames, tryCount);

    await game.game();
    await game.result();
  }
}

export default App;
