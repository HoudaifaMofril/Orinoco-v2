(async function(){
    const teddyId = getTeddyId()
    const teddy = await getTeddy(teddyId)
    hydrateTeddy(teddy)
    calculPrixPanier(teddy)
})()

function getTeddyId(){
    return new URL(location.href).searchParams.get("id")
}

function getTeddy(teddyId){
    return fetch(`http://localhost:3000/api/teddies/${teddyId}`)
        .then(function (httpBodyResponse){
            return httpBodyResponse.json()
        })
        .then(function(teddies){
            
           return teddies
        })
        .catch(function (error){
            return error
        })
}

function hydrateTeddy(teddy){


    const teddyColors = teddy.colors;

    teddyColors.forEach(color =>{
        document.getElementById("color__select").innerHTML += `<option value=${color} >${color}</option>`
    });


    document.getElementById("ours__nom").textContent = teddy.name
    document.getElementById("ours__image").src = teddy.imageUrl
    document.getElementById("ours__prix").textContent = teddy.price/100 + "€"
    
}

function calculPrixPanier(teddy){

    const priceTeddy = teddy.price;
    console.log(priceTeddy)


    const quantityTeddy = document.getElementById("quantity");
    const totalPrice = document.getElementById("total__prix");

    quantityTeddy.addEventListener("change", (event)=> {
        totalPrice.textContent = `Total: ` + (priceTeddy * `${event.target.value}`)/100 + "€";
    })
}

function ajoutLocalStorage() {

};
