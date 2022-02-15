// Fonction de recuperation de l'orderId
function commandeOk() {
    if (localStorage.getItem("orderId") == null) {
        document.location.href = `index.html`;
    }
    const NumCommande = document.getElementById("orderId");
    NumCommande.innerText =localStorage.getItem("orderId");
    localStorage.clear();
}
commandeOk();   
