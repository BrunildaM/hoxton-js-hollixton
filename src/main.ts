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


const state = {
        store: [
          {
            "id": 1,
            "type": "Guys",
            "name": "Crewneck T-Shirt 3-Pack",
            "image": "https://img.hollisterco.com/is/image/anf/KIC_324-1085-0123-100_prod1",
            "price": 40,
            "discountedPrice": 21.99,
            "dateEntered": "2021/08/10",
            "stock": 10
          },
          {
            "id": 2,
            "type": "Girls",
            "name": "Smocked Tiered Mini Dress",
            "image": "https://img.hollisterco.com/is/image/anf/KIC_359-1220-1911-805_prod1",
            "price": 29,
            "dateEntered": "2021/07/10",
            "stock": 5
          },
          {
            "id": 3,
            "type": "Girls",
            "name": "Gilly Hicks Cozy Joggers",
            "image": "https://img.hollisterco.com/is/image/anf/KIC_346-1252-0485-116_prod1",
            "price": 27,
            "dateEntered": "2021/05/06",
            "stock": 15
          }
        ]
      }
      
      /*
      <header>
            <nav class="header-left">
              <ul class="header-left-list">
                <h1 class="logo">HOLLIXTON</h1>
                <li class="header-left-list-item"><a>Girls</a></li>
                <li class="header-left-list-item"><a>Guys</a></li>
                <li class="header-left-list-item"><a>Sale</a></li>
              </ul>
            </nav>
            <nav class="header-right">
              <ul class="header-right-list">
                <li class="header-right-list-item"><button>🔍</button></li>
                <li class="header-right-list-item"><button>🚹</button></li>
                <li class="header-right-list-item"><button>👜</button></li>
              </ul>
            </nav>
          </header>
      
      */
      
      function renderHeader() {
        const headerEl =document.createElement('header')
      
        const nav1El = document.createElement('nav')
        nav1El.className = 'header-left'
      
        const leftListEl = document.createElement('ul')
        leftListEl.className = 'header-left-list'
      
        let h1El = document.createElement('h1')
        h1El.textContent = 'HOLLIXTON'
      
        const girlsEl = document.createElement('li')
        girlsEl.className = 'header-left-list-item'
        const girlsLinkEL = document.createElement('a')
        girlsLinkEL.textContent = 'Girls'
      
        girlsEl.append(girlsLinkEL)
      
      
        const guysEl = document.createElement('li')
        guysEl.className = 'header-left-list-item'
        const guysLinkEL = document.createElement('a')
        guysLinkEL.textContent = 'Guys'
      
        guysEl.append(guysLinkEL)
      
      
        const saleEl = document.createElement('li')
        saleEl.className = 'header-left-list-item'
        const saleLinkEl = document.createElement('a')
        saleLinkEl.textContent = 'Sale'
      
        saleEl.append(saleLinkEl)
      
        leftListEl.append(h1El, girlsEl, guysEl, saleEl)
        nav1El.append(leftListEl)
      
      
      //   <nav class="header-right">
      //   <ul class="header-right-list">
      //     <li class="header-right-list-item"><button>🔍</button></li>
      //     <li class="header-right-list-item"><button>🚹</button></li>
      //     <li class="header-right-list-item"><button>👜</button></li>
      //   </ul>
      // </nav>
      
      
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
      
      
        headerEl.append(nav1El, nav2El)
        document.body.append(headerEl)
      }
      
      
      function renderMain() {
        const mainEl = document.createElement('main')
      
        const h2El = document.createElement('h2')
        h2El.textContent = "Home"
        h2El.className = "main-title"
      
        const productList = document.createElement('ul')
        productList.className = "product-list"
      
      
      for (const product of state.store) {
        const productItem = document.createElement('li')
        productItem.setAttribute('class', 'product-item')
      
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
      
        
      
        const newItemEl = document.createElement('span')
        newItemEl.className = 'product-item-new'
        newItemEl.textContent = 'NEW!'
      
        
        productItem.append(imageEl, titleEl, priceEl, newItemEl)
        productList.append(productItem)
      }
        mainEl.append(h2El, productList)
      
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
      