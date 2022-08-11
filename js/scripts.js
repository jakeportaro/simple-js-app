let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Charizard',
      height: 10,
      type: ['fire','hot','lava']
    },
    {
      name: 'Picachu',
      height: 1,
      type: ['electric','electricity','zap']
    },
    {
      name: 'Snorlax',
      height: 50,
      type: ['fat','large','giant']
    }
  ];
  function getAll(){
    return pokemonList;
  }

  function add(pokemon){
    pokemonList.push(pokemon);
  }

  function addlistItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.addEventListener('click', function(pokemon){
      showDetails(pokemon);
    });
    button.innerText = pokemon.name;
    button.classList.add("button-style");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }

  function showDetails(pokemon){
    console.log(pokemon);
  }
  return {
    getAll: getAll,
    add: add,
    addlistItem: addlistItem
  }})()

  let pokemonList = pokemonRepository.getAll();

  pokemonList.forEach(function(pokemon) {
    pokemonRepository.addlistItem(pokemon);
  });
