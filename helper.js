var exactMoveInBox = function (box, puzzle) {
    var counts = [
        0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ];
    for (var i = 0; i < box.length; i++) {
        // if (puzzle[box[i]].length === 1) continue;

        for (var j = 0; j < puzzle[box[i]].length; j++) {
            counts[puzzle[box[i]][j]]++;
        }
    }
    // console.log(counts);
    for (var i = 0; i < counts.length; i++) {
        if (counts[i] === 1) {
            /* found that */
            for (var j = 0; j < box.length; j++) {
                if (puzzle[box[j]].indexOf(i) > -1) {
                    puzzle[box[j]] = [];
                    puzzle[box[j]].push(i);
                }
            }
        }
    }
}

var sanitize = function (puzzle) {
    for (var i = 0; i < puzzle.length; i++) {
        if (puzzle[i].length > 1) {
            puzzle[i] = [0];
        }
    }
};

var box = [
    [2, 3, 6, 8], [2, 3, 8], [1],
    [2, 3, 9], [2, 3, 4, 9], [3, 4],
    [5, 6, 8, 9], [8, 9], [7]
];

// exactMoveInBox(box);
exports.exactMoveInBox = exactMoveInBox;
exports.sanitize = sanitize;