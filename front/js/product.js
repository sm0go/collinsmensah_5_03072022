async function mainProduct(){
  const kanapId = getId()
  localStorage.id = kanapId
  const kanapItem = await getKanap(kanapId)
  var kanapColor = getColor(kanapItem)
  
  for([nameValue, value] of Object.entries(kanapItem)){
    kanapInfo(kanapItem)
  }

  getQuantity()
  let panier = savePanier()
  

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
  
  document
    .getElementById('colors')
    .addEventListener('change', (e) =>{
      var i = e.target.options[e.target.selectedIndex].text 
      if(i === "--SVP, choisissez une couleur --"){
        
      } else {
        localStorage.color = i
      }
    })
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

async function getQuantity(){

  document
    .getElementById('quantity')
    .addEventListener('change', () => {
      localStorage.quantity = document.getElementById('quantity').value
    })
}

async function savePanier(){
  let panier = localStorage.panier

  document
  .getElementById('addToCart')
  .addEventListener('click', () =>{
    
    let tabKanap = 
    {
      id: localStorage.id,
      quantity: localStorage.quantity,
      color: localStorage.color
    }

      if(panier == null){
        panier = []
        panier.push(tabKanap)
        localStorage.panier = JSON.stringify(panier)
        console.log(panier)    
        
      } else if (panier != null){
        let objetPanier = JSON.parse(localStorage.panier)
        for(let i = 0; i < panier.length; i++){
          let k = panier[i]

          if(tabKanap.id != i.id){

            console.log(i.id, "Kanap");
          }
        }

        // for(i of panier){
        //   if(tabKanap.color == i.color && tabKanap.id == i.id){
        //     let sums = Number(i.quantity) + Number(tabKanap.quantity)
        //     return(
        //       localStorage.quantity = String(sums),
        //       tabKanap.quantity = localStorage.quantity,
        //       console.log('addition quantité : ', sums),
        //       localStorage.panier = JSON.stringify(x),
        //       x = JSON.parse(localStorage.panier)
        //     )
        //   }
        // }
      }
      })
  console.log(localStorage.panier);
  
}

mainProduct()