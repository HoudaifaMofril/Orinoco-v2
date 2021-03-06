(async function () {
    const teddies = await getTeddies();

    for (teddy of teddies){
        displayTeddies(teddy);
    }

}());

function getTeddies() {
    return fetch("http://localhost:3000/api/teddies")
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

function displayTeddies() {
    const templateElt = document.getElementById("template__element")
    const cloneElt = document.importNode(templateElt.content, true);

    cloneElt.getElementById("ours__nom").textContent = teddy.name
    cloneElt.getElementById("ours__image").src = teddy.imageUrl
    cloneElt.getElementById("ours__prix").textContent = teddy.price/100 + "€"
    cloneElt.getElementById("ours__link").href += `?id=${teddy._id}`

    document.getElementById("main").appendChild(cloneElt)



}