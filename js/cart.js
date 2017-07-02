var cart = {};
function makeRow(id,name,quantity,totalPrice){
  var row = $(`
      <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td><span class="fa fa-plus-square"></span> ${quantity} <span class="fa fa-minus-square"></span></td>
        <td>${totalPrice}</td>
      <tr>
    `);
    return row;
}
function addQuantity(data,cartObj){
  var addBtn = $('.fa-plus-square').click(function(ev){
    var idCol = $(ev.target).parent().siblings()[0];
    var id = +$(idCol).text();
    cartObj[id]++;
    appendRows(data,cartObj);
    saveItems(cart);
    glowCartIcon();
  });
}

function subQuantity(data,cartObj){
  var addBtn = $('.fa-minus-square').click(function(ev){
    var idCol = $(ev.target).parent().siblings()[0];
    var id = +$(idCol).text();
    if (cartObj[id] <= 0) {
      delete cartObj[id];
    }
    else{
      cartObj[id]--;
    }
    appendRows(data,cartObj);
    saveItems(cart);
    glowCartIcon();
  });
}

function appendRows(data,cart) {
  var tableBody = $('#bill').empty();
  var totalRow = $('#totalRow');
  var total = 0;
  for(let id in cart) {
    var totalPrice = data[id].price*cart[id];
    tableBody.append(makeRow(id,data[id].name,cart[id],totalPrice));
    total += totalPrice;
  }
  totalRow.empty().append(`
        <div class="col"><strong>Total:</strong></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"><strong>${total}</strong></div>
    `);
  //add Click Action
  addQuantity(data,cart);
  //sub click Action
  subQuantity(data,cart);
}



$(function(){
  $.getJSON('data/catalog.json', function(data, textStatus){
    console.log(data);
    retreiveItems();
    glowCartIcon();
    appendRows(data,cart);
  });
});
