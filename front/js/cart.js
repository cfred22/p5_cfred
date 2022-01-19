
//----------------------------------------------------//
//   Récupération des produits dans le localstorage   //
//----------------------------------------------------//

// Récupération du panier du localStorage
let panier = JSON.parse(localStorage.getItem('panier'));  
//console.log(panier);
var html = "";
var section = document.getElementById('cart__items'); // Variable 'section' pour aller chercher ID items
console.log(section);







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

/*html =
        `<p>Total (<span id=${kanap.totalqantity}><!-- 2 --></span> articles) :
         <span id="totalPrice"><!-- 84,00 --></span> €</p>`
        document.getElementsByClassName('#cart__price').innerHTML = html;*/