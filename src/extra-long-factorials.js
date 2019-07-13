// https://www.hackerrank.com/challenges/extra-long-factorials/problem

function extraLongFactorials(n) {
    console.log(factorial(n))
}

function factorial(n) {
    if (n <= 1) {
        return n
    }

    let result = '1'
    for(let i = 1; i <= n; i++) {
        result = multiplyNumerics(result, i)
    }

    return result
}

function multiplyNumerics(numericA, numberB) { // numericA is string and numberB is int
    if (numericA === '0' || numberB === 0) {
        return '0'
    }

    let result = numericA

    for(let j = 1; j < numberB; j++) {
        result = sumNumerics(result, numericA)
    }

    return result
}

function sumNumerics(a, b) { // a and b are strings
    let longestNum = a
    let shortestNum = b

    if (b.length > a.length) {
        longestNum = b
        shortestNum = a
    }

    const longestArr = longestNum.split('').map(Number).reverse()
    const shortestArr = shortestNum.split('').map(Number).reverse()
    const resultArr = []

    let fromLast = 0

    longestArr.forEach((num, index) => {
        const correspondingBIndex = shortestArr[index] || 0

        const sumRes = String(num + correspondingBIndex + fromLast)
        fromLast = 0

        if (sumRes.length === 1) {
            resultArr.push(sumRes)
        } else {
            resultArr.push(sumRes.split('').reverse()[0])
            fromLast = 1
        }
    })

    if (fromLast === 1) {
        resultArr.push('1')
    }

    return resultArr.reverse().join('')
}

exports.multiplyNumerics = multiplyNumerics
exports.sumNumerics = sumNumerics
exports.factorial = factorial
