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
    $http.get("http://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%28node%5B%22amenity%22%5D%28around%3A1000%2C48%2E8131354%2C2%2E393143%29%3Bway%5B%22amenity%22%5D%28around%3A1000%2C48%2E8131354%2C2%2E393143%29%3Brelation%5B%22amenity%22%5D%28around%3A1000%2C48%2E8131354%2C2%2E393143%29%3B%29%3Bout%20body%3B%3E%3Bout%20skel%20qt%3B%0A").success(function (result) {
        console.log(result);

    });
    /* Retrieve POI */
    GeoJSONFactory.applyGeoJSON("restaurant", function (feature, layer) {
        layer.bindPopup(feature.properties.name);
    });
    GeoJSONFactory.applyGeoJSON("bar", function (feature, layer) {
        layer.bindPopup(feature.properties.name);
    });
    GeoJSONFactory.applyGeoJSON("cinema", function (feature, layer) {
        layer.bindPopup(feature.properties.name);
    });
    GeoJSONFactory.applyGeoJSON("emergency", function (feature, layer) {
        layer.bindPopup(feature.properties.name);
    });
    GeoJSONFactory.applyGeoJSON("historic", function (feature, layer) {
        layer.bindPopup(feature.properties.name);
    });
}]);