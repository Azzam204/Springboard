const $cont = $('.container')

// # slower but more succinct

// async function numfact (count) {
//     for (let i = 1; i <= count; i++) {
//         let res = await axios.get('http://numbersapi.com/42');
//         $cont.append(`<li class= "m-3">${res.data}</li>`)
//     }
// }

// numfact(4);



// # faster but longer to write
async function numfact (count) {
    let list = [];
    for (let i = 1; i <= count; i++) {
        list.push(
            axios.get('http://numbersapi.com/42')
        )
    }

    for (let i of list){
        i = await i;
        $cont.append(`<li class= "m-3">${i.data}</li>`)
    }
}

numfact(4);