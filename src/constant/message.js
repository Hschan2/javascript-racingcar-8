export const PRIX_ERROR = '[ERROR]';
export const ERROR_MESSAGE = Object.freeze({
    VALID_CAR_NAME_NOT_EMPTY: `${PRIX_ERROR} 자동차 이름을 입력하지 않았습니다.`,
    VALID_CAR_NAME_LENGTH: `${PRIX_ERROR} 자동차 이름이 5글자를 초과합니다.`,
    VALID_TRY_COUNT_NOT_EMPTY: `${PRIX_ERROR} 시도할 횟수를 입력하지 않았습니다.`,
    VALID_TRY_COUNT_NOT_POSITIVE_NUMBER: `${PRIX_ERROR} 시도할 횟수가 0이거나 음수입니다.`,
    VALID_TRY_COUNT_NOT_NUMBER: `${PRIX_ERROR} 시도할 횟수가 숫자 형식이 아닙니다.`,
});
export const INPUT_MESSAGE = Object.freeze({
    INPUT_CAR_NAME: '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)',
    INPUT_TRY_COUNT: '시도할 횟수는 몇 회인가요?',
});
export const GAME_MESSAGE = Object.freeze({
    RESULT_MESSAGE: '\n실행 결과',
    NOT_WINNER_MESSAGE: '우승자 없음',
});
export const WINNER_MESSAGE = (winners) => `최종 우승자 : ${winners.join(', ')}`;