const fs = require('fs');
const readlineSync = require('readline-sync');

fs.readFile('201905.txt', 'utf8', (err, data) => {
    if(err) throw err;
    data = data.split(',').map(el => Number(el));

    const getValue = (data, position, mode) => {
        if(mode === 0) return Number(data[position]);
        else if(mode === 1) return Number(position);
    }

    let pointer = 0;
    while(pointer < data.length){
        const opcode = data[pointer] % 100;
        const modes = [Math.floor(data[pointer] / 100) % 10,
                       Math.floor(data[pointer] / 1000) % 10,
                       Math.floor(data[pointer] / 10000) % 10];
        
        if(opcode === 99) break;
        else if(opcode === 1){
            data[data[pointer + 3]] = getValue(data, data[pointer + 1], modes[0]) + getValue(data, data[pointer + 2], modes[1]); 
            pointer += 4;
        }
        else if(opcode === 2){
            data[data[pointer + 3]] = getValue(data, data[pointer + 1], modes[0]) * getValue(data, data[pointer + 2], modes[1]);
            pointer += 4;
        }
        else if(opcode === 3){
            const answer = readlineSync.question(`OP 3 for position ${data[pointer + 1]}: \n`);
            data[data[pointer + 1]] = answer;
            console.log(`Saved ${answer} to ${data[pointer + 1]}.`);
            pointer += 2;
        }
        else if(opcode === 4){
            console.log(`OP 4 for position ${data[pointer + 1]}:`);
            console.log(data[data[pointer + 1]]);
            pointer += 2;
        }
        else if(opcode === 5){
            if(getValue(data, data[pointer + 1], modes[0]) !== 0)
                pointer = getValue(data, data[pointer + 2], modes[1]);
            else
                pointer += 3;
        }
        else if(opcode === 6){
            if(getValue(data, data[pointer + 1], modes[0]) === 0)
                pointer = getValue(data, data[pointer + 2], modes[1]);
            else
                pointer += 3;
        }
        else if(opcode === 7){
            if(getValue(data, data[pointer + 1], modes[0]) < getValue(data, data[pointer + 2], modes[1]))
                data[data[pointer + 3]] = 1;
            else
                data[data[pointer + 3]] = 0;
            pointer += 4;
        }
        else if(opcode === 8){
            if(getValue(data, data[pointer + 1], modes[0]) === getValue(data, data[pointer + 2], modes[1]))
                data[data[pointer + 3]] = 1;
            else
                data[data[pointer + 3]] = 0;
            pointer += 4;
        }
        else{
            console.log(opcode + 'unhandled');
            return;
        }
    }
           
});
