inDaStriit.factory('GeoJSONFactory', ['$http', 'leafletData', function ($http, leafletData) {
    var factory =
    {
        geojson: false,
        applyGeoJSON: function (name, callback) {
            $http.get("data/" + name + ".json").success(function (data) {
                factory.geojson = L.geoJson(data, {
                    onEachFeature: callback
                });
                leafletData.getMap().then(function (map) {
                    map.addLayer(factory.geojson);
                });
            });
        }
    };
    return factory;
}]);