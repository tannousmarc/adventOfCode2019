const fs = require('fs');

fs.readFile('201906.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split('\r\n');
    
    const neighbours = new Map();
    for(edge of data){
        const [source, dest] = edge.split(')');
        if(neighbours.has(source))
            neighbours.set(source, neighbours.get(source).concat(dest));
        else
            neighbours.set(source, [dest]);

        if(neighbours.has(dest))
            neighbours.set(dest, neighbours.get(dest).concat(source));
        else
            neighbours.set(dest, [source]);
    }

    const visited = new Set();
    let res = 0;
    const dfs = (source, neighbours, depth) => {
        visited.add(source);
        if(neighbours.get(source).length > 0){
            let oldDepth = depth;
            for(dest of neighbours.get(source)){
                if(dest === 'SAN')
                    console.log(oldDepth - 1);
                if(!visited.has(dest)){
                    res += oldDepth + 1;
                    dfs(dest, neighbours, oldDepth + 1);
                }
            }
        }
     }

    dfs('YOU', neighbours, 0);

    // console.log(res);
});
