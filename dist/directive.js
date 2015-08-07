var app = angular.module('MyApp.controllers', ['MyApp.services','ngStorage','ngCordova','chart.js']);

app.filter('liftFilter', function() {
    return function(input, scope) {
        var patt = new RegExp(scope.attr1Pressed + scope.attr2Pressed + scope.attr3Pressed);
        var out = [];
        // $scope.$watch(scope.searchText)
        if(input) {
            for (var i = 0; i < input.length; i++) {
                if (patt.test(input[i].attr1 + input[i].attr2 + input[i].attr3)){
                    out.push(input[i]);
                }

            }
        }
        return out;
    };
});

app.filter('customFilter', function() {
    return function(input, custom) {
        var out = [];
        // $scope.$watch(scope.searchText)
        if(input) {
            if (custom) {
                for (var i = 0; i < input.length; i++) {

                    if (input[i].custom) {
                        out.push(input[i]);
                    }
                }
            }
            else return input;
        }
        return out;
    };
});

//TODO For focusing on modal fields when opened. get to work w. repeat
//app.directive('customAutofocus', function() {
//    return{
//        restrict: 'A',
//
//        link: function(scope, element, attrs){
//            scope.$watch(function(){
//                return scope.$eval(attrs.customAutofocus);
//            },function (newValue){
//                if (newValue == true){
//                    element[0].focus();//use focus function instead of autofocus attribute to avoid cross browser problem. And autofocus should only be used to mark an element to be focused when page loads.
//                }
//            });
//        }
//    };
//})
app.directive('takeFocus', ["$timeout", function($timeout) {
    return {
        restrict: 'AC',
        link: function(_scope, _element) {
            $timeout(function(){
                _element[0].focus();
            }, 0);
        }
    };
}]);


app.directive('selectOnFocus', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('focus', function () {
                //this.select();
                this.setSelectionRange(0, 9999);
            });
        }
    };
});

app.directive('selectOnClick', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                //this.select();
                this.setSelectionRange(0, 9999);
            });
        }
    };
});

app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.controller('accordionCtrl',["$scope", function($scope){
    $scope.groups = [];
    for (var i=0; i<10; i++) {
        $scope.groups[i] = {
            name: i,
            items: []
        };
        for (var j=0; j<3; j++) {
            $scope.groups[i].items.push(i + '-' + j);
        }
    }
    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = $scope.liftCards;
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };

}]);


// Homepage Set-A-Goal Controller
    // Prefill the slider to 9:30
