async function main() {
  const kanap = await api() 
  console.log(kanap);
  for(article of kanap){
    kanapDisplay(article)
  }
}

function api() {
  return fetch('http://localhost:3000/api/products')
  .then(res => {
    if (res.ok){
      return res.json()
    }
  })
  .then(data => data)
  .catch(err => alert(err))
}

function kanapDisplay(article) {
document
  .getElementById('items')
  .innerHTML += `
  <a href="./product.html?id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`
}

main()
