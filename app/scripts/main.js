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

    var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

    new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 18, attribution: osmAttrib}).addTo(map);

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