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

    if(element.classList.contaiqns("btnPergunta")) return enviarResposta(element.value);
});

function enviarResposta(texto){
    console.log(texto)
    const newLocal = "https://api-projetoamparoaors.onrender.com/pergunta";
    axios.get(newLocal, {
        params: {
          pergunta: texto
        }
      })
    .then(response => {
        localResultado.innerHTML =  response.data;
    })
    .catch(error => console.log(error));
}