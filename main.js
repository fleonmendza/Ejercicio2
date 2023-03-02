const carrito = document.querySelector("#CarritoItem");
const cards = document.querySelector("#cards");
const btnCarrito = document.querySelector("#btnCarrito");
const btnAgregarCarrito = document.querySelector(".btnAgregarCarrito");


const getInfoPokemon = async (url) => {
  let pokeInfo;
  let name;
  let types;
  let height;
  let weight;
  let img;

  const response = await fetch(url);
  pokeInfo = await response.json();
  name = pokeInfo.name;
  img = pokeInfo.sprites.front_default;
  types = pokeInfo.types.map((poke) => (e = poke.type.name));
  height = pokeInfo.height * 10;
  weight = pokeInfo.weight / 10;

  cards.innerHTML += `
       <div id="card">
        <h2>${name.toUpperCase()}</h2>
        <img
            src="${img}"
            alt="${name}"
        />
        <p><strong>Tipo:</strong> ${[...types].join(" / ")} </p>
        <p><strong>Altura:</strong> ${height} cm </p>
        <p><strong>Peso:</strong> ${weight} Kg</p>
        <button id="btnAgregarCarrito" onclick=addPokemonList(${name}) class="btnAgregarCarrito" >Agregar al Carrito
        <svg id="svg" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="48"><path d="M453 776h60V610h167v-60H513V376h-60v174H280v60h173v166Zm27.266 200q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
        </button>
       </div>
    `;
};

const getApiPoke = async () => {
  let pokemonResult = [];
  let listPokemon = [];

  const request = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=0&limit=30`
  );

  pokemonResult = await request.json();
  listPokemon = pokemonResult.results;
  listPokemon.map((listPokemon) => {
    getInfoPokemon(listPokemon.url);
  });
};
getApiPoke();

const addPokemonList = (id) =>{
    debugger
    console.log(id);
}

btnCarrito.addEventListener('click', ()=>{
    console.log("hola");
    carrito.classList.toggle('hidden');
});

