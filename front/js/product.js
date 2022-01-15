
/*******************************************/
/*Page PRODUIT intégrer kanaps depuis l'API*/
/*******************************************/

const url = new URL(window.location.href);   // Paramètres URL
console.log(url);                            // test ok

const recupId = url.searchParams.get("id");  // Récupération de l'id du kanap
console.log(recupId);                        // test ok
     

fetch(`http://localhost:3000/api/products/${recupId}`)
.then(response => response.json())
.then(kanap => {
    console.log(kanap);   // Récup. détails de tout le produit depuis l'API
    
    const picKanap = document.querySelector(".item__img").innerHTML =      // Intègration de l'image via la class
        `<img id="image" src="${kanap.imageUrl}" alt="${kanap.altTxt}">`;  
    const nomKanap = document.getElementById("title").innerHTML =          // Intègration du Nom via l'id
        `<h1 id="title">${kanap.name}</h1>`;
    const prixKanap = document.getElementById("price").innerHTML =         // Intègration du Prix via l'id
        `<span id="price">${kanap.price}</span>`; 
    const description = document.getElementById("description").innerHTML = // Intègration description via l'id
        `<p id="description">${kanap.description}</p>`; 

    var couleurs = kanap.colors;   // création du variable couleurs
    console.log(couleurs);  // test ok tableau couleurs récupéré
                                             
    couleurs.forEach((couleurs => {   // Fonction Ajout des couleurs du Kanap  
        couleurs = document.getElementById("colors").innerHTML +=   // Intègration couleurs via l'id
        `<option value="">${couleurs}</option>`; 
    }))
});

/*******************************************/
/*       AJOUTER KANAP AU PANIER           */
/*******************************************/

//TODO: RECUPERER LA QUANTITE DANS LE PANIER AUTRE EVENTLISTENER  AVEC CHANGE ET NON click


const panier = document.getElementById("addToCart");
console.log(panier);

function savePanier(panier) {                               // Serialisation qui transforme une donnée complexe,
    localStorage.setItem('panier', JSON.stringify(panier)); // en chaine de caractère.
}

/*let kanap = {
    colors
    id: "",
    quantit
}*/

let kanap = new Object();

// Au moment du clic stockage dans local storage 
panier.addEventListener("click", function() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());  // recupère l'id dans l'URL
    console.log(params);
    kanap.id = params.id;
    ajoutPanier(kanap); 
})

// Si panier vide 
function getPanier() {
    let panier = localStorage.getItem("panier");
    if (panier == null) {  
        return[];   // Panier vide       
    } else {
        return JSON.parse(panier);
    };
}

// Ajouter des produits (kanaps)
function ajoutPanier(kanap) {
    let panier = getPanier();
    /*let foundKanap = panier.find(k => k.id == kanap.id); // Cherche si id(kanap) déjà existant dans mon panier
        if (foundKanap != undefined) {  
        alert("Vous allez ajoutez le même canapé !");
        foundKanap.quantity++;
    }else{
        kanap.quantity = 1;
        
    }*/  
    panier.push(kanap);  // Ajouter des produits (Panier considéré comme un tableau)
    savePanier(panier);     
}


