const $cont = $('.container')

const $img = $('.img-cont')

const $btn = $('.btn')

let deckId;

let draw;

let angle = () => Math.floor(Math.random() * (45 - (-45)) + (-45))

let z = 0

axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
.then(function(data){
    deckId = data.data.deck_id;
    draw = axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
})


$btn.on('click', function(e){
    e.preventDefault();

    draw.then(function(data) {
        $(`<img src="${data.data.cards[0].image}">`).css('transform', `rotatez(${angle()}deg)`).css('z-index', `${z}`).appendTo($img);
        
        draw = axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        
        z += 1;
    })
})



