$(document).ready(function () {

    const apiKey = "y5gmWxBy7raBlHLqLAxQh86f9XaeF7MvACKIJCyb5oa5C27qXs"
    const apiSecret = "av2gYc4hAwlVMYa1HO3ostGjVmAA5AVpH2Z4PTfS"

    $.ajax({
        method: "POST",
        url: "https://api.petfinder.com/v2/oauth2/token",
        data: {
            grant_type: "client_credentials",
            client_id: apiKey,
            client_secret: apiSecret
        }
    }).done(function (data) {
        token = data.access_token;
        main(token);
    });


});
function main(token) {
    // Target div
    var litasAnimais = $('.lista-animais');
    ProcurarIdsWebStorage()


}
function ProcurarIdsWebStorage(){
    let favoritos = localStorage.getItem('favoritos');
        favoritos = JSON.parse(favoritos);
        for(let i = 0; i < favoritos.length; i++){
            console.log(favoritos[i])
            id=favoritos[i];
            DetalhesAnimal(id)

        }
    return -1;
    
}
function DetalhesAnimal(id){
    $.ajax({
        method: "GET",
        url: "https://api.petfinder.com/v2/animals/" + id,
        headers: { Authorization: "Bearer " + token }
    }).done(function (data) {
        renderAnimal(data.animal)

    })
}

function renderAnimal(animal){
    let id = animal.id
    let nome = animal.name
    let idade = animal.age
    let sexo = animal.gender
    let porte = animal.size
    let descricao = animal.description ? animal.description : "";
    let img = animal.photos[0] ? animal.photos[0].full : "";

    var cardHtml = `
 <div class="col-md-4 p-4" id="animal[${animal.id}]">
     <div class="card h-100 bg-amarelo">
         <img src="${(img)}" class="card-img-top" alt="${nome}" height="300px" width="300px">
         <div class="card-body">
             <h5 class="card-title text-center">${nome}</h5>
             <p class="card-text m-0">Idade: ${idade}</p>
             <p class="card-text m-0">Sexo: ${sexo}</p>
             <p class="card-text m-0">Porte: ${porte}</p>
             <p class="card-text m-0">${descricao}</p>
             <a href="adocao.html" class="btn bg-castanho col-12 mt-2">Adotar</a>
             <a class="btn bg-castanho col-12 mt-2" onclick="RemoveFavoritos(${id})">Remover Favoritos</a>
         </div>
     </div>
 </div>
`;

    $(".lista-animais").append(cardHtml);
}

function RemoveFavoritos(id){
    console.log('remove')
    let favorito = CheckIfItemIsInFavorites(id)
    console.log(favorito)
	if(favorito !== -1){
        let favoritos = localStorage.getItem('favoritos');
        let newFavoritos = [];
        favoritos = JSON.parse(favoritos);
        for(let i = 0; i < favoritos.length; i++){
            if(i !== favorito){
                newFavoritos.push(favoritos[i]);
            }
        }
        localStorage.setItem('favoritos', JSON.stringify(newFavoritos));
    }
    document.querySelector(`[id='animal[${id}]']`).remove()
}
function CheckIfItemIsInFavorites(id){
    let favoritos = localStorage.getItem('favoritos');
    if(favoritos){
        favoritos = JSON.parse(favoritos);
        for(let i = 0; i < favoritos.length; i++){
            if(favoritos[i] == id){
                return i;
            }
        }
    }
    return -1;
}