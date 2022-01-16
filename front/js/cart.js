
/**************/
/*Page PANIER */
/**************/

let panier = JSON.parse(localStorage.getItem('panier'));  
// Variable 'section' pour aller chercher ID items
console.log(panier);
var section = document.getElementById('cart__items'); 


panier.forEach(id => {
  fetch(`http://localhost:3000/api/products/` + id)
    .then(response => response.json())
    .then(kanap => {  
        html = 
        `<article class="cart__item" data-id="${kanap._id} data-color="${kanap.colors}">
            <div class="cart__item__img">
                <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
            </div>
            <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${kanap.name}</h2>
                    <p>Vert</p>
                    <p>${kanap.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${kanap.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="${kanap.delete}">Supprimer</p>
                    </div>
                  </div>
                </div>
        <article>`; 
        section.innerHTML = html;

        /*html =
        `<p>Total (<span id=${kanap.totalqantity}><!-- 2 --></span> articles) :
         <span id="totalPrice"><!-- 84,00 --></span> €</p>`
        document.getElementsByClassName('#cart__price').innerHTML = html;*/
    
    })
    
})