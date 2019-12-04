const fs = require('fs');
fs.readFile('201904.txt', 'utf8', (err, data) => {
    if(err) throw err;
    const [low, high] = data.split('-').map(Number);

    let doubleDigits = (number) => {
        let digits = new Map();
        while(number > 0){
            const digit = number % 10;
            if(digits.has(digit))
                digits.set(digit, digits.get(digit) + 1);
            else digits.set(digit, 1);
            number = Math.floor(number / 10);
        }

        for([key, value] of digits){
            if(value === 2)
                return true
        }
        return false;
    }

    let decreasingDigits = (number) => {
        let last = number % 10;
        while(number > 0){
            number = Math.floor(number / 10);
            if(number % 10 > last)
                return false;
            last = number % 10;
        }
        return true;
    }
    
    let count = 0;

    for(let i = low; i <= high; i++)
        if(doubleDigits(i) && decreasingDigits(i))
            count++;

    console.log(count);
});
