document.addEventListener("DOMContentLoaded", function() {
    fillBirthYearSelect();
});

document.getElementById("contat-form").addEventListener("submit",function(event) { 
    event.preventDefault() //previne comportamento padrão do envio do formalorio, para nao ir para outra pagina basicamente
    if(validateForm()){
        //se o resultado desta função for verdadeiro deve guardar os dados do formulari, se estiverem validos
        //deve tambem mostrar uma mensagem de sucesso

    }

})
//Funções

function validateForm(){
    var isValid = true;
    var email = getElementById("EmailInput");
    var name = getElementById("NomeInput");
    if(name.value.length < 3){//valida se o nome tem mais de 3 letras
        isValid=false;
        alert("Nome invalido");
    }

    if(email.value.length < 3){//valida se o nome tem mais de 3 letras
        isValid=false;
        alert("Email invalido");
    }
}
//prenche o slect com os anos
function fillBirthYearSelect(){
    var currentYear = new Date().getFullYear();
    var select = document.getElementById("birthYear");

    for(var year = 1900; year <= currentYear; year++){
        var option = document.createElement("option");
        option.value = year;
        option.text = year;
        select.appendChild(option);
    }

}