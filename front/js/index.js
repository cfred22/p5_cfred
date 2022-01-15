/*****************************************/
/*Page index intégrer kanaps depuis l'API*/
/*****************************************/

const URL = 'http://localhost:3000/api/products';
var section = document.getElementById('items'); // Variable 'section' pour aller chercher ID items
var html = "";

/***********************************/
/*          API request            */
/***********************************/
fetch(URL)                          // Va chercher l'url API, requete HTTP 
    .then(resp => resp.json())      // Ensuite renvoie la reponse converti en JSON
    .then(function(kanaps) {          
        console.log(kanaps[2].name);  // Essai console recuperation name ok dans le tableau
        kanaps.forEach((kanaps => {
            html = html +               
            `<a href="./product.html?id=${kanaps._id}">
                <article>                                 
                    <img src="${kanaps.imageUrl}" alt="${kanaps.altTxt}">     
                    <h3 class="productName">${kanaps.name}</h3>
                    <p class="productDescription">${kanaps.description}</p>
                </article>
            </a>`;
        section.innerHTML = html;})) // J'injecte un lien, une image html, un h3, un paragraphe 
    });
;
























