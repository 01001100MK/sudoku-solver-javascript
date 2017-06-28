/*
    * Author - 01001100MK
    * 9 x 9 sudoku solving algorithm
    * Human-like
    * I mean it solves like me. I am sudoku beginner.
*/

var helper = require('./helper');

var isSolved = function (puzzle) {
    for (var i = 0; i < puzzle.length; i++) {
        if (puzzle[i].length > 1 || puzzle[i][0] === 0)
            return false;
    }
    return true;
};

var checkEndlessLoop = function (puzzle1, puzzle2) {
    // printSudoku(puzzle1);
    // printSudoku(puzzle2);
    for (var i = 0; i < puzzle1.length; i++) {
        if (puzzle1[i].length !== puzzle2[i].length) {
            return false;
        }
        for (var j = 0; j < puzzle1[i].length; j++) {
            if (puzzle1[i][j] !== puzzle2[i][j]) {
                return false;
            }
        }
    }
    return true;
};

var checkAvailableNumbers = function (position, puzzle) {
    var availables = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var notAvaiables = [];

    /* check horizontally */
    var lowerBound = Math.trunc(position / 9);
    lowerBound *= 9;
    var upperBound = lowerBound + 8;

    for (var i = lowerBound; i <= upperBound; ++i) {
        var current = puzzle[i];
        if (current.length > 1 ||
            current[0] === 0 ||
            i === position) continue;

        if (notAvaiables.indexOf(current[0]) === -1) {
            notAvaiables.push(current[0]);
        }
    }

    /* check vertically */
    lowerBound = position % 9;
    upperBound = lowerBound + 72;
    for (var i = lowerBound; i <= upperBound; i += 9) {
        current = puzzle[i];
        if (current.length > 1 ||
            current[0] === 0 ||
            i === position) continue;

        if (notAvaiables.indexOf(current[0]) === -1) {
            notAvaiables.push(current[0]);
        }
    }

    /* check local box */
    var boxes = [
        [0, 1, 2, 9, 10, 11, 18, 19, 20],
        [3, 4, 5, 12, 13, 14, 21, 22, 23],
        [6, 7, 8, 15, 16, 17, 24, 25, 26],
        [27, 28, 29, 36, 37, 38, 45, 46, 47],
        [30, 31, 32, 39, 40, 41, 48, 49, 50],
        [33, 34, 35, 42, 43, 44, 51, 52, 53],
        [54, 55, 56, 63, 64, 65, 72, 73, 74],
        [57, 58, 59, 66, 67, 68, 75, 76, 77],
        [60, 61, 62, 69, 70, 71, 78, 79, 80]
    ];
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].indexOf(position) > -1) {
            var localBox = boxes[i];
        }
    }

    for (var i = 0; i < localBox.length; i++) {
        current = puzzle[localBox[i]];
        if (current.length > 1 ||
            current[0] === 0 ||
            i === position) continue;

        if (notAvaiables.indexOf(current[0]) === -1) {
            notAvaiables.push(current[0]);
        }
    }

    availables = availables.filter(function (e) {
        return notAvaiables.indexOf(e) === -1;
    });

    return availables;
}

var printSudoku = function (puzzle) {
    var board = '';
    for (var i = 0; i < puzzle.length; i++) {
        board += " | " + puzzle[i];
        if (i % 9 === 8) board += "\n";
    }
    console.log(board);
}
var executeAlgorithm = function () {
    var easy_puzzle = [
        [0], [0], [7], [9], [6], [2], [4], [0], [0],
        [9], [0], [0], [0], [1], [0], [0], [0], [2],
        [0], [1], [0], [8], [5], [3], [0], [6], [0],
        [5], [0], [0], [4], [7], [9], [0], [0], [1],
        [0], [0], [0], [0], [8], [0], [0], [0], [0],
        [4], [0], [0], [3], [2], [1], [0], [0], [7],
        [0], [9], [0], [2], [4], [8], [0], [5], [0],
        [6], [0], [0], [0], [3], [0], [0], [0], [8],
        [0], [0], [8], [6], [9], [5], [1], [0], [0]
    ];

    var puzzle = [
        [9], [0], [4], [2], [0], [5], [0], [0], [7],
        [0], [0], [0], [0], [0], [3], [0], [2], [0],
        [3], [0], [6], [0], [0], [0], [1], [0], [0],
        [0], [0], [5], [1], [0], [8], [0], [0], [6],
        [8], [0], [0], [0], [4], [0], [0], [0], [3],
        [1], [0], [0], [7], [0], [6], [9], [0], [0],
        [0], [0], [0], [0], [0], [0], [4], [0], [1],
        [0], [7], [0], [4], [0], [0], [0], [0], [0],
        [4], [0], [0], [3], [0], [1], [6], [0], [9]
    ];

    var boxes = [
        [0, 1, 2, 9, 10, 11, 18, 19, 20],
        [3, 4, 5, 12, 13, 14, 21, 22, 23],
        [6, 7, 8, 15, 16, 17, 24, 25, 26],
        [27, 28, 29, 36, 37, 38, 45, 46, 47],
        [30, 31, 32, 39, 40, 41, 48, 49, 50],
        [33, 34, 35, 42, 43, 44, 51, 52, 53],
        [54, 55, 56, 63, 64, 65, 72, 73, 74],
        [57, 58, 59, 66, 67, 68, 75, 76, 77],
        [60, 61, 62, 69, 70, 71, 78, 79, 80]
    ];

    while (!isSolved(puzzle)) {
        var current = [];
        var puzzle1 = puzzle.slice();
        for (var i = 0; i < puzzle.length; i++) {
            current = puzzle[i];
            // if (current[0] !== 0 && current.length === 1)
            //     continue;
            // puzzle[i] = checkAvailableNumbers(i, puzzle);
            if (current[0] === 0 || current.length > 1) {
                puzzle[i] = checkAvailableNumbers(i, puzzle);
            }
        }
        // printSudoku(puzzle);
        /* check all boxes */
        for (var i = 0; i < boxes.length; i++) {
            helper.exactMoveInBox(boxes[i], puzzle);
        }

        /* catch repetition here */
        var puzzle2 = puzzle.slice();
        if (checkEndlessLoop(puzzle1, puzzle2)) {
            console.log('no improvement, repeatation starts here');
            break;
        }
        // console.log('after boxes');

        helper.sanitize(puzzle);
        printSudoku(puzzle);
    }
}

executeAlgorithm();