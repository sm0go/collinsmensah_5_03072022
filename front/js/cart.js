async function mainCart(){

  try { 
    // Panier recupéré du localStorage
    let panier = JSON.parse(localStorage.panier)
  
    let tabPrice = []
  
    // tableau d'Id de chaque Kanap du panier
    let arrayKanapId = []
  
    // Pour chaque Kanap (produit) du panier....
    for(i of Object.keys(panier)){
      // Définir kanapPanier en tant que produit  
      let kanapPanier = panier[i]
  
      // Récuperer les infos du produit
      let kanapFromId = await getKanapFromId(kanapPanier)
  
      // Concatener les infos du produit dans le panier, puis récuperer le prix total (selon la quantité)
      let price = panierInfo(kanapFromId, kanapPanier)
  
      // Stocker les prix dans le tableau
      tabPrice.push(price)
  
      // Permettre le changement de quantité du produit 
      changeQuantity(panier)
  
      // Permettre la suppression du produit
      deleteKanap(panier, kanapFromId)
  
      //Stocker les Id dans le tableau
      arrayKanapId.push(kanapPanier.id)
    }
    
    // Obtenir le prix et quantité de TOUS les produits
    total(panier, tabPrice)
  
    // Requête 'POST' du numéro de commande
    getForm(arrayKanapId, panier)

  } catch (err) {

  emptyPanier()
   
  }

  
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

function getForm(products, panier){

  // Variables

  let contact = {}

  let firstName = document.getElementById('firstName')
  let firstNameErrorMsg = document.getElementById('firstNameErrorMsg')
  let lastName = document.getElementById('lastName')
  let lastNameErrorMsg = document.getElementById('lastNameErrorMsg')
  let city = document.getElementById('city')
  let cityErrorMsg = document.getElementById('cityErrorMsg')
  let address = document.getElementById('address')
  let addressErrorMsg = document.getElementById('addressErrorMsg')
  let email = document.getElementById('email')
  let emailErrorMsg = document.getElementById('emailErrorMsg')
  
  // Verification des champs du formulaires. 

    firstName.addEventListener('change', (e) =>{
      let firstName = e.target.value
      let regex = /^[a-zA-ZÀ-ÿ -]{3,}$/    
      if (regex.test(firstName)) {
        contact.firstName = firstName
        firstNameErrorMsg.innerHTML = ''
      } else if (firstName == 0){
        console.log('Prénom : ' + regex.test(firstName))
        delete contact.firstName
        firstNameErrorMsg.innerHTML = 'Champ vide.'
      } else {
        delete contact.firstName
        console.log('Prénom : ' + regex.test(firstName))
        firstNameErrorMsg.innerHTML = 'Prénom inccorect.'
      }
    })

    lastName.addEventListener('change', (e) =>{
      let lastName = e.target.value
      let regex = /^[a-zA-ZÀ-ÿ -]{3,}$/      
      if (regex.test(lastName)) {
        contact.lastName = lastName
        lastNameErrorMsg.innerHTML = ''
      } else if (lastName == 0){
        console.log('Nom : ' + regex.test(lastName))
        delete contact.lastName
        lastNameErrorMsg.innerHTML = 'Champ vide.'
      } else {
        console.log('Nom : ' + regex.test(lastName))
        delete contact.lastName
        lastNameErrorMsg.innerHTML = 'Nom inccorect.'
      }
    })

    address.addEventListener('change', (e) =>{
      let address = e.target.value
      let regex = /^[0-9]{1,3}( *[a-zA-ZÀ-ÿ'-])+/
      if (regex.test(address)) {
        contact.address = address
        addressErrorMsg.innerHTML = ''
      } else if (address == 0){
        console.log('Addresse : ' + regex.test(address))
        delete contact.address
        addressErrorMsg.innerHTML = 'Champ vide.'
      } else {
        delete contact.address
        console.log('Addresse : ' + regex.test(address))
        addressErrorMsg.innerHTML = 'Addresse inccorect.'
      }
    })

    city.addEventListener('change', (e) =>{
      let city = e.target.value
      let regex = /^[a-zA-ZÀ-ÿ -]{3,}$/
      if (regex.test(city)) {
        contact.city = city
        cityErrorMsg.innerHTML = ''
      } else if (city == 0){
        console.log('Ville : ' + regex.test(city));
        delete contact.city
        cityErrorMsg.innerHTML = 'Champ vide.'
      } else {
        delete contact.city
        console.log('Ville : ' + regex.test(city));
        cityErrorMsg.innerHTML = 'Ville inccorect.'
      }
    })

    email.addEventListener('change', (e) =>{
      let email = e.target.value
      let regex = /[a-z0-9-_]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+/    
      if (regex.test(email)) {
        contact.email = email
        emailErrorMsg.innerHTML = ''
      } else if (email == 0){
        console.log('E-mail : ' + regex.test(email))
        delete contact.email
        emailErrorMsg.innerHTML = 'Champ vide.'
      } else {
        delete contact.email
        console.log('E-mail : ' + regex.test(email))
        emailErrorMsg.innerHTML = 'E-mail inccorect.'
      }
    })

    //Requêtes 'POST'

    document
      .getElementById('order')
      .addEventListener('click', (e) => {
        e.preventDefault()
        if(panier == 0){
          alert('Votre panier est vide.')
        } else if (panier.length >= 1) {
          if (Object.keys(contact).length == 5) {
            fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
              'Accept': 'application/json', 
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({products, contact}), 
            })
              .then(res => res.json())
              .then(data => {
                  window.location.href = `./confirmation.html?orderId=${data.orderId}`
              })
              .catch(error => alert(error))
          } else if (Object.keys(contact).length == 0) {
            console.log("Conditions non remplies pour l'envoi du formulaire");
            firstNameErrorMsg.innerHTML = 'Champ vide.'
            lastNameErrorMsg.innerHTML = 'Champ vide.'
            addressErrorMsg.innerHTML = 'Champ vide.'
            cityErrorMsg.innerHTML = 'Champ vide.'
            emailErrorMsg.innerHTML = 'Champ vide.'
          } else {
            console.log("Conditions non remplies pour l'envoi du formulaire");
          }
        } 
      })
}

function emptyPanier(){
  document
  .getElementById('order')
  .addEventListener('click', (e) => {
    e.preventDefault()
    alert('Votre panier est vide')
  })

console.log('panier vide');

document
  .getElementById('totalQuantity')
  .innerHTML = `0`

document
  .getElementById('totalPrice')
  .innerHTML = `0`
}

mainCart()