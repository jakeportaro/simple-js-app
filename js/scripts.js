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

for (i=0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 15) {
  		document.write('<p>' + pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ')  WOW that is Huge!')
  	} else if (pokemonList[i].height <= 15 && pokemonList[i].height > 5) {
  		document.write('<p>' + pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ')  That is pretty average')
  	} else	if (pokemonList[i].height < 10) {
  		document.write('<p>' + pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ')  That is small!')
  	}
}
