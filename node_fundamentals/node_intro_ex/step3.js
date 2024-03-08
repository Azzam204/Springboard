const argv = process.argv;
let pathFrom;
let pathTo;
const fs = require('fs');
const axios = require('axios')

function handleOutput(data , pathTo) {
    if (pathTo) {
        fs.writeFile(pathTo,data,'utf8', function(err) {
            if (err) {
                console.error(err)
                process.exit(1);
            }
        });
    }
    else{
        console.log(data)
    }
}

function cat (path, pathTo) {
    fs.readFile(path , 'utf8', function (err,data){
        if (err) {
            console.error(err)
            process.exit(1);
        }

        handleOutput(data,pathTo)
    })
}

async function webCat (url, pathTo) {
    try {
        let res = await axios.get(url)
        handleOutput(res.data,pathTo)
    }
    catch (e) {
        console.error(e.code, e.response.status)
    }
}


if(argv[2] === '--out'){
    pathFrom = argv[4];
    pathTo = argv[3];
}
else {
    pathFrom = argv[2]
}

if(pathFrom.includes('http')){
    webCat(pathFrom,pathTo)
}
else{
    cat(pathFrom,pathTo)
}