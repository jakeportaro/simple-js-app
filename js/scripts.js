let pokemonRepository = (function(pokemon) {

 let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  let pokemonList = [];

 //1.8 =============================
    let modalContainer = document.querySelector('#modal-container');

    // REST OF CODE


   function showModalImage(title, text, vurlimag) {
      // Clear all existing modal content
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      // Add the new modal content
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = title;

      let contentElement = document.createElement('p');
      contentElement.innerText = text;

      let imageElement = document.createElement('img');
      imageElement.src = vurlimag;


      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
     modal.appendChild(imageElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    }

   let dialogPromiseReject; // This can be set later, by showDialog

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

    function showDialog(title, text) {
    showModal(title, text);

    // We have defined modalContainer here
    let modalContainer = document.querySelector('#modal-container');

    // We want to add a confirm and cancel button to the modal
    let modal = modalContainer.querySelector('.modal');

    let confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Confirm';

    let cancelButton = document.createElement('button');
    cancelButton.classList.add('modal-cancel');
    cancelButton.innerText = 'Cancel';

    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);

    // We want to focus the confirmButton so that the user can simply press Enter
    confirmButton.focus();
     //------------------
      // Return a promise that resolves when confirmed, else rejects
    return new Promise((resolve, reject) => {
      cancelButton.addEventListener('click', hideModal);
      confirmButton.addEventListener('click', () => {
        dialogPromiseReject = null; // Reset this
        hideModal();
        resolve();
      });

      // This can be used to reject from other functions
    dialogPromiseReject = reject;
    });
  }

  document.querySelector('#show-modal').addEventListener('click', () => {
      showModal('Modal title', 'This is the modal content!');
    });


  document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
      alert('confirmed!');
    }, () => {
      alert('not confirmed');
    });
  });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal container,
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

  //1.7===================================

  function add(pokemon) {
     //console.log(pokemon);
    if (typeof pokemon == "object") {
      if ( ("name" in pokemon)&&
       ( "detailsUrl" in pokemon)) {
        pokemonList.push(pokemon);
       }

    }
  }
  function getAll() {
    return pokemonList;
  }
  function printDetails() {
    pokemonList.forEach(function(pokemon) {
      addListItem(pokemon);
    });
  }
  function addListItem(pokemon) {
    let tagul = document.querySelector('ul');
    let listItem = document.createElement('li');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.addEventListener('click', function(){showDetails(pokemon);});
    button.classList.add("button-class");

    listItem.appendChild(button);
    tagul.appendChild(listItem);
  }
  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        //console.log(pokemon);
        add(pokemon);
        //addListItem(pokemon.name);

      });
    }).catch(function(e) {
      console.error(e);
    })
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      //console.log(item.imageUrl);
    }).catch(function(e) {
      console.error(e);
    });
  }
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
    showModalImage(pokemon.name, pokemon.height, pokemon.imageUrl);
      console.log(pokemon);
    });
  }




  return {
    add: add,
    getAll: getAll,
    showAll: printDetails,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails

  };
})();







pokemonRepository.loadList().then(function() {
  pokemonRepository.showAll();
  pokemonRepository.getAll().forEach(function(pokemon) {
///    do something with every pokemon...
    //console.log(pokemon.name);
    //pokemonRepository.showDetails(pokemon);

  });
});
