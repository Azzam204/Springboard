const $list = $('.list');
const $form = $('.form');
showCakes();

async function showCakes(){
    let response = await axios.get('/api/cupcakes');
    let cupcakes = response.data.cupcakes;

    for(let cake of cupcakes){
        $list.append(
            `<li>
            <h3 style="text-transform :capitalize;">${cake.flavor}</h3>
            <img src=${cake.image} height="300" width="auto">
            <ul>
                <li>
                    Rating - ${cake.rating}
                </li>
                <li>
                    Size - ${cake.size}
                </li>
            </ul>
        </li>`
        )
    }
};

async function submitCake(){
    let flavor = $('#flavor')[0].value;
    let size = $('#size')[0].value;
    let rating = $('#rating')[0].value;
    let image = $('#image')[0].value;
    let data = {
        flavor:flavor,
        size:size,
        rating:rating,
        image:image
    }
    const res = await axios.post('/api/cupcakes',data)
    console.log(res)
}

$form.submit(function(e){
    e.preventDefault()
    submitCake();
    $('input').val('');
    $list.empty();
    showCakes();
})