const form = document.querySelector("form");
const textArea = document.querySelector("#IPergunta");
const localResultado = document.querySelector(".resposta");

form.addEventListener("submit", event => {
    event.preventDefault();
    
    if(textArea.value.length < 4) return alert("Pergunta muito pequena!");
    enviarResposta(textArea.value);
});

document.addEventListener("click", event => {
    const element = event.target;

    if(element.classList.contains("btnPergunta")) return enviarResposta(element.value);
});

// Requisição ao servidor
function enviarResposta(texto){
    const newLocal = "https://api-projetoamparoaors.onrender.com/pergunta";

    // Div Html para mostrar que a resposta está sendo processada.
    const loader = document.createElement("div");
    loader.classList.add("loader");

    // Adiciona uma animação de carregamento enquanto a resposta não retorna.
    localResultado.innerHTML = "";
    localResultado.appendChild(loader);

    // Defini se o usuário irá poder fazer uma pergunta.
    poderPerguntar(false);
    
    axios.get(newLocal, {
        params: {
          pergunta: texto
        }
      })
    .then(response => {
        localResultado.innerHTML =  response.data;
        
        // Define um delay de 3 segundos para fazer a outra pergunta.
        setTimeout(() => poderPerguntar(true), 3000);
    })
    .catch(error => {
        console.log(error);
        localResultado.innerHTML = "Erro em nosso servidor, por favor tente mais tarde."

        // Define um delay de 3 segundos para fazer a outra pergunta.
        setTimeout(() => poderPerguntar(true), 3000);
    });
}

function poderPerguntar(statusBotoes){
    const botoes = document.querySelectorAll(".btnPergunta");
    const inputSubmit = document.querySelector("input[type='submit']");
    if(!statusBotoes){
        for(botao of botoes){
            botao.setAttribute("disabled", true);
            botao.style.cursor = "progress";
            inputSubmit.setAttribute("disabled", true);
            inputSubmit.style.cursor = "progress";
        } 
    } else {
        for(botao of botoes){
            botao.removeAttribute("disabled");
            botao.style.cursor = "pointer";
            inputSubmit.removeAttribute("disabled");
            inputSubmit.style.cursor = "pointer";
        }
    }
}