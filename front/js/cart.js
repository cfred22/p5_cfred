
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

retourAccueil();


// Recherche dans le localstorage(panier), affiche les kanaps demandés aux positions Spécifiés du DOM  
panier.forEach(item => {
  fetch(`http://localhost:3000/api/products/`+ item.id)    
    .then(resp => resp.json())
    .then(kanap => {
      affichageProduit(item, kanap);        
      updateQuantity();
    })
  }  
);

// Affichage produits
function affichageProduit(item, kanap) {
  html = html + `
    <article class="cart__item" data-id="${kanap._id}" data-color="${item.colors}">
      <div class="cart__item__img">
          <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
      </div>
      <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${kanap.name}</h2>
              <p>${item.colors}</p>
              <p>${kanap.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="${kanap.delete}">Supprimer</p>
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
  const itemQuantity = document.querySelectorAll('.itemQuantity');
  for (let index = 0; index < itemQuantity.length; index++) {
    itemQuantity[index].addEventListener('change', (event) => {
      event.preventDefault();
      const kanapNewQuantity = event.target.value;
      const newPanier = {
        id: panier[index].id,
        colors: panier[index].colors,
        quantity: kanapNewQuantity,
      };
      panier[index] = newPanier;
      localStorage.clear();
      localStorage.setItem('panier',JSON.stringify(panier)
      );
      
    });
  }
}

// Changement quantité produits page panier par utilisateur en direct
/*function updateQuantity() {
  // Cible la quantité à modifier
  var kanapQuantityTab = document.querySelectorAll(".itemQuantity");
  let newQuantity;
  kanapQuantityTab.forEach(kanap => {
    
    // recuperation de l'id du parent article
    const itemClosest = kanap.closest("article");    
    var id = itemClosest.dataset.id;
    console.log(id);

    // Récupération de la couleur du parent article
    var color = itemClosest.dataset.color;
    console.log(color);

    kanap.addEventListener("change", (event) => {
      newQuantity = event.target.value;
      console.log(newQuantity);

      let panier = getPanier();

      panier.forEach(kanap => {        
        if(newQuantity > 0 && newQuantity <= 100 && colors !== undefined && colors != "none")  {
          console.log(newQuantity);
          const urlSearchParams = new URLSearchParams(window.location.search);
          const params = Object.fromEntries(urlSearchParams.entries());  // recupère l'id dans l'URL
          //console.log(params);   
          kanap.id = params.id;
          kanap.quantity = newQuantity;
          kanap.colors = colors;
          // Ajout Panier -> voir fonction (Ajouter des produits !)  
          ajoutPanier(kanap);
        }   
      });
    savePanier(panier);
  }); 
})
};
*/

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
  } else {
      return JSON.parse(panier);
  };
}

// Serialisation qui transforme une donnée complexe en chaine de caractère.  
function savePanier(panier) {                               
  localStorage.setItem('panier', JSON.stringify(panier)); 
}



/*let totalPrix = 0;
for(let i =0; i < kanapQuantity.clientHeight; ++i) {
  totalPrix += panier.price++;
} */

 //Supprimer un produit kanap
function supprimerKanap() {
  var supprKanap = document.querySelector(".deletItem")
  for (let index = 0; index < supprKanap.length; index++) {


    supprKanap[index].addEventListener("click", function (event) {
      panier.splice(i, 1);
      localStorage.setItem("kanap", JSON.stringify(panier));
      alert("Votre Kanap a été supprimé")
    })
  }
}
supprimerKanap();



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
    VilleValide = false; 
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
    this.nextElementSibling.innerHTML = "Ville non valide !";
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
    alert("le formulaire comporte des erreurs");
  
}});





  
 






 




