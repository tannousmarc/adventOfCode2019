const fs = require('fs');
fs.readFile('201902.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split(',').map(el => Number(el));

    const oldData = data;
    for(let noun = 0; noun <= 99; noun++){
        for(let verb = 0; verb <= 99; verb++){
            data = [...oldData];
            data[1] = noun;
            data[2] = verb;
            for(let i = 0; i < data.length; i += 4){
                if(data[i] === 99) break;
                else if(data[i] === 1){
                    data[data[i + 3]] = data[data[i + 1]] + data[data[i + 2]];
                }
                else if(data[i] === 2){
                    data[data[i + 3]] = data[data[i + 1]] * data[data[i + 2]];
                }
            }
            if(data[0] === 19690720){
                console.log(100 * data[1] + data[2]);
                return;
            }
        }
    }
});
