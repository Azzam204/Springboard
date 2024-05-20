const $cont = $('.container')

const $img = $('.img-cont')

const $btn = $('.btn')

let deckId;

let draw;

let angle = () => Math.floor(Math.random() * (45 - (-45)) + (-45))

let z = 0


async function getDeck(){
    let res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

    deckId = res.data.deck_id;

    draw = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
}

getDeck();

$btn.on('click', async function(e){
    e.preventDefault();
    $(`<img src="${draw.data.cards[0].image}">`).css('transform',`rotatez(${angle()}deg)`).css('z-index',`${z}`).appendTo($img);
        draw = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        z += 1;

})