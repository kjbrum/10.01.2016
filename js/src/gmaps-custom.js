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

    // Ceremony Marker
    var ceremony_marker = new google.maps.Marker({
        map: map,
        position: {
            lat: 41.7996127,
            lng: -91.5666657
        },
        title: 'Ceremony',
        icon: {
            url: './img/icons/map-rings.png',
            scaledSize: new google.maps.Size(50,50)
        }
    });
    var ceremony_popup_content =
        '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Ceremony</h1>'+
            '<div id="bodyContent">'+
                '<p>Lake Macbride Main Lodge<br>3:00pm</p>'+
            '</div>'+
        '</div>';
    var ceremony_popup = new google.maps.InfoWindow({
        content: ceremony_popup_content
    });
    ceremony_marker.addListener('click', function() {
        ceremony_popup.open(map, ceremony_marker);
    });

    // Reception Marker
    var reception_marker = new google.maps.Marker({
        map: map,
        position: {
            lat: 41.8300431,
            lng: -91.0283526
        },
        title: 'Reception',
        icon: {
            url: './img/icons/map-glasses.png',
            scaledSize: new google.maps.Size(50,50)
        }
    });
    var reception_popup_content =
        '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Reception</h1>'+
            '<div id="bodyContent">'+
                '<p>The Heckman Acreage<br>6:30pm</p>'+
            '</div>'+
        '</div>';
    var reception_popup = new google.maps.InfoWindow({
        content: reception_popup_content
    });
    reception_marker.addListener('click', function() {
        reception_popup.open(map, reception_marker);
    });

    // Hotel Marker
    var hotel_marker = new google.maps.Marker({
        map: map,
        position: {
            lat: 41.9138846,
            lng: -91.4228095
        },
        title: 'Hotel',
        icon: {
            url: './img/icons/map-bed.png',
            scaledSize: new google.maps.Size(50,50)
        }
    });
    var hotel_popup_content =
        '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Hotel</h1>'+
            '<div id="bodyContent">'+
                '<p>Sleep Inn & Suites</p>'+
            '</div>'+
        '</div>';
    var hotel_popup = new google.maps.InfoWindow({
        content: hotel_popup_content
    });
    hotel_marker.addListener('click', function() {
        hotel_popup.open(map, hotel_marker);
    });
}
