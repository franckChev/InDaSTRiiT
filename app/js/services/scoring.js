inDaStriit.factory('ScoringFactory', ['$http', 'leafletData', '$q', function ($http, leafletData, $q) {
    var factory =
    {
        initScore: {
	        resto : {
	            score : 0,
	            amenities : ["restaurant", "fast_food"],
	            shop : [""]
	        },
	        bars : {
	            score : 0,
	            amenities : ["bar", "cafe", "pub"],
	            shop : ["alcohol", "wine", "beverages"]
	        },
	        bands : {
	            score : 0,
	            amenities : ["nightclub"],
	            shop : ["music", "musical_instruments"]
	        },
	        sports : {
	            score : 0,
	            amenities : ["gym"],
	            shop : ["sports"]
	        },
	        films : {
	            score : 0,
	            amenities : ["cinema"],
	            shop : ["video"]
	        },
	        books : {
	            score : 0,
	            amenities : ["library", "public_bookcase"]
	        }


        },
        completeScore: function(name){
        	var defer = $q.defer();
        	$http.get('http://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["amenity"](around:1000,'+ name.myPosition.lat +','+ name.myPosition.lng +');way["amenity"](around:1000,48.8131354,2.393143);relation["amenity"](around:1000,48.8131354,2.393143););out body;>;out skel qt;').success(function (result) {
	        var data = osmtogeojson(result);
	        for (item in data.features)
	        	{
	                if (data.features[item].properties !== undefined)
	                {
	                    var tags = data.features[item].properties.tags;
	                    for (category in name.neighborhood) {
	                        if (name.neighborhood[category].amenities.indexOf(tags.amenity) !== -1)
	                            name.neighborhood[category].score++;
						}
	                    
	                }
	        	}
				console.log("Scoring > " , factory.initScore);
        		defer.resolve(factory.initScore);
        	});
        	return defer.promise;
    	},
    	computeScore: function(user_score, scope, callback){
    		factory.completeScore(scope).then(function(quartier)
    		{
	    		var totalLikes = 0;
	    		for (var index in user_score.properties.nbLikes[0]) {
	   				totalLikes += user_score.properties.nbLikes[0][index];
				}
				var coef = [];
				for (index in user_score.properties.nbLikes[0]){
					coef[index] = user_score.properties.nbLikes[0][index] / totalLikes;
				}
				var score = 0;
				for (index in quartier) {
					score += quartier[index].score * coef[index];
				}
				callback(score);
    		});
    	}
    };
    return factory;
}]);