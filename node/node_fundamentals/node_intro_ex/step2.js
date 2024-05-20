const argv = process.argv[2];
const fs = require('fs');
const axios = require('axios')


function cat (path) {
    fs.readFile(path , 'utf8', function (err,data){
        if (err) {
            console.error(err)
            process.exit(1);
        }

        console.log(data)
    })
}

async function webCat (url) {
    try {
        let res = await axios.get(url)
        console.log(res.data)
    }
    catch (e) {
        console.error(e.code, e.response.status)
    }
}


if(argv.includes('http')) {
    webCat(argv)
}
else {
    cat(argv)
}
