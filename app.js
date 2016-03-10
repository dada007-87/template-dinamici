angular.module('myApp',[])
.directive('content', function($compile){
    return {
        restrict: 'AE',
        controller: 'ContentController',
        controllerAs: 'ctrl',
        link: function($scope, $elem, $attrs, controller){

            $scope.ctrl.test("stringa di test");

            $scope.ctrl.getContent($attrs["url"])
                .success(function(data){
                    $scope.ctrl.getTemplate(data.tipo)
                        .success(function(template){
                            console.log(template);
                            $scope.myModel = data;
                            var compiledTemplate = $compile(template)($scope);
                            $elem.append(compiledTemplate);
                        });
                }
            )
        }
    }
})
.controller('ContentController', function($scope, $http){
    var templateUrl = "templates/";
    return {
        test: function(stringa){
            console.log(stringa);
        },
        getContent: function(url){
            return $http.get(url);
        },
        getTemplate: function(tipo){
            return $http.get(templateUrl + tipo + ".html");
        }

    }
})