//-------------------------------------------------------//
//   Intégration page accueil kanap depuis l'API         //
//-------------------------------------------------------//

/*****************************************/
/*Page index intégrer kanaps depuis l'API*/
/*****************************************/

const URL = 'http://localhost:3000/api/products';
// Variable 'section' pour aller chercher ID items
var section = document.getElementById('items'); 
var html = "";

/***********************************/
/*          API request            */
/***********************************/
// Va chercher l'url API, requete HTTP 
fetch(URL)                          
    .then(resp => resp.json())      // Ensuite renvoie la reponse converti en JSON
    .then(function(kanaps) {          
        /*console.log(kanaps[2].name);  // Essai console recuperation name ok dans le tableau*/
        kanaps.map((kanaps => {
            html =                
            `<a href="./product.html?id=${kanaps._id}">
                <article>                                 
                    <img src="${kanaps.imageUrl}" alt="${kanaps.altTxt}">     
                    <h3 class="productName">${kanaps.name}</h3>
                    <p class="productDescription">${kanaps.description}</p>
                </article>
            </a>`;
        section.insertAdjacentHTML("beforeend", html);})) // J'injecte un lien, une image html, un h3, un paragraphe 
    })    
   
.catch(err => alert('Impossible de se connecter au serveur : ' + err));   

