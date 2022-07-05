async function mainProduct(){
  const kanapId = getId()
  const kanapItem = await getKanap(kanapId)
  const kanapColor = getColor(kanapItem)

  for([nameValue, value] of Object.entries(kanapItem)){
    // console.log(nameValue, value);
    var color = kanapItem.colors
    kanapInfo(kanapItem)
  }
  

} 

function getId() {
  return new URL(location.href).searchParams.get("id")
}

function getKanap(kanapId) {
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
    var colors = kanapItem.colors[i]
    document
      .getElementById('colors')
      .innerHTML += `
      <option value="${i}">${colors}</option>`
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

mainProduct()