function MakeItem(name,des,price){
  this.name = name;
  this.price = price;
  this.des = des;
}

function saveItems(cartObj){
  localStorage.setItem('cart',JSON.stringify(cartObj));
}

function retreiveItems(){
  let itemString = localStorage.getItem('cart');
  cart = JSON.parse(itemString);
}

function getTotalQuantity(cartObj){
  var total = 0;
  for(let prop in cartObj) {
    total += cartObj[prop];
  }
  return total;
}

function glowCartIcon(){
  var cartIcon = $('#nav-shopping-cart').parent();
  var total = getTotalQuantity(cart);
    $(cartIcon).addClass('active');
    $(cartIcon).empty().append(`
        <a id="nav-shopping-cart" class="nav-link fa fa-shopping-cart active" href="cart.html">
          <span class="badge badge-default">${total}</span>
        </a>
      `);
}
