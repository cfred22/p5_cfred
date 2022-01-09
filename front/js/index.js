const url = 'http://localhost:3000/api/products';
let kanaps;
let section = document.getElementById('items');

//API request
fetch(url) 
    .then(resp => resp.json())
    .then(function(data) {
        kanaps = data;
        console.log(data[2].name);
        section.innerHTML = "<img src='" + data[2].imageUrl + "'>";
    });
    


 

    



















/*var html=""; 



//API request
const fetchProducts = async() => {
    products = await fetch(url)    
        .then(res => res.json());
        console.log(products);
};
items = fetchProducts();

items.forEach(item => {
    html = html + '<a href="">'+ item.name +'</a>';
});

document.getElementById('items').innerHTML = `<a href="./product.html?id=()</a>`;

*/


