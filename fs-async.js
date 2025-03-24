const fs = require('fs');

console.log('First Task')

fs.readFile('./read/file1.txt', 'utf-8', (err, data) => {
    if (err){
        console.log('Error reading file') 
        return data
    }
    const first = data
    fs.readFile('file2.txt', 'utf-8', (err, data) => {
        if (err){
            console.log('Error reading file')
            return
        }
        const second = data
        fs.writeFile('file3.txt', `The result of ${first} and ${second}`, (err, data) => {
            if (err){
                console.log('Error writing file')
                return
            }
            console.log('Done with the second task')
        })
    })
})

console.log('done with the third task')