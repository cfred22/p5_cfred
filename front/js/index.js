const url = 'http://localhost:3000/api/products';
var kanaps = "";
let section = document.getElementById('items'); // variable 'section' pour aller chercher ID items
var html = "";

//API request
fetch(url) // va chercher l'url API, requete HTTP 
    .then(resp => resp.json())
    .then(function(data) {    // ensuite renvoie la reponse converti en JSON
        kanaps = data;
        console.log(data[2].name);  // essai console recuperation name ok dans le tableau
        kanaps.forEach((data => {
            html = html +
            `<a href="./product.html?id=${data._id}">
                <article>
                    <img src="${data.imageUrl}" alt="${data.altTxt}">     
                    <h3 class="productName">${data.name}</h3>
                    <p class="productDescription">${data.description}</p>
                </article>
            </a>`;
        section.innerHTML = html;}))
        
    });
;








//section.innerHTML = "<img src='" + data[2].imageUrl + "'>"; // j'injecte une image html (exemple) 












