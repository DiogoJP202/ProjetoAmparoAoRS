# Projeto Amparo Ao RS

## Plataforma Web para Informações sobre Inundações no Rio Grande do Sul
Esta plataforma web foi desenvolvida para auxiliar a população do **Rio Grande do Sul** durante as inundações que assolaram o estado, além de oferecer um canal de informações para aqueles que querem ajudar. Através de uma interface amigável e intuitiva, a plataforma oferece aos usuários a possibilidade de esclarecer dúvidas e obter informações confiáveis sobre a situação, além de direcioná-los para canais de ajuda e doação.

## Funcionalidades

**Seção de perguntas e respostas:** A plataforma possui um campo de perguntas onde os usuários podem digitar suas dúvidas sobre as inundações. A inteligência artificial Gemini, treinada com dados oficiais e confiáveis, responde às perguntas de forma informativa e direciona os usuários para canais de ajuda adequados.

**Informações atualizadas:** A plataforma apresenta informações atualizadas sobre a situação das inundações, incluindo mapas de áreas afetadas e níveis dos rios.

## Tecnologias

### Front-end:
- **HTML**: Estruturação da página web.
- **CSS**: Estilização da interface visual.
- **JavaScript**: Implementação de funcionalidades interativas.

### Back-end:
- **Node.js**: Desenvolvimento da API para comunicação com a **inteligência artificial Gemini**.

```js
import express from "express";
import cors from "cors";
// Importando API da Gemini
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const server = express();
// Configurando como a variável de ambiente do servidor ou 3000.
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const MODEL_NAME = "gemini-1.5-pro-latest";
// Chave de acesso para a IA.
const API_KEY = "SuaChaveAqui";

// Dizendo que o servidor receberá um json como requisição.
server.use(express.json());

// Autenticação Cross-Origin para os acessos ao servidor
server.use(cors());

async function runChat(UserInput) {
  const genAI = new GoogleGenerativeAI(API_KEY); // Passando a chave de acesso para o IA.
  const model = genAI.getGenerativeModel({ model: MODEL_NAME }); // Passando o modelo para IA.

  // Configurações de resposta da IA, como ela responderá as perguntas.
  const generationConfig = {
    temperature: 0.4,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];

  // Definindo como a IA irá responder as requisições
  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "Quero que você responda dúvidas de pessoas com um tom sério e conciso, as dúvidas serão sobre a enchentes que ocorreram recentemente no Rio Grande do Sul.\n\nBasicamente, o Rio Grande do Sul está passando pela maior enchente vista na história do estado, com diversas pessoas perdendo suas casas e correndo risco de vida com a inundação das águas.\n\nPortanto você irá responder dúvidas relacionadas à esse tema, como por exemplo:\n\n\"Como estar seguro durante uma enchente?\"\n\"Como posso fazer para me aquecer?\"\n\"Como ajudar meus animais?\"\n\"Como manter meus suprimentos seguros?\"\n\"Como ajudar outras pessoas?\"\n\ne em perguntas com teor especifico citados abaixo você responderá o seguinte:\n\nPerguntas relacionadas a doações de dinheiro:\n\"<p>Doe somente em fontes <strong>seguras</strong> e de <strong>confiança</strong>, como a oficial <strong>SOS Rio Grande do Sul</strong>. Aqui está o Link: <a href=\"https://sosenchentes.rs.gov.br/inicial\">https://sosenchentes.rs.gov.br/inicial</a></p>\"\n\nPerguntas relacionadas a ser um voluntário para ajudar:\n\"<p>A <strong>defesa cívil</strong> do RS está fazendo um <strong>programa de voluntários</strong>. Saiba mais no portal: <a href=\"https://www.defesacivil.rs.gov.br/seja-um-voluntario\">https://www.defesacivil.rs.gov.br/seja-um-voluntario</a></p>\"\n\nPerguntas relacionadas a locais para doação de suprimentos:\n\"<p>Para <strong>doar suprimentos</strong>, entre no site <a href=\"https://sosenchentes.rs.gov.br/inicial\">https://sosenchentes.rs.gov.br/inicial</a> e confira quais são os <strong>postos de atendimento</strong></p>\"\n\nPerguntas relacionadas a locais de risco atualmente:\n\"<p>Veja as atualizações de risco no site da defesa cívil <a href= \"https://www.defesacivil.rs.gov.br/inicial\">https://www.defesacivil.rs.gov.br/inicial</p>\"\n\nQualquer pergunta feita mantenha sempre o contexto das enchentes no Rio Grande do Sul, se a pergunta não for de acordo com o tema responda \"<p>Desculpe, não posso responder a sua pergunta.</p>\"\n\nRetorne sempre sua resposta em formatação HTML repetindo a pergunta dita.\n\nExemplo:\n\n\"<h2> Por quais canais devo me informar? </h2>\n\n<p>Para se manter atualizado sobre a situação das <strong>enchentes</strong> no <strong>Rio Grande do Sul</strong> , consulte os canais oficiais da Defesa Civil do estado:  <ul> <li><a href=\"https://www.defesacivil.rs.gov.br/inicial\" target=\"_black\">https://www.defesacivil.rs.gov.br/inicial</ul> </p>\"\n\nSe você entendeu e consegue aplicar todas as instruções mostradas responda \"okay\"."}],
      },
      {
        role: "model",
        parts: [{ text: "okay"}],
      },
    ],
  });

  const result = await chat.sendMessage(UserInput);
  const response = result.response;
  return response.text();
}

// Definindo a rota do servidor como /pergunta
server.get("/pergunta", async (request, response) => {
    // Chamando a função assincrona da para avaliar a requisição do usuário
    const resposta = await runChat(request.query.pergunta);

    // retorna a resposta em formato json para o usuário.
    return response.json(resposta);
});

server.listen(port, () => console.log(`O Servidor foi iniciado na porta ${port}`));
```

## Página:
![image](https://github.com/DiogoJP202/ProjetoAmparoAoRS/assets/102389309/c18ac988-3cd0-4ac3-a7ad-850d03d697af)
![image](https://github.com/DiogoJP202/ProjetoAmparoAoRS/assets/102389309/a1a07478-e04b-4279-97d3-ebb6c933fbb5)

## Informações adicionais sobre o site (ℹ️):
- **PageSpeed Insights:**

![image](https://github.com/DiogoJP202/ProjetoAmparoAoRS/assets/102389309/9579c767-65e4-4bce-adde-fd6fd3dc0ff3)
![image](https://github.com/DiogoJP202/ProjetoAmparoAoRS/assets/102389309/f2bf52bd-ebc7-43b4-acce-5ab790456b13)

## Desenvolvido por:
- [Diogo Antonny](https://www.linkedin.com/in/diogo-antonny/)

## Design por:
- [Felipe Feliciano de Carvalho](https://www.linkedin.com/in/felipefelicianodecarvalho/)

[![image](https://github.com/user-attachments/assets/d7babb4f-1d3f-4d49-b877-e1767aee7f46)](https://www.youtube.com/watch?v=cdhYreDzpFY)

## Nossa Mensagem:
> Se até a Inteligência Artificial precisa de ajuda para continuar existindo e melhorando, por que não nos unirmos para nos auxiliar mutuamente e construir um mundo melhor?
