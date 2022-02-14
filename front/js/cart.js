
//----------------------------------------------------//
//   Récupération des produits dans le localstorage   //
//----------------------------------------------------//

// Récupération du panier du localStorage
let panier = JSON.parse(localStorage.getItem('panier'));  
console.log(panier);
var html = "";
var section = document.getElementById('cart__items'); // Variable 'section' pour aller chercher ID items
console.log(section);

// Création des variables du produit kanap
var kanap = new Object();
// Variable liée au event 
var quantity;
var colors;
var kanapQuantite = document.getElementsByClassName("itemQuantity");

// variable pour la fonction prix
var compteurPrix = 0;
let prixTotal = 0;  

// retour fonction accueil index voir ligne 97
retourAccueil();

// Compte le nombre de passage du forEach,
// pour cibler les éléments demandés par l'utilisateur 
var compteur = 0;

// Recherche dans le localstorage(panier), affiche les kanaps demandés aux positions Spécifiés du DOM  
/*panier.map(item => {
  fetch(`http://localhost:3000/api/products/`+ item.id)    
    .then(resp => resp.json())
    .then(kanap => {
      affichageProduit(item, kanap);        
      updateQuantity();
      supprimerKanap();
      totalQuantite();
      totalPrix(kanap);
    })
  }  
);*/

const promises = panier.map(elt => {
    return fetch(`http://localhost:3000/api/products/` + elt.id)
    .then(resp => {
      return resp.json();
       
    });  
});

Promise.all(promises)
  .then(kanaps => {
    kanaps.forEach(kanap => {      
    affichageProduit(kanap);  
    console.log(kanap);
    updateQuantity();
    console.log(quantity)
    supprimerKanap();
    totalQuantite();
    totalPrix(kanap);
    // compte le nombre de passage du 
    // forEach pour cibler les éléments 
    compteur++;   
  });
});

// Affichage produits
function affichageProduit(kanap) {
  html = html + `
    <article class="cart__item" data-id="${kanap._id}" data-color="${panier[compteur].colors}">
      <div class="cart__item__img">
          <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
      </div>
      <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${kanap.name}</h2>
              <p>${panier[compteur].colors}</p>
              <p>${kanap.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier[compteur].quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
    </article>`; 
  section.innerHTML = html;
}

// Panier vide retour Accueil
function retourAccueil() {
  if (panier == null) {
    alert(`Oups ! Oubli de votre KANAP ? retour accueil !`);
    location.href = 'index.html';
  } 
}

// Changement quantité KANAP par utilisateur en direct sur le panier
function updateQuantity() {
  const kanapQuantity = document.querySelectorAll('.itemQuantity');
  for (let i = 0; i < kanapQuantity.length; i++) {
    kanapQuantity[i].addEventListener('change', (event) => {
      event.preventDefault();
      const kanapNewQuantity = event.target.value;
      const newPanier = {
        id: panier[i].id,
        colors: panier[i].colors,
        quantity: kanapNewQuantity,
        price: panier[i].price,
      };
      panier[i] = newPanier;
      localStorage.clear();
      localStorage.setItem('panier',JSON.stringify(panier));
      location.reload();
    });
  }
  console.log(panier);
}

//Supprimer un produit kanap
function supprimerKanap() {  
  retourAccueil();
  const supprKanap = document.querySelectorAll('.deleteItem');  
  console.log(supprKanap); // ???
  for (let i = 0; i < supprKanap.length; i++) {   
    
    supprKanap[i].addEventListener('click', (event) => {
      console.log(event);
      event.preventDefault();
      panier.splice(i, 1);     
      localStorage.setItem('panier',JSON.stringify(panier));
      alert("Suppression de votre Kanap !")
      location.reload();
      if(panier.length == 0) {
        alert(`Remplissez votre panier ! retour à l'accueil ;)`);
        document.location.href = `index.html`;
        localStorage.clear();
      }
    })
  }
  console.log(panier);  
};

// Ajouter des produits ! 
function ajoutPanier(kanap) {
  //recupère le tableau panier du localstorage 
  let panier = getPanier(); 
  // Création d'une variable "je suis la!"    
  let isHere = false;
  // Pour chaque kanap du panier localstorage comparaison 
  panier.map(kanap => {
      if(kanap.id == kanap.id && kanap.colors == kanap.colors) {
          // Si il y a un kanap (id + couleur) identique alors on incrémente le localstorage
          isHere = true;
          item.newQuantity += parseInt(kanap.quantity);
      }  
  });
  // Si il n'y a pas de kanap (id + couleur) identique alors on ajoute un clé 
  if (isHere == false) {
      panier.push(kanap);  
  }
  // sauvegarde du panier -> voir fonction (sérialisation plus bas) 
  savePanier(panier);     
};

// Si panier vide 
function getPanier() {
  let panier = localStorage.getItem("panier");
    if (panier < 1) {  
    return[];         
  }else{
    return JSON.parse(panier);
  };
}

// Serialisation qui transforme une donnée complexe en chaine de caractère.  
function savePanier(panier) {                               
  localStorage.setItem('panier', JSON.stringify(panier)); 
}

//Total des articles 
function totalQuantite() {    
  let kanapTotal = 0;  

  for(let k = 0; k < kanapQuantite.length; k++) {
    kanapTotal += kanapQuantite[k].valueAsNumber;
    console.log(kanapTotal);
    // ok décompte !
  }  
  let kanapTotalQuantite = document.getElementById("totalQuantity");
  kanapTotalQuantite.innerHTML = kanapTotal; 
}

//Total des prix
function totalPrix(kanap) {
  
  prixTotal += kanapQuantite[compteurPrix].valueAsNumber * kanap.price;
  console.log(prixTotal);

  let prixTotalKanap = document.getElementById("totalPrice");
  prixTotalKanap.innerHTML = prixTotal;
  compteurPrix++;     
}

//Verif de la saisie avec les expressions régulières REGEX
const formulaire = document.querySelector('.cart__order__form');
var regex = /^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/;
var regexLocal= /^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]{3,}$/;
var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var prenomValide = false; 
var nomValide = false;
var adresseValide = false;
var villeValide = false;
var emailValide = false;

// 1- Ecoute du prenom
formulaire.firstName.addEventListener('input', function(){
  // Test regex avec regex défini pour le nom et le prénom 
  let testPrenom = regex.test(this.value);
  if(testPrenom) {
    prenomValide = true; 
    this.nextElementSibling.innerHTML = "";
  }else{
    prenomValide = false; 
    this.nextElementSibling.innerHTML = "Des lettres et au moins 3 caractères !";
  }
});

// 2- Ecoute du nom
formulaire.lastName.addEventListener('input', function(){
  let testNom = regex.test(this.value);
  if(testNom) {
    nomValide = true; 
    this.nextElementSibling.innerHTML = "";
  }else{
    nomValide = false; 
    this.nextElementSibling.innerHTML = "Des lettres et au moins 3 caractères !";
  }
});

// 2- Ecoute de L'adresse
formulaire.address.addEventListener('input', function(){
  // Test regex avec regex défini pour la ville et l'adresse 
  let testAdresse = regexLocal.test(this.value);
  if(testAdresse) {
    adresseValide = true; 
    this.nextElementSibling.innerHTML = "";
  }else{
    adresseValide = false; 
    this.nextElementSibling.innerHTML = "Adresse non valide !";
  }
});

// 2- Ecoute de la ville
formulaire.city.addEventListener('input', function(){
  let testVille = regexLocal.test(this.value);
  if(testVille) {
    villeValide = true; 
    this.nextElementSibling.innerHTML = "";
  }else{
    villeValide = false; 
    this.nextElementSibling.innerHTML = "Ville non valide !";
  }
});

// 2- Ecoute de l'email
formulaire.email.addEventListener('input', function(){
  // Test regex défini pour l'email 
  let testEmail = regexEmail.test(this.value);
  if(testEmail) {
    emailValide = true; 
    this.nextElementSibling.innerHTML = "";
  }else{
    emailValide = false; 
    this.nextElementSibling.innerHTML = "Email non valide !";
  }
});

// Fonction pour vérifier que le remplissage du formulaire est conforme
function verifForm() {
  if (
    prenomValide &&
    nomValide &&
    adresseValide &&
    villeValide &&
    emailValide
  ) {
    return true;
  } else {
    alert('Le formulaire contient des erreurs.');
    return false;
  }
};

// Objet defini pour les données de commande  
var dataCommande = {
  contact: {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
    },
  products: []
}; 

//Commander!
const commander = document.getElementById('order');

commander.addEventListener("click", (event) => {
  event.preventDefault();
  if (verifForm()){    
    const post = {
      method: 'POST',  
      headers: {
        'content-Type': 'application/json'},
      body: JSON.stringify(dataCommande),
    }; 
    console.log(post);
    // Recherche OK orderId
    fetch("http://localhost:3000/api/products/order", post)       
      .then((response) => response.json())
      .then(data => {
      console.log(data); 
      // ok orderid bien récupéré !
      localStorage.setItem("orderId", data.orderId);
      document.location.href = `confirmation.html`;
    });   
  }else{
    alert("Veuillez corriger celui-ci");
  
}});





  
 






 




