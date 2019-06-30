// https://www.hackerrank.com/challenges/queens-attack-2/problem

function getDirections(min, max) {
    return [
        { rowLimit: max, rowStep: 1, colLimit: 0, colStep: 0 }, // up
        { rowLimit: max, rowStep: 1, colLimit: max, colStep: 1 }, // upRight
        { rowLimit: 0, rowStep: 0, colLimit: max, colStep: 1 }, // right
        { rowLimit: min, rowStep: -1, colLimit: max, colStep: 1 }, // downRight
        { rowLimit: min, rowStep: -1, colLimit: 0, colStep: 0 }, // down
        { rowLimit: min, rowStep: -1, colLimit: min, colStep: -1 }, // downLeft
        { rowLimit: 0, rowStep: 0, colLimit: min, colStep: -1 }, // left
        { rowLimit: max, rowStep: 1, colLimit: min, colStep: -1 }, // upLeft
    ]
}

function getPossibleCells(queenCell, direction) {
    if (direction.rowStep !== 0) {

        const rowNumbers = getSimpleOrderedArray(
            queenCell[0] + direction.rowStep,
            Math.abs(queenCell[0] - direction.rowLimit),
            direction.rowStep
        )

        const generateWith = (mapFun, filterFun) => {
            return rowNumbers
                .map(mapFun)
                .filter(filterFun)
        }

        switch (true) {
            default:
                return
            case direction.colStep > 0:
                return generateWith(
                    (num, index) => [num, queenCell[1] + direction.colStep + index],
                    (cell) => cell[1] <= direction.colLimit,
                )
            case direction.colStep < 0:
                return generateWith(
                    (num, index) => [num, queenCell[1] + direction.colStep - index],
                    (cell) => cell[1] >= direction.colLimit,
                )
            case direction.colStep === 0:
                return generateWith(
                    (num, index) => [num, queenCell[1]],
                    (cell) => true,
                )
        }
    }

    // in other cases (left or right directions) calculation is simple
    return getSimpleOrderedArray(
        queenCell[1] + direction.colStep,
        Math.abs(queenCell[1] - direction.colLimit),
        direction.colStep
    )
        .map(colPosition => [queenCell[0], colPosition])
}

function getDirectionObstacles(allObstacles = [], directionCells) {
    return allObstacles.filter(obstacle => {
        return directionCells.some(cell => cell[0] === obstacle[0] && cell[1] === obstacle[1])
    })
}

function cellCanBeAttackedDirectly(cell, queen) {
    return cell[0] === queen[0] || cell[1] === queen[1]
}

function cellCanBeAttackedDiagonally(cell, queen) {
    return Math.abs(cell[0] - queen[0]) === Math.abs(cell[1] - queen[1])
}

function filterDirectionCells(directionCells, directionObstacles, direction) {
    const filterWith = filterAssertion => {
        return directionCells.filter(cell => {
            return !directionObstacles.some(obstacle => {
                return filterAssertion(cell, obstacle)
            })
        })
    }

    switch (true) {
        default:
            return directionCells
        case direction.rowStep === 0 && direction.colStep > 0: // right
            return filterWith((cell, obstacle) => cell[1] >= obstacle[1])
        case direction.rowStep === 0 && direction.colStep < 0: // left
            return filterWith((cell, obstacle) => cell[1] <= obstacle[1])
        case direction.rowStep > 0 && direction.colStep === 0: // up
        case direction.rowStep > 0 && direction.colStep < 0: // upLeft
        case direction.rowStep > 0 && direction.colStep > 0: // upRight
            return filterWith((cell, obstacle) => cell[0] >= obstacle[0])
        case direction.rowStep < 0 && direction.colStep === 0: // down
        case direction.rowStep < 0 && direction.colStep > 0: // downRight
        case direction.rowStep < 0 && direction.colStep < 0: // downLeft
            return filterWith((cell, obstacle) => cell[0] <= obstacle[0])

    }
}

function getSimpleOrderedArray(first, count, step) {
    return Array.from(new Array(count)).map((item, i) => first + step * i)
}

// Complete the queensAttack function below.
function queensAttack(n, k, r_q, c_q, obstacles) {
    const queen = [r_q, c_q]

    const directions = getDirections(1, n)
    
    const cells = []

    const filteredObstacles = (obstacles || []).filter(obstacle => {
        return cellCanBeAttackedDirectly(obstacle, queen)
            || cellCanBeAttackedDiagonally(obstacle, queen)
    })
    
    directions.forEach(direction => {
        const possibleCells = getPossibleCells(queen, direction)
        const directionObstacles = getDirectionObstacles(filteredObstacles, possibleCells)
        const directionCells = filterDirectionCells(possibleCells, directionObstacles, direction)

        cells.push(...directionCells)
    })
    
    return cells.length

}

exports.queensAttack = queensAttack
exports.getPossibleCells = getPossibleCells
