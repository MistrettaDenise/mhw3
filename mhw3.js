
function initMap() {
  const myLatLng = { lat: 37.356395093581426, lng: 13.926934188915396};
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 19,
    center: myLatLng,
  });
  new google.maps.Marker({
    position: myLatLng,
    map,
  });
}

