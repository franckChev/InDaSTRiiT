inDaStriit.controller('MapCtrl', ["$scope", "$http", "leafletData", "$mdDialog", "GeoJSONFactory", function ($scope, $http, leafletData, $mdDialog, GeoJSONFactory) {
    /* Map Init */
    var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    angular.extend($scope, {
        myPosition: {
            lat: 48.8139878,
            lng: 2.3927642,
            zoom: 17
        },
        tiles: {
            url: osmUrl,
            options: {
                attribution: osmAttrib
            }
        },
        defaults: {
            scrollWheelZoom: false
        },
        events: {
            map: {
                enable: ['drag', 'click'],
                logic: 'emit'
            }
        }

    });
    console.log(leafletData);
    var circle = L.circle([$scope.myPosition.lat, $scope.myPosition.lng], 100);
    leafletData.getMap().then(function (map) {
        map.addLayer(circle);
    });
    /* Retrieve profiles */
    $http.get('http://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["amenity"](around:1000,48.8131354,2.393143);way["amenity"](around:1000,48.8131354,2.393143);relation["amenity"](around:1000,48.8131354,2.393143););out body;>;out skel qt;').success(function (result) {
        console.log(result, typeof(result));

        // var geojson = L.geoJson(result, { onEachFeature : function(feature, layer) {}});
        // leafletData.getMap().then(function (map) {
        //      map.addLayer(geojson);
        //  });
        var post_box = result.elements.filter(function (element, index, array) {
            if (element !== undefined && element.tags !== undefined && element.tags.amenity !== undefined)
                return (element.tags.amenity == "post_box");
            else
                return false;
        });
        console.log(post_box.length);

    });
    /* Retrieve POI */
    // GeoJSONFactory.applyGeoJSON("restaurant", function (feature, layer) {
    //     layer.bindPopup(feature.properties.name);
    // });
    // GeoJSONFactory.applyGeoJSON("bar", function (feature, layer) {
    //     layer.bindPopup(feature.properties.name);
    // });
    // GeoJSONFactory.applyGeoJSON("cinema", function (feature, layer) {
    //     layer.bindPopup(feature.properties.name);
    // });
    // GeoJSONFactory.applyGeoJSON("emergency", function (feature, layer) {
    //     layer.bindPopup(feature.properties.name);
    // });
    // GeoJSONFactory.applyGeoJSON("historic", function (feature, layer) {
    //     layer.bindPopup(feature.properties.name);
    // });
}]);