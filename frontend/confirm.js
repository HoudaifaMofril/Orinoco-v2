localStorage.clear();

const getParams = new URL(location.href).searchParams;
const orderId = getParams.get("order_number");
const orderPrice = getParams.get("order_price");

console.log(orderId)
console.log(orderPrice)

document.getElementById("order__number").textContent = orderId;
document.getElementById("order__price").textContent = orderPrice + " euros ";