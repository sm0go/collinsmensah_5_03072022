async function mainCart(){

  let panier = JSON.parse(localStorage.panier)
  let tabPrice = []
  for(i of Object.keys(panier)){
    let kanapPanier = panier[i]
    console.log(kanapPanier);
    let kanapFromId = await getKanapFromId(kanapPanier)
    let price = panierInfo(kanapFromId, kanapPanier)
    // panier.forEach(e => e.name = kanapFromId.name)
    tabPrice.push(price)
    changeQuantity(panier)
    console.log();
    deleteKanap(panier, kanapFromId)
  }

  total(panier, tabPrice)
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
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${kanapPanier.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${kanapPanier.id} ">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`

  return kanapFromId.price * kanapPanier.quantity
  
}

function total(panier, tabPrice){

  let sumQuantity = panier.reduce((total, num) => Number(total) + Number(num.quantity), 0)
  let sumPrice = tabPrice.reduce((total, num) => total + num, 0)

  document
    .getElementById('totalQuantity')
    .innerHTML = `${sumQuantity}`

    document
    .getElementById('totalPrice')
    .innerHTML = `${sumPrice}`
}

function changeQuantity(panier){
  
  let itemQuantity = document.getElementsByClassName('itemQuantity')
  
  for (let i = 0; i < itemQuantity.length; i++){
    let quantityButton = itemQuantity[i]
    quantityButton.addEventListener('change', (e) => {
      panier[i].quantity = e.target.value
      panier.push(panier[i])
      panier.pop()     
      localStorage.panier = JSON.stringify(panier)
      console.log(panier);
      alert('Votre panier a été modifié !')
    })
  }
  
}

function deleteKanap(panier, kanapFromId){

  let suppr = document.getElementsByClassName('deleteItem')

  for(let i = 0; i < suppr.length; i++){
    const deleteButton = suppr[i] 
    deleteButton.addEventListener('click', () => {
      console.log(i);
      panier.splice(i, 1)
      console.log(panier);
      localStorage.panier = JSON.stringify(panier)
      alert(`Votre ${kanapFromId.name} a bien été supprimé !`)
    })
  }
}

function getForm(){

 
  
  document
    .getElementById('firstName')
    .addEventListener('change', (e) =>{
      let firstName = e.target.value
      let regex = /^[a-zA-ZÀ-ÿ -]{3,}$/
      console.log(regex.test(firstName))
      if (regex.test(firstName)) {
        return firstName
      } else {
        document
          .getElementById('firstNameErrorMsg')
          .innerHTML = 'Prénom inccorect.'
      }
    })

  document
    .getElementById('lastName')
    .addEventListener('change', (e) =>{
      let lastName = e.target.value
      let regex = /^[a-zA-ZÀ-ÿ -]{3,}$/
      console.log(regex.test(lastName))
      if (regex.test(lastName)) {
        return lastName
      } else {
        document
          .getElementById('lastNameErrorMsg')
          .innerHTML = 'Nom inccorect.'
      }
    })

  document
    .getElementById('address')
    .addEventListener('change', (e) =>{
      let address = e.target.value
      let regex = /^[0-9]{2,3}( *[a-zA-ZÀ-ÿ'-])+/
      console.log(regex.test(address))
      if (regex.test(address)) {
        return address
      } else {
        document
          .getElementById('addressErrorMsg')
          .innerHTML = 'Address inccorect.'
      }
    })

  document
    .getElementById('city')
    .addEventListener('change', (e) =>{
      let city = e.target.value
      let regex = /^[a-zA-ZÀ-ÿ -]{3,}$/
      console.log(regex.test(city))
      if (regex.test(city)) {
        return city
      } else {
        document
          .getElementById('cityErrorMsg')
          .innerHTML = 'Ville inccorect.'
      }
    })

  document
    .getElementById('email')
    .addEventListener('change', (e) =>{
      let email = e.target.value
      let regex = /[a-z0-9-_]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+/
      console.log(regex.test(email))
      if (regex.test(email)) {
        return email
      } else {
        document
          .getElementById('emailErrorMsg')
          .innerHTML = 'E-mail inccorect.'
      }
    })

  document

      const formSubmit = document.getElementsByClassName('cart__order__form')
      formSubmit[0].addEventListener('submit', (e)=>{
        e.preventDefault()
        const load = new FormData(formSubmit[0])
        console.log([...load]);
        fetch('http://localhost:3000/api/products/order', {
          method: 'POST',
          headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(load), 
          })
            .then(res => res.json())
            .then(data => console.log(data))
          }) 


    
}

mainCart()