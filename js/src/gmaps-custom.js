var markers = [];
var marker = [];

var locations = [
    {
        position: {
            lat: 41.7996127,
            lng: -91.5666657
        },
        title: 'ceremony',
        icon_url: './img/icons/map-ceremony.png'
    },
    {
        position: {
            lat: 41.8300431,
            lng: -91.0283526
        },
        title: 'reception',
        icon_url: './img/icons/map-reception.png'
    },
    {
        position: {
            lat: 41.9138846,
            lng: -91.4228095
        },
        title: 'hotel',
        icon_url: './img/icons/map-hotel.png'
    }
];

function initMap() {
    // Create our map
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 41.8352627,
            lng: -91.3164834
        },
        zoom: 10,
        scrollwheel: false,
        mapTypeControl: false,
        streetViewControl: false,
        draggable: !("ontouchend" in document),
        styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
    });
}

// Add the map markers
function addMarkers() {
    for (var x = locations.length - 1; x >= 0; x--) {
        var title = locations[x].title;

        // Create the marker
        marker[title] = new google.maps.Marker({
            map: map,
            position: locations[x].position,
            title: title,
            icon: {
                url: locations[x].icon_url,
                scaledSize: new google.maps.Size(50,50)
            }
        });

        // Add the click event
        marker[title].addListener('click', function() {
            updateIcons(this.getTitle());
        });
    }
}

// Update the marker icons
function updateIcons(title) {
    // Reset all the icons
    for (var x = locations.length - 1; x >= 0; x--) {
        var marker_title = locations[x].title;

        if (title != marker_title) {
            marker[marker_title].setIcon({
                url: './img/icons/map-'+marker_title+'.png',
                scaledSize: new google.maps.Size(50,50)
            });
        }
    }

    // Set the active icon
    marker[title].setIcon({
        url: './img/icons/map-'+title+'-active.png',
        scaledSize: new google.maps.Size(50,50)
    });
}
