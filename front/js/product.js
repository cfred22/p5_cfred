/*Super!! Maintenant le but, c'est de réaliser la page d'un canapé.
Pour cela, tu fais la même chose mais en ne récupérant qu'un seul canapé.
Tu as mis le query param dans l'url, c'est parfait.
Du coup, sur la page d'un canapé, tu récupères l'id qui se trouve dans l'url
et tu appelles la routes http://localhost:3000/api/products/{id} ({id} est 
à remplacer par l'id que tu as récupéré). 
Et tu affiches le produit avec les infos récupérées de l'api. */

/*******************************************/
/*Page PRODUIT intégrer kanaps depuis l'API*/
/*******************************************/

const url = new URL(window.location.href);   // Paramètres URL
console.log(url);                            // test ok

const recupId = url.searchParams.get("id");  // Récupération de l'id du kanap
console.log(recupId);                        // test ok
     

fetch(`http://localhost:3000/api/products/${recupId}`)
.then(response => response.json())
.then(data => {
    console.log(data);   // Récup. détails de tout le produit depuis l'API
    function ProduitKanap() {   // Fonction Ajout de tous les détails du Kanap  
        
        const picKanap = document.querySelector(".item__img").innerHTML =      // Intègration de l'image via la class
            `<img id="image" src="${data.imageUrl}" alt="${data.altTxt}">`;  
        const nomKanap = document.getElementById("title").innerHTML =          // Intègration du Nom via l'id
            `<h1 id="title">${data.name}</h1>`;
        const prixKanap = document.getElementById("price").innerHTML =         // Intègration du Prix via l'id
            `<span id="price">${data.price}</span>`; 
        const description = document.getElementById("description").innerHTML = // Intègration description via l'id
            `<p id="description">${data.description}</p>`; 

        var couleurs = data.colors;   // création du variable couleurs
        console.log(couleurs);  // test ok tableau couleurs récupéré
                                                 
            couleurs.forEach((couleurs => {   // Fonction Ajout des couleurs du Kanap  
                couleurs = document.getElementById("colors").innerHTML +=   // Intègration couleurs via l'id
                `<option value="">${couleurs}</option>`; 
            })); 
        }
    ProduitKanap();
})

/*******************************************/
/*       AJOUTER KANAP AU PANIER           */
/*******************************************/





 
