const assert = require('assert')
const { queensAttack, getPossibleCells } = require('./queens-attack-2')

function randomInteger(min, max) {
    let rand = min + (Math.random() * ((max + 1) - min))
    return Math.floor(rand)
}

function generateObtacles(count, n, queen) {
    return Array.from(new Array(count)).map(i => {
        return [randomInteger(1, n), randomInteger(1, n)]
    })
}

describe('queensAttack', () => {
    describe('queensAttack', () => {
        it('should return correct cells if queen is on edge or corner', () => {
            assert.equal(queensAttack(
                5,
                3,
                1,
                1,
                [
                    [5, 5],
                    [4, 2],
                    [2, 3],
                ]
            ), 11);

            assert.equal(queensAttack(
                5,
                3,
                5,
                4,
                [
                    [5, 5],
                    [4, 2],
                    [2, 3],
                ]
            ), 11);

            assert.equal(queensAttack(
                5,
                3,
                2,
                5,
                [
                    [5, 5],
                    [4, 2],
                    [2, 3],
                ]
            ), 8);
        });
        it('should return correct cells length with simple input', () => {
            const actual = queensAttack(
                5,
                3,
                4,
                3,
                [
                    [5, 5],
                    [4, 2],
                    [2, 3],
                ]
            )
            assert.equal(actual, 10);
        });
        it('should return correct cells on small desks', () => {
            assert.equal(queensAttack(
                1,
                0,
                1,
                1,
            ), 0);
        });
        it('should correctly handle obstacles from all sides', () => {
            assert.equal(queensAttack(
                8,
                8,
                4,
                5,
                [
                    [5, 4],
                    [5, 5],
                    [5, 6],
                    [4, 6],
                    [4, 4],
                    [3, 4],
                    [3, 5],
                    [3, 6],
                ]
            ), 0);
        });
        it('should work reasonable time with big numbers', () => {
            const obtacles = generateObtacles(100000)

            assert.doesNotThrow(() => {
                console.time('bigN')
                const actual = queensAttack(
                    100000,
                    obtacles.length,
                    35001,
                    81075,
                    obtacles
                )
                console.timeEnd('bigN')
                console.log('actual', actual)
            })
        });
    });
    describe('getPossibleCells', () => {
        it('should return correct cells for direction', () => {
            assert.deepEqual(getPossibleCells(
                [4, 3],
                { rowLimit: 8, rowStep: 1, colLimit: 0, colStep: 0 }
            ), [
                [5, 3],
                [6, 3],
                [7, 3],
                [8, 3],
            ]);

            assert.deepEqual(getPossibleCells(
                [7, 4],
                { rowLimit: 1, rowStep: -1, colLimit: 10, colStep: 1 }
            ), [
                [6, 5],
                [5, 6],
                [4, 7],
                [3, 8],
                [2, 9],
                [1, 10],
            ]);

            assert.deepEqual(getPossibleCells(
                [4, 4],
                { rowLimit: 0, rowStep: 0, colLimit: 1, colStep: -1 }
            ), [
                [4, 3],
                [4, 2],
                [4, 1],
            ]);
        });
    });
});
