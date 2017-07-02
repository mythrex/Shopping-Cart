var cart = {};

function addToCart(data) {
  var btn = $('.card > .card-block > button').click(function(ev){
    var card = $(ev.target).parent().parent();
    var cardText = $(ev.target).siblings()[1];
    var id = +card.attr("data-id");
      if (!cart[id]) {
        cart[id] = 1;
      }
      else{
        cart[id]++;
      }
      //show count
      $(cardText).empty();
      $(cardText).append(`
        <p>${data[id].brand}</p>
        <p class="lead"><span class="fa fa-inr"> </span> ${data[id].price}</p>
        <p>Quantity: ${cart[id]}</p>
        `);
        glowCartIcon();
        saveItems(cart);
  });
}


function makeCard(id,name,brand,price){
  var card = $(`
    <div class="col-12 col-sm-6 col-md-4">
      <div class="card" data-id="${id}">
        <img class="card-img-top" src="http://via.placeholder.com/300x200/FFB093" alt="img">
        <div class="card-block">
          <h2 class="card-title">${name}</h2>
          <div class="card-text">
            <p>${brand}</p>
            <p class="lead"><span class="fa fa-inr"> </span> ${price}</p>
          </div>
          <button class="btn btn-primary">Add to Cart <span class="fa fa-shopping-cart"></span></button>
        </div>
      </div>
    </div>
    `);
  return card;
}

$(function(){
  var container = $('#catalog-container');
  retreiveItems();
  glowCartIcon();
  $.getJSON( "data/catalog.json", function(data) {
    for(id in data){
      container.append(makeCard(id,data[id].name,data[id].brand,data[id].price));
    }
    addToCart(data);
  });
});
