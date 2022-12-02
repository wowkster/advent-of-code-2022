import { readFileSync } from 'fs'

enum Move {
    ROCK,
    PAPER,
    SCISSORS,
}

enum Outcome {
    WIN,
    DRAW,
    LOSS,
}

function getMoveFromString(move: string): Move {
    switch (move) {
        case 'A':
            return Move.ROCK
        case 'B':
            return Move.PAPER
        case 'C':
            return Move.SCISSORS
    }
}

function getOutcomeFromString(outcome: string): Outcome {
    switch (outcome) {
        case 'X':
            return Outcome.LOSS
        case 'Y':
            return Outcome.DRAW
        case 'Z':
            return Outcome.WIN
    }
}

function getScoreOfMove(move: Move): number {
    switch (move) {
        case Move.ROCK:
            return 1
        case Move.PAPER:
            return 2
        case Move.SCISSORS:
            return 3
    }
}

/**
 * Returns the score of the round
 *
 * (0 if I lost, 3 if the round was a draw, and 6 if I won)
 *
 * @param opponentMove The move the opponent played
 * @param myMove The move I played
 */
function getScoreOfOutcome(outcome: Outcome): number {
    switch (outcome) {
        case Outcome.WIN:
            return 6
        case Outcome.DRAW:
            return 3
        case Outcome.LOSS:
            return 0
    }
}

/**
 * Selects the correct move for me to play in order to achieve the desired outcome
 * @param opponentMoveEnum The move the opponent played
 * @param requiredOutcomeEnum The outcome I need to achieve
 */
function selectMove(opponentMoveEnum: Move, requiredOutcomeEnum: Outcome) {
    switch (opponentMoveEnum) {
        case Move.ROCK:
            switch (requiredOutcomeEnum) {
                case Outcome.WIN:
                    return Move.PAPER
                case Outcome.DRAW:
                    return Move.ROCK
                case Outcome.LOSS:
                    return Move.SCISSORS
            }
        case Move.PAPER:
            switch (requiredOutcomeEnum) {
                case Outcome.WIN:
                    return Move.SCISSORS
                case Outcome.DRAW:
                    return Move.PAPER
                case Outcome.LOSS:
                    return Move.ROCK
            }
        case Move.SCISSORS:
            switch (requiredOutcomeEnum) {
                case Outcome.WIN:
                    return Move.ROCK
                case Outcome.DRAW:
                    return Move.SCISSORS
                case Outcome.LOSS:
                    return Move.PAPER
            }
    }
}

module.exports = async () => {
    // Read the input file
    const input = readFileSync('./src/day-2/input.txt')

    const rounds = input.toString().split('\n')

    let totalScore = 0

    for (const round of rounds) {
        const [opponentMove, requiredOutcome] = round.split(' ')

        const opponentMoveEnum = getMoveFromString(opponentMove)
        const requiredOutcomeEnum = getOutcomeFromString(requiredOutcome)

        const myMove = selectMove(opponentMoveEnum, requiredOutcomeEnum)

        const score = getScoreOfMove(myMove) + getScoreOfOutcome(requiredOutcomeEnum)

        totalScore += score
    }

    return totalScore
}
