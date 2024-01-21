let id = -1;
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

function main(token){
    const urlParams = new URLSearchParams(window.location.search);
    const idAnimal = urlParams.get('id'); 
    console.log(idAnimal)

    $.ajax({
        method: "GET",
        url: "https://api.petfinder.com/v2/animals/" + idAnimal,
        headers: { Authorization: "Bearer " + token }
    }).done(function (data) {
        console.log(data);

        id = data.animal.id
        let nome = data.animal.name
        let idade = data.animal.age
        let raca = data.animal.breeds.primary ? data.animal.breeds.primary   : "";
        let sexo = data.animal.gender
        let porte = data.animal.size[0]
        let especie = data.animal.type
        let descricao = data.animal.description ? data.animal.description : "";
        let img = data.animal.photos[0] ? data.animal.photos[0].full : "";

        console.log(raca)


        document.querySelector('.nome_animal').innerHTML = nome;
        document.querySelector('.idade_animal').innerHTML = idade;
        document.querySelector('.raca_animal').innerHTML = raca;
        document.querySelector('.sexo_animal').innerHTML = sexo;
        document.querySelector('.tamanho_aninal').innerHTML = porte;
        document.querySelector('.especie_animal').innerHTML = especie;
        document.querySelector('.imagemAnimal').src = img;
        document.querySelector('.imagemAnimal').alt = nome;
        document.querySelector('.adicionar_favoritos').innerHTML = CheckIfItemIsInFavorites(id) !== -1 ? "Remover dos Favoritos" : "Adicionar aos Favoritos";

    })

}

function CheckIfItemIsInFavorites(  ){
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

$('.adicionar_favoritos').on('click', function() {
    console.log("check if im here");
    if(CheckIfItemIsInFavorites() !== -1){
        RemoveFavoritos();
    }
    else{
        AddFavoritos();
    }
})

function AddFavoritos(){
    console.log('add')
	let favoritos = localStorage.getItem('favoritos');
    if(favoritos){
        favoritos = JSON.parse(favoritos);
        favoritos.push(id)
    }
    else{
        favoritos = [];
        favoritos.push(id);
    }
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    document.querySelector('.adicionar_favoritos').innerHTML = 'Remover dos Favoritos';
}

function RemoveFavoritos(){
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
    document.querySelector('.adicionar_favoritos').innerHTML = 'Adicionar aos Favoritos';
}