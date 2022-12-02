const chalk = require('chalk')

// Get CLI arguments
const args = process.argv.slice(2)

let dayNumber

try {
    dayNumber = parseInt(args[0])
} catch (e) {
    console.error('Invalid day number')
    process.exit(1)
}

if (dayNumber < 1 || dayNumber > 25) {
    console.error('Day number must be between 1 and 25')
    process.exit(1)
}

// Import the day's solution
let part1
try {
    part1 = require(`./day-${dayNumber}/part-1`)
} catch {}

let part2
try {
    part2 = require(`./day-${dayNumber}/part-2`)
} catch {}

if (!part1 && !part2) {
    console.log(chalk.red(`No solution implementations found for day ${dayNumber}!`))
    process.exit(1)
} else if (!part2) {
    console.log(chalk.red('No solution implementations found for part 2!'))
} else if (!part1) {
    console.log(chalk.red('No solution implementations found for part 1!'))
}

// Run the solutions
;(async () => {
    if (part1) {
        console.log(chalk.blue('==== Part 1 ===='))
        console.log(chalk.magenta('Result:'), await part1())
    }
    if (part2) {
        console.log(chalk.blue('==== Part 2 ===='))
        console.log(chalk.magenta('Result:'), await part2())
    }
})()
