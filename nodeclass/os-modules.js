const os = require('os');

// const user = os.userInfo();
// console.log(user)

const uptime = os.uptime();
console.log(`This laptop has been running for about ${uptime} seconds`)

const myLaptop = {
    name: os.type(),
    release: os.release(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    architecture: os.arch(),
    hostname: os.hostname(),
    type: os.type(),
}

console.log(myLaptop)