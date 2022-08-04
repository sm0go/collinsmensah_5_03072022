function confirm(){
  let panier = JSON.parse(localStorage.panier)
  let orderId = getOrderId()
  orderIdDisplay(orderId)
}

function getOrderId (){
  return new URL(location.href).searchParams.get("orderId")
}

function orderIdDisplay(orderId){
  console.log('ID de la commande : ' + orderId)
  document
    .getElementById('orderId')
    .innerHTML = `${orderId}`

  localStorage.clear()
}

confirm()