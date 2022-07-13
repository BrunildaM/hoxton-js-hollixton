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


let state = {
    strore: [
       
    ]
}



function getHeader() {

    const headerEl = document.createElement('header')

    let div1El = document.createElement('div')
    div1El.className = "left-header"

    let logoEl = document.createElement('h1')
    logoEl.innerText = 'Hollixton'

    let nav1El = document.createElement('nav')

    let leftListEl = document.createElement('ul')
    leftListEl.className = "left-header-list"

    let girlsEl = document.createElement('li')
    girlsEl.className = "right-header-list-items"
    girlsEl.innerText = 'Girls'

    let guysEl = document.createElement('li')
    guysEl.className = "right-header-list-items"
    guysEl.innerText = 'Guys'

    let saleEl = document.createElement('li')
    saleEl.className = "right-header-list-items"
    saleEl.innerText = 'Sale'

    leftListEl.append(girlsEl, guysEl, saleEl)
    nav1El.append(leftListEl)
    div1El.append(logoEl, nav1El)




    let div2El = document.createElement('div')
    div2El.className = 'right-header'

    let nav2El = document.createElement('nav')

    let rightListEl = document.createElement('ul')
    rightListEl.className = "right-header-list"

    let searchEl = document.createElement('img')
    searchEl.setAttribute('src', "./src/Media/magnifying glass.png")
    searchEl.className = "right-header-list-items"

    let userEl = document.createElement('img')
    userEl.setAttribute('src', "./src/Media/user.png")
    userEl.className = "right-header-list-items"

    let shoppingBagEl = document.createElement('img')
    shoppingBagEl.setAttribute('src', "./src/Media/shopping bag.png")
    shoppingBagEl.className = "right-header-list-items"

    rightListEl.append(searchEl, userEl, shoppingBagEl)
    nav2El.append(rightListEl)
    div2El.append(nav2El)


    headerEl.append(div1El, div2El)
    document.body.append(headerEl)

}


function render() {
    getHeader()
}

   
   



