$(document).ready(function() {
  $.cookie.json = true;    
  init_symbols();


  $('#add_symbol').submit(function() {
    val = $('#add_symbol > input').val().toUpperCase()
    if (val.length > 0) {
      list = val.split(',')
      for (var i = list.length - 1; i >= 0; i--) {
        add_symbol(list[i]);
      }
    }
    $('#add_symbol > input').val('')
    return false;
  });

  $('#btn_refresh').click(function() {
    update_all();
  });
});

function init_symbols() {
  var default_symbols = ['ATVI','ADBE','AMZN','AAPL','BRCM','CSCO','CMCSA','DELL','EBAY','FFIV','FB','GOOG','INTC','MSFT','NTAP','NVDA','ORCL','QCOM','SBUX','YHOO'];
  if ( ! $.cookie('take_stock_symbols') ) {
    write_symbols(default_symbols);
    symbols = default_symbols;
  } else {
    symbols = read_symbols();
  }
  for (var i = 0; i <= symbols.length - 1; i++) {
    symbol = symbols[i]
    $('#symbols_table_body').append('<tr class="symbol" id="'+symbol+'"></tr>');
    update_symbol(symbol);
  };
}

function read_symbols() {
  return $.cookie('take_stock_symbols');
}

function write_symbols(symbols) {
  $.cookie('take_stock_symbols', symbols.sort(), { expires: 365, path: '/' });
}

function add_symbol(symbol) {
  symbols = read_symbols()
  if ($.inArray(symbol, symbols) == -1) {
    symbols.push(symbol);
    write_symbols(symbols);
    $('#symbols_table_body').append('<tr class="symbol" id="'+symbol+'"></tr>');
    update_symbol(symbol);
  } else {
    alert(symbol+" already exists!");
  }  
}

function remove_symbol(symbol) {
  symbols = read_symbols()
  symbols = jQuery.removeFromArray(symbol, symbols);
  write_symbols(symbols);
  $('#'+symbol).remove();
}

function update_symbol(symbol) {
  $('#'+symbol).load('/quote?symbol='+symbol, function() {
    $('#'+symbol+' td:first-child abbr').tooltip();
  });
}

function update_all() {
  for (var i = 0; i <= symbols.length - 1; i++) {
    update_symbol(symbols[i]);
  }
}

jQuery.removeFromArray = function(value, arr) {
  return jQuery.grep(arr, function(elem, index) {
    return elem !== value;
  });
};