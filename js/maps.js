// Used to mount the fetch data so it is available globally

const data = {
}

// Variable used to iterate through data via buttons

property = 0

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
            // Mounting fetch data
            data.luxapi = result.result
            let luxapi = data.luxapi
            for (count = 0; count < luxapi.length; count++) {
                let newHotel = luxapi[count]
                let newHotelDetails = newHotel.lowest_price_package.property
                let newHotelLocation = {lat: newHotelDetails.latitude, lng: newHotelDetails.longitude};
                let marker = new google.maps.Marker({
                    position: newHotelLocation, 
                    title: newHotelDetails.name, 
                    map: map
                });

// Create an event listener so when markers are clicked they display the name of the hotel and a URL to their page.

                google.maps.event.addListener(marker, 'click', (function(marker) {
                    return function() {
                        let newHotelUrl = '<a href="https://luxuryescapes.com/au/offer/' + newHotel.slug + '/' + newHotel.id_salesforce_external + '">' + newHotelDetails.name + '</a>'
                        infowindow.setContent('Discover: ' + newHotelUrl);
                        infowindow.open(map, marker);
                    }
                })(marker));
            }
        });
    });


};

// Listeners to detect button click

document.getElementById("next").addEventListener("click", scrollVacations);
document.getElementById("back").addEventListener("click", unScrollVacations);

// Function to render the HTML content showing hotel descriptors

function showVacation(property) {
    if (property >= data.luxapi.length) {
        alert('You are at the end of the list, click back')
    } else if (property < 0) {
        alert('You are at the start, click next')
    } else {
        document.getElementById('hotelImage').innerHTML = '<img src="https://res.cloudinary.com/lux-group/image/upload/f_auto,fl_progressive,q_auto:eco,c_fill,g_auto,w_798,ar_16:9/' + data.luxapi[property].images[0].id_cloudinary_external + '">'
        document.getElementById('hotelTitle').innerHTML = '<a href="https://luxuryescapes.com/au/offer/' + data.luxapi[property].slug + '/' + data.luxapi[property].id_salesforce_external + '">' + data.luxapi[property].lowest_price_package.property.name + '</a>'
        document.getElementById('hotelDescription').innerHTML = data.luxapi[property].description
    }
}

// Function to increase index number of hotel in array

function scrollVacations() {
    property++
    showVacation(property)
}

// Function to decrease index number of hotel in array

function unScrollVacations() {
    property--
    showVacation(property)
}