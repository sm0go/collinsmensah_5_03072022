async function mainCart(){

  let panier = JSON.parse(localStorage.panier)

  for(i of Object.keys(panier)){
    let kanapPanier = panier[i]
    console.log(kanapPanier);
    let kanapFromId = await getKanapFromId(kanapPanier)
    panierInfo(kanapFromId, kanapPanier)
    changeQuantity()
  }

  total()
  deleteKanap(panier)
  getForm()
}

async function getKanapFromId(info){
  return fetch(`http://localhost:3000/api/products/${info.id}`)
  .then(res => {
    if (res.ok){
      return res.json()
    }
  })
  .then(data => data)
  .catch(err => alert(err))
}

function panierInfo(kanapFromId, kanapPanier){ 

  document
    .getElementById('cart__items')
    .innerHTML += `
    <article class="cart__item" data-id="${kanapPanier.id}" data-color="${kanapPanier.color}">
    <div class="cart__item__img">
      <img src="${kanapFromId.imageUrl}" alt="${kanapFromId.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${kanapFromId.name}</h2>
        <p>Color : ${kanapPanier.color}</p>
        <p>${kanapFromId.price * kanapPanier.quantity} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" data-id="${kanapPanier.id} " data-color="${kanapPanier.color} " min="1" max="100" value="${kanapPanier.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${kanapPanier.id} ">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
}

function total(){
  document
    .getElementById('totalQuantity')
    .innerHTML = ``

    document
    .getElementById('totalPrice')
    .innerHTML = ``
}

function changeQuantity(){
  let x = document.getElementsByClassName('itemQuantity')

  x[0].addEventListener('change', () => {

  })

}

function deleteKanap(panier){

  let suppr = document.getElementsByClassName('deleteItem')
  let p = panier

  for(let i = 0; i < suppr.length; i++){
    const deleteButton = suppr[i] 
    // console.log(i);
    deleteButton.addEventListener('click', () => {
      for (i of Object.keys(panier)) {
        
      }
      const find = i.find(e => e == Object.keys(panier))
    })
  }
}

function getForm(){
  document
    .getElementById('firstName')
    .addEventListener('change', (e) =>{
    })
    document
    .getElementById('lastName')
    .addEventListener('change', (e) =>{

    })
    document
    .getElementById('address')
    .addEventListener('change', (e) =>{

    })
    document
    .getElementById('city')
    .addEventListener('change', (e) =>{
    })
    document
    .getElementById('email')
    .addEventListener('change', (e) =>{
      let value = e.target.value
      console.log(value);
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
    })
}

mainCart()