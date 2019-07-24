const LOL_CARD = LOL.data;

const LOL_VALUES = Object.values(LOL_CARD);

const cardContent = document.querySelector(".card-content");
const cardSearch = document.querySelector(".card-search");

let dropFilter = "";
let dropOrder = "";

const TAGS_EN = {
  "Assassin": "Assassinos",
  "Fighter": "Lutador",
  "Mage": "Mago",
  "Marksman": "Atirador",
  "Support": "Suporte",
  "Tank": "Tanque"
};

const lolTemplate = card => {
  const tagList = card.tags.map(item => TAGS_EN[item]).join(', ');
  
  return `<div class="card">
    <div class="card-front">
      <h3 class="card-title">${card.name} <span class="card-subtitle">${card.title}</span></h3>
      <img src="${card.splash}" alt="Imagem do personagem ${card.name}" class="card-img">
      <ul class="card-list">
        <li class="card-item">Ataque: ${card.info.attack}</li>
        <li class="card-item">Defesa: ${card.info.defense}</li>
        <li class="card-item">Magia: ${card.info.magic}</li>
        <li class="card-item">Dificuldade: ${card.info.difficulty}</li>
      </ul>

      <p class="card-tags">Tags: ${tagList}</p>
    </div>
    <div class="card-back">
      <p class="card-subtitle">${card.blurb}</p>
    </div>
  </div>`;
};


// lista todos os cards sem nenhum filtro - begin
const LOL_CARDS = LOL_VALUES.map(card => {
  return lolTemplate(card);
});

cardContent.innerHTML = LOL_CARDS.join("");
// lista todos os cards sem nenhum filtro - end




// adiciona o evento ao Filtrar por Classe - begin
document.querySelector(".drop-filter").addEventListener("change", event => {
  dropFilter = event.target.value;
  
  const LOL_CARDS = LOL_VALUES.filter(card => {
    return card.tags.indexOf(dropFilter) >= 0;
  }).map(card => {
    return lolTemplate(card);
  });

  cardSearch.innerHTML = `Foram encontrados ${LOL_CARDS.length} ítens da classe ${TAGS_EN[dropFilter]}`;
  cardContent.innerHTML = LOL_CARDS.join("");
});
// adiciona o evento ao Filtrar por Classe - end




// adiciona o evento ao Ordenar por - begin
document.querySelector(".drop-order").addEventListener("change", event => {
  dropOrder = event.target.value;
  
  const LOL_CARDS = LOL_VALUES.sort((cardA, cardB) => {
    return cardB.info[dropOrder] - cardA.info[dropOrder];
  }).map(card => {
    return lolTemplate(card);
  });
  
  cardContent.innerHTML = LOL_CARDS.join("");
});
// adiciona o evento ao Ordenar por - end




document.querySelectorAll(".card-img").forEach(cardImg => {
  cardImg.addEventListener("click", event => {
    console.log(event);
  });
});