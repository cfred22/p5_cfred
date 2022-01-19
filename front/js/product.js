
//-------------------------------------------------------//
//   Intégration de la fiche produit kanap depuis l'API  //
//-------------------------------------------------------//

// Paramètres URL récupération
const url = new URL(window.location.href);   
console.log(url);                            // test ok

// Récupération de l'id du kanap
const recupId = url.searchParams.get("id");  
console.log(recupId);                        // test ok

// Création des constantes du produit kanap
const boutonPanier = document.getElementById("addToCart");
//console.log(panier);

 // Intègration du html via la class ou l'id
const picKanap = document.querySelector(".item__img");
const nomKanap = document.getElementById("title");
const prixKanap = document.getElementById("price");
const descriptionKanap = document.getElementById("description");
const kanapCouleur = document.getElementById("colors");
const kanapQuantity = document.getElementById("quantity");

// Création des variables du produit kanap
var kanap = new Object();
// Variable liée au event 
var quantity;
var colors;
     
// Récup. détails de tout le produit depuis l'API
fetch(`http://localhost:3000/api/products/${recupId}`)
    .then(response => response.json())
    .then(kanap => {    
        picKanap.innerHTML =                
        `<img id="image" src="${kanap.imageUrl}" alt="${kanap.altTxt}">`;  
        nomKanap.innerHTML =                
        `<h1 id="title">${kanap.name}</h1>`;
        prixKanap.innerHTML =               
        `<span id="price">${kanap.price}</span>`; 
        descriptionKanap.innerHTML =             
        `<p id="description">${kanap.description}</p>`;  

        // création variable couleurs  
        let couleurs = kanap.colors; 
        // Fonction Ajout des couleurs du Kanap                                                
        couleurs.forEach((couleurs => { 
            // Intègration couleurs via l'id    
            couleurs = kanapCouleur.innerHTML +=   
            `<option value="${couleurs}">${couleurs}</option>`; 
        })
    )    
});

// Event pour la liste déroulante du choix de couleurs
kanapCouleur.addEventListener("change", (event) => {
    colors = event.target.value;
    console.log(event.target); 
});

// Event pour selection du Nombre d'articles 
kanapQuantity.addEventListener("change", (event) => {
    quantity = parseInt(event.target.value);
    console.log(quantity); 
});

// Au moment du clic stockage dans le local storage 
boutonPanier.addEventListener("click", (event) => {
    event.preventDefault();
    // Condition du click sur quantité !
    if(quantity > 0 && quantity <= 100 && colors !== undefined )  {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());  // recupère l'id dans l'URL
        //console.log(params);   
        kanap.id = params.id;
        kanap.quantity = quantity;
        kanap.colors = colors;
        // Ajout Panier -> voir fonction (Ajouter des produits !)  
        ajoutPanier(kanap);       

    } else {   
        alert('Choisissez une couleur et une quantité \(inférieur à 100 articles !\)')
        return
}})

// Si panier vide 
function getPanier() {
    let panier = localStorage.getItem("panier");
        if (panier < 1) {  
        return[];         
    } else {
        return JSON.parse(panier);
    };
}

// Ajouter des produits ! 
function ajoutPanier(kanap) {
    //recupère le tableau panier du localstorage 
    let panier = getPanier(); 
    // Création d'une variable "je suis la!"    
    let isHere = false;
    // Pour chaque kanap du panier localstorage comparaison 
    panier.forEach(item => {
        if(item.id == kanap.id && item.colors == kanap.colors) {
            // Si il y a un kanap (id + couleur) identique alors on incrémente le localstorage
            isHere = true;
            item.quantity += parseInt(kanap.quantity);
        }  
    });
    // Si il n'y a pas de kanap (id + couleur) identique alors on ajoute un clé 
    if (isHere == false) {
        panier.push(kanap);  
    }
    // sauvegarde du panier -> voir fonction (sérialisation plus bas) 
    savePanier(panier);     
};

// Serialisation qui transforme une donnée complexe en chaine de caractère.  
function savePanier(panier) {                               
    localStorage.setItem('panier', JSON.stringify(panier)); 
}







