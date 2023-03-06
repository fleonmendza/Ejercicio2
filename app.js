const cards = document.querySelector("#cards");
const btnCarrito = document.querySelector("#btnCarrito");
const carrito = document.querySelector("#Carrito");
const carritoItem = document.querySelector("#CarritoItem");
const compras = document.querySelector("#Compras");
const btnDisminuirCantidad = document.querySelector("#btnDisminuirCantidad");

let objetos = [];
let pokemonCarrito =[];

const getInfoPokemon = async (url) => {
  let pokeInfo;
 
  const response = await fetch(url);
  pokeInfo = await response.json();
  
  let pokeData = {
    name : pokeInfo.name,
    id : pokeInfo.id,
    img :pokeInfo.sprites.front_default,
    types : pokeInfo.types.map((poke) => (e = poke.type.name)),
    height : pokeInfo.height * 10,
    weight : pokeInfo.weight / 10,
    price : pokeInfo.stats[1].base_stat,
    cantidad: 1,
  }
  objetos = [...objetos, pokeData];
  cards.innerHTML += `
       <div id="card">
        <h2>${pokeData.name.toUpperCase()}</h2>
        <img
            src="${pokeData.img}"
            alt="${pokeData.name}"
        />
        <p><strong>Tipo:</strong> ${pokeData.types.join(" / ")} </p>
        <p><strong>Altura:</strong> ${pokeData.height} cm </p>
        <p><strong>Peso:</strong> ${pokeData.weight} Kg</p>
        <p><strong>Precio:</strong> ${pokeData.price} $</p>
        <button id="btnAgregarCarrito" onclick="addPokemonList(objetos, ${pokeData.id});" class="btnAgregarCarrito" >Agregar al Carrito
        <svg id="svg" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="48"><path d="M453 776h60V610h167v-60H513V376h-60v174H280v60h173v166Zm27.266 200q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
        </button>
       </div>
    `;
};

const getApiPoke = async () => {
  let pokemonResult = [];
  let listPokemon = [];

  const request = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=30`);
  pokemonResult = await request.json();
  listPokemon = pokemonResult.results;
  listPokemon.map((listPokemon) => {
    getInfoPokemon(listPokemon.url);
  });
};

const addPokemonList = (data, id) =>{
    let pokemon = data.find((item)=>item.id===id);
    if(pokemonCarrito.some((item)=>item.id === pokemon.id)){
      pokemon.cantidad++;
    }else{
      pokemonCarrito=[...pokemonCarrito, pokemon];
    }
    printPokeItem(pokemonCarrito)

};

const printPokeItem = (data) =>{
  Carrito.innerHTML='';
  data.map(e => {
    Carrito.innerHTML+=` 
    
    <div id="CarritoItem" >   
      
      <img id="imgCarrito" src="${e.img}" alt="">
      <div class="text">
        <span>${e.name}</span>
      </div>
        <span>${e.cantidad}</span>
      <div>
        <button class="btnDisminuirCantidad" data-id='${e.id}'; id="btnDisminuirCantidad">
        -
        </button>
        <button class="btnAumentarCantidad" data-id='${e.id}' id="btnAumentarCantidad">
          +
        </button>
        <button class="btnEliminar" data-id='${e.id}' id="btnEliminar">
         x
        </button>
      </div>
    </div>
`
  });
  
}

const disQuantity = (id) =>{
  pokemonCarrito.map((pokemon)=>{
    if(pokemon.id == id){
     pokemon.cantidad--;
     if(pokemon.cantidad==0){
      deleteItem(id);
     }
    }
  })
  printPokeItem(pokemonCarrito); 
}

const addQuantity = (id) =>{
  pokemonCarrito.map((pokemon)=>{
    if(pokemon.id == id){
      pokemon.cantidad++;
    }
  })
  printPokeItem(pokemonCarrito); 
}

const deleteItem = (id) =>{
  pokemonCarrito.map((pokemon)=>{
    if(pokemon.id == id){
      let objetoPoke = pokemonCarrito.find((item)=>item.id==id);
      let indiceItem = pokemonCarrito.indexOf(objetoPoke);
      pokemonCarrito.splice(indiceItem, 1);
    }
  })
  printPokeItem(pokemonCarrito); 
}

document.addEventListener('click', (e)=>{
  if(e.target.classList.contains('btnDisminuirCantidad')){
    let idbtn = e.target.dataset.id;
    disQuantity(idbtn);
  }
});

document.addEventListener('click', (e)=>{
  if(e.target.classList.contains('btnAumentarCantidad')){
    let idbtn = e.target.dataset.id;
    addQuantity(idbtn);
  }
 });

 document.addEventListener('click', (e)=>{
  if(e.target.classList.contains('btnEliminar')){
    let idbtn = e.target.dataset.id;
    deleteItem(idbtn);
  }
 });

btnCarrito.addEventListener('click', (e)=>{ 
  if (carrito.style.display == 'flex') {
    carrito.style.display = 'none';
  }
  else {
    carrito.style.display = 'flex';
  }

});


getApiPoke();




