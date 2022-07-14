import './style.css'

type StoreItem ={
  id: number,
  type: string,
  name: string,
  image: string,
  price: number,
  discountedPrice?: number,
  dateEntered: string,
  stock: number
}


type Store = {
 store:StoreItem []
 typeFilters: string[]
 selectedFilter: string
 selectedItem: null | StoreItem 
 //search: string
}


const state:Store = {
  store: [],
  typeFilters: ['Girls', 'Guys', 'Sale'],
  selectedFilter: 'Home',
  selectedItem: null,
 // search: ''
 //user: null
}



function getItemsToDisplay () {
  let itemsToDisplay = state.store

  if(state.selectedFilter === 'Girls') {
    itemsToDisplay = itemsToDisplay.filter(item => item.type === 'Girls')
  }

  if (state.selectedFilter === 'Guys') {
    itemsToDisplay = itemsToDisplay.filter(item => item.type === 'Guys')
  }

  if (state.selectedFilter === 'Sale') {
    itemsToDisplay = itemsToDisplay.filter(
      item => item.discountedPrice !== undefined
    )
  }

  return itemsToDisplay
}


function getStoreItems() {
 return fetch ('http://localhost:3005/store') .then (resp => resp.json())
}


function isItemNew(product:StoreItem) {
  const daysToConsider = 11

  const second = 1000
  const minute = second * 60
  const hour = minute * 60
  const day = hour * 24

  const msForTenDaysAgo = Date.now() - day * daysToConsider

  const msForProductDate = Date.parse(product.dateEntered)

  return msForProductDate > msForTenDaysAgo
}




function renderHeader() {
  const headerEl =document.createElement('header')

  const h1El = document.createElement('h1')
  h1El.textContent = 'HOLLIXTON'
  h1El.addEventListener('click', function () {
    state.selectedFilter = 'Home'
    state.selectedItem = null
    render()
  })

  const nav1El = document.createElement('nav')
  nav1El.className = 'header-left'

  const leftListEl = document.createElement('ul')
  leftListEl.className = 'header-left-list'

  for (const filter of state.typeFilters) {

  const leftListItemsEl = document.createElement('li')
  leftListItemsEl.className = 'header-left-list-item'
  const leftLinksEl = document.createElement('a')
  leftLinksEl.href = filter
  leftLinksEl.className = 'header-left-link'
  leftLinksEl.textContent = filter
  leftLinksEl.addEventListener('click', function () {
    state.selectedFilter = filter
    state.selectedItem = null
    render()
  })

  leftListItemsEl.append(leftLinksEl)
  leftListEl.append(leftListItemsEl)
}

nav1El.append(leftListEl)



const nav2El = document.createElement('nav')
nav2El.className = 'header-right'

const rightListEl = document.createElement('ul')
rightListEl.className = 'header-right-list'



const searchEl = document.createElement('li')
searchEl.className = 'header-right-list-item'
const searchButtonEl = document.createElement('button')
searchButtonEl.textContent = '🔍'

searchEl.append(searchButtonEl)

const userEl = document.createElement('li')
userEl.className = 'header-right-list-item'
const userButtonEl = document.createElement('button')
userButtonEl.textContent = '🚹'

userEl.append(userButtonEl)


const shoppingBagEl = document.createElement('li')
shoppingBagEl.className = 'header-right-list-item'
const shoppingBagButtonEl = document.createElement('button')
shoppingBagButtonEl.textContent = '👜'

shoppingBagEl.append(shoppingBagButtonEl)

rightListEl.append(searchEl, userEl, shoppingBagEl)
nav2El.append(rightListEl)

nav2El.append(rightListEl)


headerEl.append(h1El, nav1El, nav2El)

document.body.append(headerEl)
  
}



function renderMain() {
  const mainEl = document.createElement('main')

  if (state.selectedItem !== null) {

    const divEl = document.createElement('div')
    divEl.className = 'product-details'

    const imgEl = document.createElement('img')
    imgEl.className = 'product-details_image'
    imgEl.src = state.selectedItem.image

    const titleEl = document.createElement('h2')
    titleEl.className = 'product-details_title'
    titleEl.textContent = state.selectedItem.name

    const addToBagBtn = document.createElement('button')
    addToBagBtn.className = 'product-details_add-to-bag'
    addToBagBtn.textContent = 'ADD TO BAG'
    addToBagBtn.addEventListener('click', function() {
      state.selectedItem = null
      render()
    })

    divEl.append(imgEl, titleEl, addToBagBtn)
    mainEl.append(divEl)

  } else {

    const h2El = document.createElement('h2')
    h2El.textContent = "Home"
    h2El.className = "main-title"

    const productList = document.createElement('ul')
    productList.className = "product-list"


for (const product of state.store) {
  const productItem = document.createElement('li')
  productItem.setAttribute('class', 'product-item')

  productItem.addEventListener('click', function() {
    state.selectedItem = product
    render()
  })

  const imageEl = document.createElement('img')
  imageEl.className = "product-item-image"
  imageEl.src = product.image
  imageEl.alt = product.name

  const titleEl = document.createElement('h3')
  titleEl.className = 'product-item-title'
  titleEl.textContent = product.name

  const priceEl = document.createElement('p')
  priceEl.className = 'product-item-price'

  const fullPriceEl = document.createElement('span')
  fullPriceEl.className = 'product-item-full-price'
  fullPriceEl.textContent = `£${product.price}`

  priceEl.append(fullPriceEl)


  if(product.discountedPrice){

    fullPriceEl.classList.add('discounted')


  const discountedPriceEl = document.createElement('span')
  discountedPriceEl.className = 'product-item-discount'
  discountedPriceEl.textContent = `£${product.discountedPrice}`
  priceEl.append(discountedPriceEl)
  }


  productItem.append(imageEl, titleEl, priceEl)

if(isItemNew(product)) {

  const newItemEl = document.createElement('span')
  newItemEl.className = 'product-item-new'
  newItemEl.textContent = 'NEW!'
  productItem.append(newItemEl)

}

  productList.append(productItem)
}
  mainEl.append(h2El, productList)
}

  document.body.append(mainEl)
}

/*
<footer>
      <h2>Hollixton</h2>
      <div>
        <img />
        <span>United Kingdom</span>
      </div>
    </footer>
*/

function renderFooter() {
  const footerEl = document.createElement('footer')

  const logoEl = document.createElement('h2')
  logoEl.textContent = 'Hollixton'

  const spanEl = document.createElement('span')
  spanEl.textContent = 'United Kingdom'

  footerEl.append(logoEl, spanEl)
      
  document.body.append(footerEl)
}



function render() {
  document.body.innerHTML = ''

  renderHeader()
  renderMain()
  renderFooter()
}

render()

getStoreItems() .then(function(store){
  state.store = store 
  render()
})
