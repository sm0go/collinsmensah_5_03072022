async function mainProduct(){
  const kanapId = getId()
  const kanapItem = await getKanap(kanapId)
  var kanapColor = getColor(kanapItem)
  
  for([nameValue, value] of Object.entries(kanapItem)){
    kanapInfo(kanapItem)
  }

  savePanier(kanapId)
  
} 

function getId() {
  return new URL(location.href).searchParams.get("id")
}

async function getKanap(kanapId) {
  return fetch(`http://localhost:3000/api/products/${kanapId}`)
  .then(res => {
    if (res.ok){
      return res.json()
    }
  })
  .then(data => data)
  .catch(err => alert(err))
}

function getColor(kanapItem){
  for([i] of Object.keys(kanapItem.colors)){
    var color = kanapItem.colors[i]
    document
      .getElementById('colors')
      .innerHTML += `
      <option value="${i}">${color}</option>`
  }
}

function kanapInfo(kanapItem){

  const image = document.getElementsByClassName('item__img')
  image[0].innerHTML = `<img src="${kanapItem.imageUrl}" alt="${kanapItem.altTxt}">`
    
  document
    .getElementById('title')
    .innerHTML = `${kanapItem.name}`
  
  document
    .getElementById('price')
    .innerHTML = `${kanapItem.price}`

  document
    .getElementById('description')
    .innerHTML = `${kanapItem.description}`

}

async function savePanier(kanapId){
  
  let panier = localStorage.panier
  const colors = document.getElementById('colors')
  
  document
  .getElementById('addToCart')
  .addEventListener('click', () =>{
    let id = kanapId
    let color = colors.options[colors.selectedIndex].text
    let quantity = document.getElementById('quantity').value

    let tabKanap = 
    {
      id: id, 
      quantity: quantity, 
      color: color
    }
    
      if(color === "--SVP, choisissez une couleur --"){
        alert('SVP, choisissez une couleur')
      } else if (quantity == 0) {
        alert('SVP, Selectionner une quantité')
      } else {
        if(panier == null){
          tabPanier = []
          tabPanier.push(tabKanap)
          localStorage.panier = JSON.stringify(tabPanier)
          console.log(tabPanier)    
        } else if (panier !== null) {
          let objetPanier = JSON.parse(localStorage.panier)
          console.log('objetPanier', objetPanier)
          const result = objetPanier.filter(item => item.id === tabKanap.id); // filtre sur l'id du produit
          if(result.length === 0) { // Si l'id n'existe pas dans le tableau de filtre
            // Ajout du produit dans localstorage
            objetPanier.push(tabKanap) 
            localStorage.panier = JSON.stringify(objetPanier)
          } else {  // Sinon filter sur la coleur   
          let res = result.filter(item => item.color === tabKanap.color);
          console.log('res', res)
            if (res.length === 0){ // Si color n'existe pas
              // Ajout dans localStorage
              objetPanier.push(tabKanap)
              localStorage.panier = JSON.stringify(objetPanier)
            } else {
              // Recuperer la quantité
              let quantity =  parseInt(res[0].quantity) + parseInt(tabKanap.quantity)
              res[0].quantity = String(quantity)
              tabKanap.quantity = res[0].quantity
              objetPanier.push(tabKanap)
              objetPanier.pop()
              localStorage.panier = JSON.stringify(objetPanier)
              console.log('result', res)
            }
          }
        }
      }  
      })
}

mainProduct()