async function mainCart(){

  let panier = JSON.parse(localStorage.panier)

  for(i of Object.keys(panier)){
    let kanapPanier = panier[i]
    let kanapFromId = await getKanapFromId(kanapPanier)
    console.log(kanapFromId);
    panierInfo(kanapFromId, kanapPanier)
  }
  // getForm()
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
        <p>${kanapPanier.color}</p>
        <p>${kanapFromId.price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${kanapPanier.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
}

// function getForm(){
//   document
//     .getElementById('firstName')
//     .addEventListener('change', () =>{
//     })
// }

mainCart()