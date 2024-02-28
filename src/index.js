import "./style.css";


function validMoves(size, start) {
    const directions = [
        [1, 2], [1, -2], [-1, 2], [-1, -2],
        [2, 1], [2, -1], [-2, 1], [-2, -1]
    ];

    return directions
        .map(([dx, dy]) => [start[0] + dx, start[1] + dy])
        .filter(([x, y]) => x >= 0 && x < size && y >= 0 && y < size);
}

function knightMoves(start, end, size) {
    if (start[0] < 0 || start[0] >= size || Number.isNaN(Number(start[0])) ||  start[1] < 0 || start[1] >= size || Number.isNaN(Number(start[1]))) {
        console.error("Invalid starting position");
        return;
    }

    if (end[0] < 0 || end[0] >= size || end[1] < 0 || Number.isNaN(Number(end[0])) || end[1] >= size || Number.isNaN(Number(end[1]))) {
        console.error("Invalid end position");
        return;
    }


    if (start[0] === end[0] && start[1] === end[1]) {
        console.log("You're already there!");
        return;
    }

    const queue = [{ position: start, path: [start] }];
    const visited = new Set([start.toString()]);

    while (queue.length) {
        const { position, path } = queue.shift();
        if (position[0] === end[0] && position[1] === end[1]) {
            console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
            path.forEach(square => {
                console.log(`[${square[0]}, ${square[1]}]`);
            });
            return;
        }

        const moves = validMoves(size, position);

        moves.forEach(move => {
            if (!visited.has(move.toString())) {
                visited.add(move.toString());
                queue.push({ position: move, path: [...path, move] });
            }
        });
    }

    console.log("Path not found");

}

knightMoves([3, 3], [0, 3], 8);
