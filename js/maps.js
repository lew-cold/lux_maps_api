const data = {

}
// Initialise Google Maps API and initial viewframe

function initMap() {
    let map = new google.maps.Map(
        document.getElementById('map'), {
            center: {lat: 3.5245, lng: 23.5967},
            zoom: 2
    }); 

// Start a fetch request to the lux group API

    fetch('https://api.luxgroup.com/api/public-offers').then(function(response) {
        response.json().then(function(result) {

// Take the data and import it into Google Maps API
            
            let infowindow = new google.maps.InfoWindow()
            let count
            data.luxapi = result.result
            let luxapi = data.luxapi
            for (count = 0; count < luxapi.length; count++) {
                let newHotel = luxapi[count]
                let newHotelDetails = newHotel.lowest_price_package.property
                // console.log(newHotel)
                let newHotelLocation = {lat: newHotelDetails.latitude, lng: newHotelDetails.longitude};
                let marker = new google.maps.Marker({
                    position: newHotelLocation, 
                    title: newHotelDetails.name, 
                    map: map
                });

// Create an event listener so when markers are clicked they display the name of the hotel and a URL to their page.

                google.maps.event.addListener(marker, 'click', (function(marker) {
                    return function() {
                        // console.log(newHotel)
                        let newHotelUrl = '<a href="https://luxuryescapes.com/au/offer/' + newHotel.slug + '/' + newHotel.id_salesforce_external + '">' + newHotelDetails.name + '</a>'
                        infowindow.setContent('Discover: ' + newHotelUrl);
                        infowindow.open(map, marker);
                    }
                })(marker));
            }
        });
    });


};

document.getElementById("next").addEventListener("click", scrollVacations);
document.getElementById("back").addEventListener("click", unScrollVacations);

function scrollVacations() {
    console.log('hello')
    console.log(data.luxapi)
}

function unScrollVacations() {
    console.log('goodbye')
    console.log(data.luxapi)
}