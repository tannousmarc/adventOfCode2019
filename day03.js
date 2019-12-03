const fs = require('fs');
fs.readFile('201903.txt', 'utf8', (err, data) => {
    if(err) throw err;
    const wirePaths = data.split('\r\n').map(el => el.split(','));
    
    const dx = { 'L':-1, 'R': 1, 'U': 0, 'D': 0 };
    const dy = { 'L': 0, 'R': 0, 'U': 1, 'D':-1 };

    const center = 0;
    let paths = [[], []];

    for(let i = 0; i < 2; i++){
        let posX = center, posY = center;
        let steps = 0;
        for(instruction of wirePaths[i]){
            const value = Number(instruction.slice(1));
            
            for(let step = 0; step < value; step++){
                posX += dx[instruction[0]];
                posY += dy[instruction[0]];
                steps++;
                paths[i].push([posX, posY, steps]);
            }
        }
    }

    let smallestDist = Number.MAX_SAFE_INTEGER;

    for(let i = 0; i < paths[0].length; i++)
        for(let j = 0; j < paths[1].length; j++)
            if(paths[0][i][0] === paths[1][j][0] && paths[0][i][1] === paths[1][j][1]
                && (paths[0][i][0] !== 0 && paths[0][i][1] !== 0))
                smallestDist = Math.min(smallestDist, paths[0][i][2] + paths[1][j][2]);

    console.log(smallestDist);
});
