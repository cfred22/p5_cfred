
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

// Requête POST pour envoyer les données à lAPI et recup l'orderId
const post = {
  method: 'POST',  
  headers: {
    'content-Type': 'application/json',},
  body: JSON.stringify(dataCommande),
}; 
console.log(post);

// Recherche OK orderId
fetch("http://localhost:3000/api/products/order", post)       
  .then((response) => response.json())
  .then(id => {
  console.log(id);
});


//orderId: "92669ba0-7ada-11ec-aba8-351d7aa9ef6b"
//orderId: 'cc58c940-7adb-11ec-aba8-351d7aa9ef6b'




  
 




/*class formulaireCommande {
  constructor() {
    this.firstName = document.getElementById('firstName').value;
    this.lastName = document.getElementById('lastName').value;
    this.firstName = document.getElementById('address').value;
    this.lastName = document.getElementById('city').value;
    this.lastName = document.getElementById('email').value;
  }
}*/



 




