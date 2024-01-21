let tokem = ""

$("#btnProcurar").on("click", function () {
    //limpar animais que ja aparecem
    $(".lista-animais").empty();

    var valueSearch = $("#pesquisa").val(); //variavel guarda o valor da pesquisa

    $.ajax({
        method: "GET",
        url: "https://api.petfinder.com/v2/animals?name= " + valueSearch,
        headers: { Authorization: "Bearer " + token }
    }).done(function (data) {
        console.log(data);


        //ciclo para ir buscar todos os objetos do data / O parametro result do "each" tem o objeto de cada animal
        $.each(data.animals, function (index, animal) {

            renderAnimal(animal)
        });

    })
})

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

    $.ajax({
        method: "GET",
        url: "https://api.petfinder.com/v2/animals",
        headers: { Authorization: "Bearer " + token }
    }).done(function (data) {
        console.log(data);


        //ciclo para ir buscar todos os objetos do data / O parametro result do "each" tem o objeto de cada animal
        $.each(data.animals, function (index, animal) {
            //Prencher card dinamicamente

           renderAnimal(animal)

        });

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
 <div class="col-md-4 p-4">
     <div class="card h-100 bg-amarelo">
         <img src="${(img)}" class="card-img-top" alt="${nome}" height="300px" width="300px">
         <div class="card-body">
             <h5 class="card-title text-center">${nome}</h5>
             <p class="card-text m-0">Idade: ${idade}</p>
             <p class="card-text m-0">Sexo: ${sexo}</p>
             <p class="card-text m-0">Porte: ${porte}</p>
             <p class="card-text m-0">${descricao}</p>
             <a href="adocao.html" class="btn bg-castanho col-12 mt-2">Adotar</a>
             <a href="detalhes.html?id=${id}" class="btn bg-castanho col-12 mt-2">Detalhes</a>
         </div>
     </div>
 </div>
`;

    $(".lista-animais").append(cardHtml);
}
