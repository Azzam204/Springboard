const {MarkovMachine} = require('./markov.js')
const argv = process.argv
const fs = require('fs')
const axios = require('axios')

async function getText(url) {
    try {
        let res = await axios.get(url)
        let mm = new MarkovMachine(res.data)
        console.log(mm.makeText())
    }
    catch(e){
        console.error(e.code,e.response.status)
    }
}

if (argv[2] === 'file') {
    fs.readFile(argv[3],'utf8', function(err,data){
        if (err) {
            console.log(err);
            process.exit(1);
        }
        else {
            let mm = new MarkovMachine(data);
            console.log(mm.makeText())
        }
    });
};

if (argv[2] === 'url') {
    getText(argv[3])
}

