// add scripts

$(document).on('ready', function() {
  getStocks();
});


$('form').on('submit', function (e) {
  e.preventDefault();
  console.log("test");

  //create the payload
  var payload = {
    name: $('#name').val(),
    ticker: $('#ticker').val(),
    exchange: $('#exchange').val(),
    price: $('#price').val()
  };

  //post request to the server
  $.post('/api/v1/stocks', payload, function(data){
    console.log(data);
    console.log(payload);


  });

  getStocks();
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
