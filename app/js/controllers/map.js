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
                layer.bindPopup(feature.properties.name);
                layer.on("click", function()
                {
                    alert = $mdDialog.alert({
                        title: 'Attention',
                        content: 'This is an example of how easy dialogs can be!',
                        ok: 'Close'
                    });
                    $mdDialog
                        .show( alert )
                        .finally(function() {
                            alert = undefined;
                        });
                })
            }
        });
        leafletData.getMap().then(function (map) {
            map.addLayer(geojson);
        });
    });
}]);