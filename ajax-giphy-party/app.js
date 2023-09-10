console.log("Let's get this party started!");

async function getGif (tag) {
    const url = `https://api.giphy.com/v1/gifs/random?api_key=85lf2U910AJOxyqnLaeb9ptBwgePdT0K&tag=${tag}&rating=g`;
    const res = await axios.get(url);
    return res.data.data.images.fixed_height.url
}

const form = document.querySelector('#form')
const input = document.querySelector('#input');
const remove = document.querySelector('#remove');
const container = document.querySelector('#container');

form.addEventListener('submit', async function(e){
    e.preventDefault();
    const newImg = document.createElement('img');
    newImg.src = await getGif(input.value);
    container.append(newImg);
    input.value = '';
} )

remove.addEventListener('click', () => container.innerHTML = '')