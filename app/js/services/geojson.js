inDaStriit.factory('GeoJSONFactory', ['$http', '$q', function ($http, $q) {
    var factory =
    {
        geojson: false,
        applyGeoJSON: function (name, options) {
            var defer = $q.defer();
            $http.get("data/" + name + ".json").success(function (data) {
                var geojson = {
                    name: name,
                    type: 'geoJSONAwesomeMarker',
                    data: data,
                    pluginOptions: {
                        onEachFeature: options.onEachFeature
                    },
                    visible: options.visible,
                    icon: {
                        icon: options.icon,
                        markerColor: options.markerColor,
                        prefix: 'fa'
                    }
                };
                defer.resolve(geojson);
            });
            return defer.promise;
        }
    };
    return factory;
}]);