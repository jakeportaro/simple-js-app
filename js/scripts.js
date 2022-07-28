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
  return {
    getAll: getAll,
    add: add
  }})()

  let pokemonList = pokemonRepository.getAll();

  pokemonList.forEach(function(pokemon) {
    if (pokemon.height > 15) {
      document.write('<p>' + pokemon.name + ' (Height: ' + pokemon.height + ')  WOW that is Huge!')
    } else if (pokemon.height <= 15 && pokemon.height > 5) {
      document.write('<p>' + pokemon.name + ' (Height: ' + pokemon.height + ')  That is pretty average')
    } else	if (pokemon.height < 10) {
      document.write('<p>' + pokemon.name + ' (Height: ' + pokemon.height + ')  That is small!')
    }
  }
)
