/*Super!! Maintenant le but, c'est de réaliser la page d'un canapé.
Pour cela, tu fais la même chose mais en ne récupérant qu'un seul canapé.
Tu as mis le query param dans l'url, c'est parfait.
Du coup, sur la page d'un canapé, tu récupères l'id qui se trouve dans l'url
et tu appelles la routes http://localhost:3000/api/products/{id} ({id} est 
à remplacer par l'id que tu as récupéré). 
Et tu affiches le produit avec les infos récupérées de l'api. */


// Paramètres URL
const url = new URL(window.location.href);
console.log(url);
//Récupération de l'id du kanap
const recupId = url.searchParams.get("id");
console.log(recupId); //ok
let section = document.getElementById('item');

//Récupération des détails du produit depuis l'API
fetch(`http://localhost:3000/api/products/${recupId}`)
.then(response => response.json())
.then(data => {
  console.log(data);
  function ajoutKanap() {    // Ajout des détails du Kanap  
      const picKanap = document.querySelector(".item__img").innerHTML =
        `<img id="image" src="${data.imageUrl}" alt="${data.altTxt}">`;
      const nomProduit = document.getElementById("title").innerHTML =
      `<h1 id="title">${data.name}</h1>`;
        
    }
    ajoutKanap();
})


 
