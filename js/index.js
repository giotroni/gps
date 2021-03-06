var GPS_TIMEOUT = 15000;           // intervallo di tempo della chiamata al GPS

// MAIN
var app = {
  // inixzializzazione di phonegap
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function(){
    document.addEventListener("deviceready", app.onDeviceReady, false);
  },
  onDeviceReady: function(){
    // ok, il dispositivo è pronto: configuralo
    // EVENTI DA LEGARE
    alert("ok: pronto");
    $("#btnGps").on("click", app.checkPos);
  },
  // chiamata quando la posizione è stata letta
  onSuccessGeo: function(position){
    // aggiorna le coordinate
    $('#lblPos').html(position.coords.latitude + " - " + position.coords.longitude);
    $('#lblMsg').hide();
    $('#btnGps').show();
  },
  // chiamata quando c'è un errore nella lettura della posizione
  onErrorGeo: function(error) {
    var msg;
    switch(error.code) {
        case error.PERMISSION_DENIED:
            msg = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            msg = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            msg = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            msg = "An unknown error, reading position, occurred."
            break;
    }
    alert(msg);
    $('#lblMsg').hide();
    $('#btnGps').show();
  },
  // verifica la posizione GPS
  checkPos: function(){
    alert("Cerca");
    $('#lblMsg').html('sto cercando');
    $('#lblMsg').show();
    $('#btnGps').hide();
    navigator.geolocation.getCurrentPosition(app.onSuccessGeo, app.onErrorGeo, { timeout: GPS_TIMEOUT });
  }
}

app.initialize();
