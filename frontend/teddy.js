(async function(){

    const teddyId = getTeddyId()
    const teddy = await getTeddy(teddyId)
    hydrateTeddy(teddy)
    calculPrixPanier(teddy)
    ajoutLocalStorage(teddy)
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
};

function hydrateTeddy(teddy){

    const teddyColors = teddy.colors;
    teddyColors.forEach(color =>{
    const optionTag = document.createElement("option");
    document.getElementById("color__select").appendChild(optionTag)
    optionTag.innerHTML += `<option value=${color} selected >${color}</option>`  
    });
    document.getElementById("ours__nom").textContent = teddy.name
    document.getElementById("ours__image").src = teddy.imageUrl
    document.getElementById("ours__prix").textContent = teddy.price/100 + "€"
};

function calculPrixPanier(teddy){

    const priceTeddy = teddy.price;
    const quantityTeddy = document.getElementById("quantity");
    const totalPrice = document.getElementById("total__prix");
    quantityTeddy.addEventListener("change", (event)=> {
    totalPrice.textContent = `Total: ` + (priceTeddy * `${event.target.value}`)/100 + "€";
    })
};




function ajoutLocalStorage(teddy) {
    const buttonCart = document.getElementById("link__ajout__panier");

    buttonCart.addEventListener("click", (event) => {  

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart)
    const quantityTeddy = document.getElementById("quantity");
    const colorTeddyStorage = document.getElementById("color__select");

    const oldteddy = cart.find((item) => item._id == teddy._id && item.color == colorTeddyStorage.value);

    if (oldteddy != undefined) {
        oldteddy.quantity = parseInt(oldteddy.quantity) + parseInt(quantityTeddy.value);
    } 
    else {

        let cartObject = {
            _id: `${teddy._id}`,
            name: `${teddy.name}`, 
            quantity: `${quantityTeddy.value}`,
            color: `${colorTeddyStorage.value}`,
            image: `${teddy.imageUrl}`
        };
        cart.push(cartObject);

    }
    localStorage.setItem("cart", JSON.stringify(cart));
    event.preventDefault();
    window.location.href = `panier.html`
    

    });
     
};