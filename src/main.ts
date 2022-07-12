import './style.css'

/*  <div class="left-header">
        <h1>Hollixton</h1>
        <nav>
            <ul class="left-header-list">
                <li class="left-header-list-items">Girls</li>
                <li class="left-header-list-items">Guys</li>
                <li class="left-header-list-items">Sale</li>
            </ul>
        </nav>
    </div>

    <div class="right-header">
        <nav>
            <ul  class="right-header-list">
                <li  class="right-header-list-items"><img src="./src/Media/magnifying glass.png" alt="magnifying-glass" width="25"></li>
                <li class="right-header-list-items"><img src="./src/Media/user.png" alt="user" width="25"></li>
                <li class="right-header-list-items"><img src="./src/Media/shopping bag.png" alt="shopping-bag" width="25"></li>

            </ul>
        </nav>
    </div>
    </header> */

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


   
   



