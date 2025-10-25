import Game from "./Game";
import User from "./User";
import Valid from "./Valid";

class App {
  async run() {
    const user = new User();
    await user.inputCarName();
    await user.inputTryCount();

    const carNames = user.refinedName;
    const tryCount = user.tryCountValue;

    const valid = new Valid(carNames, tryCount);
    valid.isValid();

    const game = new Game(carNames, tryCount);
    game.play();
  }
}

export default App;
