orderConfirm();
localStorage.clear();


function orderConfirm(){
    if (localStorage.length == 0){
        document.getElementById("main").innerHTML = `<p id="infos__order">Aucune commande en cours</p>`
    } else {
        const getParams = new URL(location.href).searchParams;
        const orderId = getParams.get("order_number");
        const orderPrice = getParams.get("order_price");
        document.getElementById("order__number").textContent = orderId;
        document.getElementById("order__price").textContent = orderPrice + " euros ";

    }

}


