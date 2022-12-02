import { readFileSync } from "fs"

module.exports = async () => {
    // Read the input file
    const input = readFileSync('./src/day-1/input.txt')

    // Split the input into an array of numbers
    const elves = input.toString().split('\n\n')

    // Convert the array of strings into an array of numbers
    const totals = elves.map(elf => elf.split('\n').map(Number).reduce((a, b) => a + b, 0))

    // Get the largest 3 values
    const largest = totals.sort((a, b) => b - a).slice(0, 3)

    // Total the largest 3 values
    const total = largest.reduce((a, b) => a + b, 0)

    return total
}
