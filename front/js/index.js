/*****************************************/
/*Page index intégrer kanaps depuis l'API*/
/*****************************************/

const URL = 'http://localhost:3000/api/products';
var kanaps = "";
var section = document.getElementById('items'); // Variable 'section' pour aller chercher ID items
var html = "";

/***********************************/
/*          API request            */
/***********************************/
fetch(URL)                          // Va chercher l'url API, requete HTTP 
    .then(resp => resp.json())
    .then(function(data) {          // Ensuite renvoie la reponse converti en JSON
        kanaps = data;
        console.log(data[2].name);  // Essai console recuperation name ok dans le tableau
        kanaps.forEach((data => {
            html = html +               
            `<a href="./product.html?id=${data._id}">
                <article>                                 
                    <img src="${data.imageUrl}" alt="${data.altTxt}">     
                    <h3 class="productName">${data.name}</h3>
                    <p class="productDescription">${data.description}</p>
                </article>
            </a>`;
        section.innerHTML = html;})) // J'injecte un lien, une image html, un h3, un paragraphe 
    });
;
























