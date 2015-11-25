/*jslint browser: true*/
/*global L */

(function (window, document, L, undefined) {
    'use strict';

    L.Icon.Default.imagePath = 'images/';

    /* create leaflet map */
    var map = L.map('map', {
        center: [48.8139878, 2.3927642],
        zoom: 17
    });

    //centre la carte
    map.locate({setView: true, maxZoom: 16});

    //---- mon cercle de recherche autour de ma position
    function onLocationFound(e) {
    var radius = 1000;

    L.circle(e.latlng, radius).addTo(map);
    }

    map.on('locationfound', onLocationFound);

    function onLocationError(e) {
    alert(e.message);
    }

    map.on('locationerror', onLocationError);
    //----


    var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

    new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 18, attribution: osmAttrib}).addTo(map);

    
    query_overpass('[out:json];node(57.7,11.9,57.8,12.0)[amenity=bar];out;', function(error, data)
        {
            console.log(error, data);
        });

    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var geojson = L.geoJson(JSON.parse(xhr.responseText), {
                    onEachFeature: function (feature, layer) {
                    layer.bindPopup(feature.properties.name);
                }
            });
            geojson.addTo(map);
        }
    }
    xhr.open("GET", "data/profiles.json");
    xhr.send();

}(window, document, L));