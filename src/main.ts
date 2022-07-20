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
 searchItem: string
 typeFilters: string[]
 selectedFilter: string
 selectedItem: null | StoreItem 
 search: string
 user: User | null
 modal: string
 cart: StoreItem[]
 total: number
}


type User = {
    firstName: string,
    lastName: string,
    id: string,
    password: string | number,
    bag: []
  }




const state:Store = {
  store: [],
  searchItem: "",
  typeFilters: ['Girls', 'Guys', 'Sale'],
  selectedFilter: 'Home',
  selectedItem: null,
  search: '',
  user: null,
  modal: '',
  cart: [],
  total: 0
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

  if (state.search !== '') {

  }

  return itemsToDisplay
}


function getStoreItems() {
 return fetch ('http://localhost:3005/store') .then (resp => resp.json())
}


function getItemsBySearch() {

  let filterItems = state.store.filter(item => {
      return item.name.toLowerCase().includes(state.searchItem.toLowerCase())
  })
  return filterItems
}



function signIn (email:string, password:any) {
  return fetch(`http://localhost:3005/users/${email}`)
  .then (function (resp) {
    return resp.json()
  })

  .then(function (user) {
    if(user.password === password) {
      alert('Welcome!')
      state.user = user
      render()

    }else {
      alert('Wrong email or password! Please try again!')
    }
  })

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
    getItemsToDisplay()
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
  leftLinksEl.href = '#'
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

const liEl = document.createElement('li')

const userButton = document.createElement('button')
userButton.textContent = '🚹'
userButton.addEventListener('click', function(){
  state.modal = 'user'
  render()

}) 



liEl.append(userButton)
rightListEl.append(liEl)
nav2El.append(rightListEl)



// const searchEl = document.createElement('li')
// searchEl.className = 'header-right-list-item'
// const searchButtonEl = document.createElement('button')
// searchButtonEl.textContent = '🔍'

// searchEl.append(searchButtonEl)

// const userEl = document.createElement('li')
// userEl.className = 'header-right-list-item'
// const userButtonEl = document.createElement('button')
// userButtonEl.textContent = '🚹'

// userEl.append(userButtonEl)


// const shoppingBagEl = document.createElement('li')
// shoppingBagEl.className = 'header-right-list-item'
// const shoppingBagButtonEl = document.createElement('button')
// shoppingBagButtonEl.textContent = '👜'

// shoppingBagEl.append(shoppingBagButtonEl)

// rightListEl.append(searchEl, userEl, shoppingBagEl)
// nav2El.append(rightListEl)

// nav2El.append(rightListEl)


headerEl.append(h1El, nav1El, nav2El)

document.body.append(headerEl)
  
}


function renderProductItem(product:StoreItem, productList:any) {
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


function renderItemDetails(mainEl:HTMLElement) {
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
}


function renderProductList(mainEl:HTMLElement) {
  const h2El = document.createElement('h2')
  h2El.textContent = state.selectedFilter
  h2El.className = "main-title"

  const productList = document.createElement('ul')
  productList.className = "product-list"

  for (const product of getItemsToDisplay()){
    renderProductItem(product, productList)
  }

  mainEl.append(h2El, productList)
  

}


function renderMain() {
  const mainEl = document.createElement('main')

  if (state.selectedItem !== null){

    renderItemDetails(mainEl)

  } else {
  
    renderProductList(mainEl)
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




function renderUserModal() {
  const  wrapperEl = document.createElement('div')
  wrapperEl.className = 'modal-wrapper'

  const modalEl = document.createElement('div')
  modalEl.className = 'modal'

  let closeButton = document.createElement('button')
    closeButton.textContent = 'X'
    closeButton.className = 'modal-close-button'
    closeButton.addEventListener('click', function () {
      state.modal = ''
      render()
    })

  const formEl = document.createElement('form')
  formEl.className = 'sign-in-form'
  formEl.addEventListener('submit', function(event){
    event.preventDefault()

    signIn(emailInput.value, passwordInput.value)

    state.modal = ''
    render()
  })

  

  const emailInput = document.createElement('input')
  emailInput.setAttribute('placeholder', 'Enter your email ...')
  emailInput.setAttribute('name', 'email')
  emailInput.setAttribute('type', 'email')
  emailInput.setAttribute('required', 'true')

  const passwordInput = document.createElement('input')
  passwordInput.setAttribute('placeholder', 'Enter your password ...')
  passwordInput.setAttribute('name', 'password')
  passwordInput.setAttribute('type', 'password')
  passwordInput.setAttribute('required', 'true')

  const signInButton = document.createElement('button')
  signInButton.textContent = 'SIGN IN'

  formEl.append(emailInput, passwordInput, signInButton)
  modalEl.append(formEl)
  wrapperEl.append(modalEl)
  document.body.append(wrapperEl)
}


function renderBagModal () {
  let mainEl = document.querySelector('main')

  let wrapperEl = document.createElement('div')
  wrapperEl.className = 'modal-wrapper'

  let containerEl = document.createElement('div')
  containerEl.className = 'modal-container'

  let closeButton = document.createElement('button')
  closeButton.textContent = 'X'
  closeButton.className = 'modal-close-button'
  closeButton.addEventListener('click', function () {
    state.modal = ''
    render()
  })

  let ItemBag = document.createElement('h2')
  ItemBag.textContent = 'Bag'

  let items = document.createElement('ul')
  items.className = 'item-bag'

  for(let item of state.cart){
      let itemEl = document.createElement('li')
      itemEl.className = 'item-bag-item'

      let itemImage = document.createElement('img')
      itemImage.src = item.image
      itemImage.className = 'item-image'
      itemImage.width = 100

      let itemDiv = document.createElement('div')
      itemDiv.className = 'item-div'

      let itemDiv2 = document.createElement('div')
      itemDiv2.className = 'item-div2'

      let itemName = document.createElement('h3')
      itemName.textContent = item.name
      itemName.className = 'item-name'


      if(item.discountedPrice){
          let itemPrice = document.createElement('h4')
          itemPrice.textContent = `$${item.price}`
          itemPrice.className = 'item-price'

          let itemDiscount = document.createElement('h4')
          itemDiscount.textContent = `$${item.discountedPrice}`
          itemDiscount.className = 'item-discount'

          itemDiv.append(itemPrice, itemDiscount)
      } else{
          let itemPrice = document.createElement('h4')
          itemPrice.textContent = `$${item.price}`
          itemPrice.className = 'item-price-alone'
          itemDiv.append(itemPrice)
      }

      let itemButton = document.createElement('button')
      itemButton.textContent = 'Remove'
      itemButton.className = 'item-remove'
      itemButton.addEventListener('click', function(){
          state.cart.splice(state.cart.indexOf(item), 1)
          render()
      })

      

      itemDiv2.append(itemName, itemDiv, itemButton)
      itemEl.append(itemImage, itemDiv2)
      items.append(itemEl)
  }

  let totalButton = document.createElement('button')
      totalButton.textContent = `Pay now: $${state.total}` 
      totalButton.className = 'total-button'
      totalButton.addEventListener('click', function(){
          state.cart = []
          state.total = 0
          render()
      })
  items.append(totalButton)    
  containerEl.append(closeButton, ItemBag, items)
  wrapperEl.append(containerEl)
  mainEl.append(wrapperEl)
}



function renderModal() {
  if(state.modal === '') return

  if (state.modal === 'user') renderUserModal () 

  if (state.modal === 'bag') renderBagModal()
}



function render() {
  document.body.innerHTML = ''

  renderHeader()
  renderMain()
  renderFooter()
  renderModal()
}

render()

getStoreItems() .then(function(store){
  state.store = store 
  render()
})
