const $cont = $('.container')

const numProm = [];

for (let i = 1; i <= 4; i++) {
    numProm.push(
        axios.get('http://numbersapi.com/42')
    )
}

Promise.all(numProm)
.then(numFactArr => (
    numFactArr.forEach( function (data){
        let fact = data.data;
        $cont.append(`<li class= "m-3">${fact}</li>`)
    })
))

