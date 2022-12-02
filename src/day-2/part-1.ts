import { readFileSync } from 'fs'

enum Move {
    ROCK,
    PAPER,
    SCISSORS,
}

function getMoveFromString(move: string): Move {
    switch (move) {
        case 'A':
        case 'X':
            return Move.ROCK
        case 'B':
        case 'Y':
            return Move.PAPER
        case 'C':
        case 'Z':
            return Move.SCISSORS
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
function getScoreOfOutcome(opponentMove: Move, myMove: Move): number {
    switch (opponentMove) {
        case Move.ROCK:
            switch (myMove) {
                case Move.ROCK:
                    return 3
                case Move.PAPER:
                    return 6
                case Move.SCISSORS:
                    return 0
            }
        case Move.PAPER:
            switch (myMove) {
                case Move.ROCK:
                    return 0
                case Move.PAPER:
                    return 3
                case Move.SCISSORS:
                    return 6
            }
        case Move.SCISSORS:
            switch (myMove) {
                case Move.ROCK:
                    return 6
                case Move.PAPER:
                    return 0
                case Move.SCISSORS:
                    return 3
            }
    }
}

module.exports = async () => {
    // Read the input file
    const input = readFileSync('./src/day-2/input.txt')

    const rounds = input.toString().split('\n')

    let totalScore = 0

    for (const round of rounds) {
        const [opponentMove, myMove] = round.split(' ')

        const opponentMoveEnum = getMoveFromString(opponentMove)
        const myMoveEnum = getMoveFromString(myMove)

        const score = getScoreOfMove(myMoveEnum) + getScoreOfOutcome(opponentMoveEnum, myMoveEnum)

        totalScore += score
    }

    return totalScore
}
