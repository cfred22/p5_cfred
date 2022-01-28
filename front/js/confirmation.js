// Fonction de recuperation de l'orderId
function commandeOk () {
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get("orderId");
    const NumCommande = document.getElementById("orderId");
    NumCommande.innerText =localStorage.getItem("orderId");
    localStorage.clear();
}
commandeOk();   
