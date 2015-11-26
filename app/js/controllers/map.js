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
    GeoJSONFactory.applyGeoJSON("profiles", function (feature, layer) {
        $scope[feature.properties.name] = feature.properties;
        layer.on("click", function (e) {
            $scope.current = $scope[e.target.feature.properties.name];
            $mdDialog.show({
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                templateUrl: 'partials/profilePopup.html',
                controller: function DialogController($scope, $mdDialog) {
                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    }
                }
            });
        });
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