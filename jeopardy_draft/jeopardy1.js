getCategories();

const body = document.querySelector('body');
const cat = Array.from(document.querySelectorAll('.cat'));
const row = Array.from(document.querySelectorAll('.row'));
const td = Array.from(document.querySelectorAll('td'))

let catIds = [];
let categories = [];

async function getCategories() {
    const response = await axios.get('https://jservice.io/api/categories',{params:{count:6, offset: Math.floor(Math.random() * 20000)}});
    for (let index = 0; index < response.data.length; index++) {
        cat[index].innerHTML = response.data[index].title;
        catIds.push(response.data[index].id);
        const catResponse =  await axios.get('https://jservice.io/api/clues', {params:{category: catIds[index]}});
        categories.push(catResponse.data);
    }
}

body.addEventListener('click', function(e){
    if (e.target.localName === 'td' && e.target.innerText === '?') {
        e.target.innerHTML = categories[e.target.cellIndex][row.indexOf(e.target.parentElement)].question;
    }
    else if (e.target.localName === 'td' && e.target.innerText !== '?') {
        e.target.innerHTML = categories[e.target.cellIndex][row.indexOf(e.target.parentElement)].answer;
    }
    else if (e.target.localName === 'button') {
        categories = [];
        for (let cell of td) {
            cell.innerText = '?'};
        getCategories();
    }
})

