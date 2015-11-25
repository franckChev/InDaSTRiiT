inDaStriit.controller('MapCtrl', ["$scope", "$http", "leafletData", "$mdDialog", function ($scope, $http, leafletData, $mdDialog) {
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

    });
    $http({
        method: 'GET',
        url: 'data/profiles.json'
    }).success(function (result) {
        var geojson = L.geoJson(result, {
            onEachFeature: function (feature, layer) {

                layer.on("click", function() {
                    $mdDialog.show({
                        clickOutsideToClose: true,
                        scope: $scope,        // use parent scope in template
                        preserveScope: true,  // do not forget this if use parent scope
                        // Since GreetingController is instantiated with ControllerAs syntax
                        // AND we are passing the parent '$scope' to the dialog, we MUST
                        // use 'vm.<xxx>' in the template markup
                        templateUrl: 'partials/profilePopup.html',
                        controller: function DialogController($scope, $mdDialog) {
                            $scope.closeDialog = function () {
                                $mdDialog.hide();
                            }
                        }

                    });
                });
            }
        });
        leafletData.getMap().then(function (map) {
            map.addLayer(geojson);
        });
    });
}]);