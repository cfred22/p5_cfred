
/*******************************************/
/*Page PRODUIT intégrer kanaps depuis l'API*/
/*******************************************/

// Paramètres URL récupération
const url = new URL(window.location.href);   
console.log(url);                            // test ok

// Récupération de l'id du kanap
const recupId = url.searchParams.get("id");  
console.log(recupId);                        // test ok


// Création des constantes du produit kanap
const picKanap = document.querySelector(".item__img");
const nomKanap = document.getElementById("title");
const prixKanap = document.getElementById("price");
const description = document.getElementById("description");
     
// Récup. détails de tout le produit depuis l'API
fetch(`http://localhost:3000/api/products/${recupId}`)
    .then(response => response.json())
    .then(kanap => {    
        picKanap.innerHTML =                // Intègration de l'image via la class
        `<img id="image" src="${kanap.imageUrl}" alt="${kanap.altTxt}">`;  
        nomKanap.innerHTML =                // Intègration du Nom via l'id
        `<h1 id="title">${kanap.name}</h1>`;
        prixKanap.innerHTML =               // Intègration du Prix via l'id
        `<span id="price">${kanap.price}</span>`; 
        description.innerHTML =             // Intègration description via l'id
        `<p id="description">${kanap.description}</p>`;     

        let couleurs = kanap.colors;        // création variable couleurs                                         
        couleurs.forEach((couleurs => {     // Fonction Ajout des couleurs du Kanap  
            couleurs = document.getElementById("colors").innerHTML +=   // Intègration couleurs via l'id
            `<option value="">${couleurs}</option>`; 
        })
    )    
});

/*******************************************/
/*       AJOUTER KANAP AU PANIER           */
/*******************************************/

//TODO: RECUPERER LA QUANTITE DANS LE PANIER AUTRE EVENTLISTENER  AVEC CHANGE ET NON click


const panier = document.getElementById("addToCart");
console.log(panier);

// Serialisation qui transforme une donnée complexe en chaine de caractère.  
function savePanier(panier) {                               
    localStorage.setItem('panier', JSON.stringify(panier)); 
}

// selection du Nombre d'articles
const selectQuantity = document.getElementById("quantity");
quantity.addEventListener("change", (event) => {
    console.log(selectQuantity);
    ajoutPanier(kanap); 
})

var kanap = new Object();

//Boucle pour la liste déroulante du choix de couleurs



// Au moment du clic stockage dans local storage 
panier.addEventListener("click", (event) => {
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

/*let kanap = {
    colors: [""],
    id: "",
    quantity: "0",
    price: "",
    id: "",
    name: "",
    imageUrl: "",
    description: "",
    altTxt: "" 
}*/



