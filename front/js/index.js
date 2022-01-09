const url = 'http://localhost:3000/api/products';
let kanaps = "()";
let section = document.getElementById('items'); // variable 'section' pour aller chercher ID items

//API request
fetch(url) // va chercher l'url API, 
    .then(resp => resp.json())
    .then(function(data) {    // ensuite renvoie la reponse converti en JSON
        kanaps = data;
        console.log(data[2].name);  // essai console recuperation name ok dans le tableau
        section.innerHTML = "<img src='" + data[2].imageUrl + "'>"; // j'injecte une image html (exemple) 
    });



 

    





















