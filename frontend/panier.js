(function () {
    getDataFromLocalStorage();

}());
function getDataFromLocalStorage(){

    let cart = JSON.parse(localStorage.getItem("cart"));
    
    let totalCart = 0;
    

    if (cart == null){
        const main = document.getElementById("main");
        main.innerHTML = `<h2>Votre Panier est vide</h1>`
        
    } else {
        cart.forEach( teddyCart => {

            function deleteItem(_id, color) {
                const cartUpdate = cart.filter(teddy => teddy._id !== _id || teddy.color !== color) ;
                localStorage.setItem("cart", JSON.stringify(cartUpdate));
                
                if (cartUpdate == 0 ){
                    localStorage.clear()

                } 

                    document.location.href = "panier.html"

            };
            

            fetch(`http://localhost:3000/api/teddies/${teddyCart._id}`)
            .then(function (httpBodyResponse){
                return httpBodyResponse.json()
            })
            .then(function(teddy){

                let totalPriceProduct = (teddy.price / 100) * teddyCart.quantity;
                totalCart += totalPriceProduct

                const totalPriceOrder = document.getElementById("total__price__order").textContent = `Total du panier: ${totalCart}€`;
                
                
                const templateElement = document.getElementById("productTemplate");
                const cloneTemplateElement = document.importNode(templateElement.content, true);

                cloneTemplateElement.getElementById("teddy__image").src = `${teddyCart.image}`;
                cloneTemplateElement.getElementById("teddy__name").textContent = `${teddyCart.name}`;
                cloneTemplateElement.getElementById("teddy__color").textContent = `Couleur: ${teddyCart.color}`;
                cloneTemplateElement.getElementById("teddy__quantity").textContent = `Quantité: ${teddyCart.quantity}`;
                cloneTemplateElement.getElementById("total__price__product").textContent = `Total: ${totalPriceProduct}€`;
                
                const deleteButton = cloneTemplateElement.getElementById("delete__order__button");
                deleteButton.onclick = function() {deleteItem(teddyCart._id, teddyCart.color)};
                console.log(teddyCart.color)
                

                const prodcutTemplate = document.getElementById("productTemplateDiv");
                prodcutTemplate.appendChild(cloneTemplateElement);          
                
            })
            .catch(function (error){
                error
            })

            });

            const confirmOrderButton = document.getElementById("form__contact__order__submit");
            const lastName = document.getElementById("lastname");
            const firstName = document.getElementById("firstname");
            const email = document.getElementById("email");
            const address = document.getElementById("address");
            const city = document.getElementById("city");
            
            confirmOrderButton.addEventListener("click", (event) => {
                event.preventDefault()

                const contact = {
                    lastName: lastName.value,
                    firstName: firstName.value,
                    email: email.value,
                    address: address.value,
                    city: city.value
                };
                
    
                const products = [];

                cart.forEach(productOrdered => {
                    products.push(productOrdered._id);
                });
    
                const dataOrder = {
                    contact,
                    products
                };
    
                const myInit = {
                    method: "POST",
                    body: JSON.stringify(dataOrder),
                    headers: {
                        "Content-Type": "application/json",
                    },
    
                };

    
                    fetch("http://localhost:3000/api/teddies/order", myInit)

                    .then(function (httpBodyResponse){

                        return httpBodyResponse.json()
                    })
                    .then(function (order){

                       const orderId = order.orderId
                       const finalPriceOrder = totalCart
                       
                       window.location.href = `confirm.html?order_number=${orderId}&order_price=${finalPriceOrder}`;
                    })
                    .catch(function (error){
                        error
                    })
                


            })
            

           
        
    }
    

}

