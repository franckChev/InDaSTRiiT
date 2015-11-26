inDaStriit.controller('MapCtrl', ["$scope", "$http", "leafletData", "$mdDialog", "GeoJSONFactory", function ($scope, $http, leafletData, $mdDialog, GeoJSONFactory) {
    /* Map Init */
    var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    $scope.score = {
        restaurant: 0,
        bar: 0,
        cinema: 0,
        emergency: 0,
        historic: 0,
        museum: 0,
        shop: 0,
        sport_center: 0
    };
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

    $http.get('http://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%28node%5B%22amenity%22%3D%22restaurant%22%5D%2848%2E81054471412941%2C2%2E389000654220581%2C48%2E81738363757687%2C2%2E3999547958374023%29%3Bway%5B%22amenity%22%3D%22restaurant%22%5D%2848%2E81054471412941%2C2%2E389000654220581%2C48%2E81738363757687%2C2%2E3999547958374023%29%3Brelation%5B%22amenity%22%3D%22restaurant%22%5D%2848%2E81054471412941%2C2%2E389000654220581%2C48%2E81738363757687%2C2%2E3999547958374023%29%3B%29%3Bout%20body%3B%3E%3Bout%20skel%20qt%3B%0A').success(function (result) {
        var data = osmtogeojson(result);
        var geojson = L.geoJson(data, {
            onEachFeature: function (feature, layer) {

            }
        });
        leafletData.getMap().then(function (map) {
            console.log(geojson);
            map.addLayer(geojson);
        });

    });
    /* Retrieve POI */
    //GeoJSONFactory.applyGeoJSON("restaurant", function (feature, layer) {
    //    $scope.score.restaurant++;
    //    layer.bindPopup(feature.properties.name);
    //});
    GeoJSONFactory.applyGeoJSON("bar", function (feature, layer) {
        $scope.score.bar++;
        layer.bindPopup(feature.properties.name);
    });
    GeoJSONFactory.applyGeoJSON("cinema", function (feature, layer) {
        $scope.score.cinema++;
        layer.bindPopup(feature.properties.name);
    });
    GeoJSONFactory.applyGeoJSON("emergency", function (feature, layer) {
        $scope.score.emergency++;
        layer.bindPopup(feature.properties.name);
    });
    GeoJSONFactory.applyGeoJSON("historic", function (feature, layer) {
        $scope.score.historic++;
        layer.bindPopup(feature.properties.name);
    });

}]);