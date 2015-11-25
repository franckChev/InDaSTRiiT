inDaStriit.controller('MapCtrl', ["$scope", "$http", function($scope, $http)
{
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
        var radius = 500;

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

    $http({
        method: 'GET',
        url: 'data/profiles.json'
    }).success(function(result) {
        var geojson = L.geoJson(result, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.name);
            }
        });
        geojson.addTo(map);

    });
}]);