import data from './maps'


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