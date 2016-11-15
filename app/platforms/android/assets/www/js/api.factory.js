(function() {
    'use strict';

    angular.module('starter').factory('API', API);

    function API($log, $q, $http) {

        var http = function(method, endpoint, headers, data, params) {
            var deferred = $q.defer();

            $http({
                method: method,
                url: endpoint,
                data: data,
                headers: headers,
                params: params
            })
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(error) {
              $log.log(error);
                if (method.toUpperCase() === 'GET' && error.status === 404) {
                    deferred.resolve([]);
                } else {
                    deferred.reject(error);
                }
            });

            return deferred.promise;
        };
        
        var self = {
          get: function(endpoint, headers, params) {
            return http('GET', endpoint, headers, undefined,params);
          },
          post: function(endpoint, headers, data){
              return http('POST', endpoint, headers, data);
          },
          put: function(endpoint, headers, data) {
              return http('PUT', endpoint, headers, data);
          },
          delete: function(endpoint, headers, data) {
              return http('DELETE', endpoint, headers, data);
          }
        };
        return self;
    }
})();