// add scripts

$(document).on('ready', function() {
  getStocks();
  $('.edit-section').hide();
  $('.message-section').hide();
});

//add new stock form submit
$('stockform').on('submit', function (e) {
  e.preventDefault();
  $('#mesage').html('');
  //create the payload
  var payload = {
    name: $('#name').val(),
    ticker: $('#ticker').val(),
    exchange: $('#exchange').val(),
    price: $('#price').val()
  };
  //post request to the server
  $.post('/api/v1/stocks', payload, function(data){
    $('.message-section').show();
    $('#message').html('New stock Added.');
    getStocks();
  });
});

//delete
$(document).on('click', '.delete-button', function() {
  $.ajax({
    method: "DELETE",
    url: '/api/v1/stock/'+$(this).attr('id')
  }).done(function(data) {
    $("#all-stocks").html("");
    $('#message').html('Stock deleted successfully.');
    getStocks();
  });
});


//edit stock functionality
$(document).on('click', '.edit-button', function() {

  $.get('/api/v1/stock/'+$(this).attr('id'), function(data) {
    $('#edit-title').html('Edit '+data.name);
    $('#edit-name').val(data.name);
    $('#edit-ticker').val(data.ticker);
    $('#edit-exchange').val(data.exchange);
    $('#edit-price').val(data.price);
    $('.update-button').attr('id', data._id);
  });

  $('.edit-section').show();
  $('#all-stocks').hide();

});

//update button after editing
$(document).on('click', '.update-button', function(e) {
  e.preventDefault();
  //grabbing the form inputs
  var $updatedStockName = $('#edit-name').val();
  var $updatedStockTicker = $('#edit-ticker').val();
  var $updatedStockExchange = $('#edit-exchange').val();
  var $updatedStockPrice = $('#edit-price').val();

  //create the payload to send in the correct schema
  var payload = {
    name: $updatedStockName,
    ticker: $updatedStockTicker,
    exchange: $updatedStockExchange,
    price: $updatedStockPrice
  };

  $.ajax({
    method: "PUT",
    url: '/api/v1/stock/' + $(this).attr('id'),
    data: payload
  }).done(function(data) {
    $("#all-stocks").html("");
    getStocks();
    $('#message').html('Stock edited successfully.');
    $('.edit-section').hide();
    $('#all-stocks').show();
  });

});


//helper function to render all of the stocks
function getStocks() {
  $('#all-stocks').html('');
  // send get request to server
  $.get('/api/v1/stocks', function(data) {
    if(data.length === 0) {
      console.log(data);
      $('.stock-section h2').html('No stocks! Add an stock above.');
    } else {
      $('.stock-section h2').html('All stocks');
      // loop through array of objects, appending each to the DOM
      for (var i = 0; i < data.length; i++) {
        $('#all-stocks').append('<tr>'+
          '<td>'+data[i].name+'</td>'+
          '<td>'+data[i].ticker+'</td>'+
          '<td>'+data[i].exchange+'</td>'+
          '<td>'+data[i].price+'</td>'+
          '<td><a class="btn btn-danger btn-xs delete-button" id="'+data[i]._id+'" role="button">Delete</a>'+
          '&nbsp;<a class="btn btn-primary btn-xs edit-button" id="'+data[i]._id+'" role="button">Edit</a></td>'+
          '<tr>'
        );
      }
      $('form input').val('');
    }
  });
}
