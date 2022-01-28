
//----------------------------------------------------//
//   Récupération des produits dans le localstorage   //
//----------------------------------------------------//

// Récupération du panier du localStorage
let panier = JSON.parse(localStorage.getItem('panier'));  
console.log(panier);
var html = "";
var section = document.getElementById('cart__items'); // Variable 'section' pour aller chercher ID items
console.log(section);

// Panier vide retour Accueil
function retourAccueil() {
  if (panier == null) {
    alert(`Oups ! Oubli de votre KANAP ? retour accueil !`)
    location.href = 'index.html';
  } 
}
retourAccueil();


// Recherche dans le localstorage(panier), affiche les kanaps demandés aux positions Spécifiés du DOM  
panier.forEach(item => {
    fetch(`http://localhost:3000/api/products/`+ item.id)    
    .then(resp => resp.json())
    .then(kanap => {
        html = html + `
          <article class="cart__item" data-id="${kanap._id} data-color="${item.colors}">
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
    )
  }    
);

//ECOUTE DU FORMULAIRE
const formulaire = document.querySelector('.cart__order__form');
//Verif de la saisie
// 1- Ecoute du prenom
formulaire.firstName.addEventListener('input', function (){
  prenomValide(this);
});
var regexPrenomNom = /^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/;
const prenomValide = function (inputPrenom) {
  //Regex pour valider le prénom
  let prenomRegex = regexPrenomNom;
  // Test regex 
  let testPrenom = prenomRegex.test(inputPrenom.value);
  if(testPrenom) {
    inputPrenom.nextElementSibling.innerHTML = "";
    return true;
  }else{
    inputPrenom.nextElementSibling.innerHTML = "Des lettres et au moins 3 caractères !";
    return false;
  }
};
// 2- Ecoute du nom 
formulaire.lastName.addEventListener('input', function (){
  nomValide(this);
});
const nomValide = function (inputNom) {
  //Regex pour valider le nom
  let nomRegex = regexPrenomNom;
  // Test regex 
  let testNom = nomRegex.test(inputNom.value);
  if(testNom) {
    inputNom.nextElementSibling.innerHTML = "";
    return true;
  }else{
    inputNom.nextElementSibling.innerHTML = "Des lettres et au moins 3 caractères !";
    return false;
  }
};
// 3- Ecoute de l'adresse 
formulaire.address.addEventListener('input', function (){
  adresseValide(this);
});
var regexVilleAdresse = /^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]{3,}$/;
const adresseValide = function (inputAdresse) {
  //Regex pour valider l'adresse
  let adresseRegex = regexVilleAdresse;
  // Test regex 
  let testAdresse = adresseRegex.test(inputAdresse.value);
  if(testAdresse) {
    inputAdresse.nextElementSibling.innerHTML = "";
    return true;
  }else{
    inputAdresse.nextElementSibling.innerHTML = "Adresse non valide !";
    return false;
  }
};
// 4- Ecoute de la ville 
formulaire.city.addEventListener('input', function (){
  villeValide(this);
});

const villeValide = function (inputVille) {
  //Regex pour valider la ville
  let villeRegex = regexVilleAdresse;
  // Test regex 
  let testVille = villeRegex.test(inputVille.value);
  if(testVille) {
    inputVille.nextElementSibling.innerHTML = "";
    return true;
  }else{
    inputVille.nextElementSibling.innerHTML = "Ville non valide !";
    return false;
  }
};// 5- Ecoute de L'email
formulaire.email.addEventListener('input', function (){
  emailValide(this);
});
var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const emailValide = function (inputEmail) {
  //Regex pour valider l'email
  let emailRegex = regexEmail;
  // Test regex 
  let testEmail = emailRegex.test(inputEmail.value);
  if(testEmail) {
    inputEmail.nextElementSibling.innerHTML = "";
    return true;
  }else{
    inputEmail.nextElementSibling.innerHTML = "Email non valide !";
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
  if(
    prenomValide()) {
    return true;
  
  }else{
    alert("le formulaire comporte des erreurs");
  
}});


// Requête POST pour envoyer les données à lAPI et recup l'orderId
/*const post = {
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
  
  document.location.href = `confirmation.html?id= ${data.orderId}`;

});*/








//orderId: "92669ba0-7ada-11ec-aba8-351d7aa9ef6b"
//orderId: 'cc58c940-7adb-11ec-aba8-351d7aa9ef6b'




  
 






 




