var app = angular.module('MyApp.weightcontrol', ['ionic']);

app.controller('weightcontrol', ["$scope", "$ionicPopup", "$rootScope", "localStore", function ($scope, $ionicPopup, $rootScope,localStore) {

    $scope.removeFlag = false;
    //console.log("weightxx" + $scope.indexLift);
    $scope.kgLookup = function (nameLift) {
    };

    $scope.remove = function () {
        if ($scope.sets2.length > 1) {
            $scope.removeFlag = !$scope.removeFlag;
        }
    };

    //had to copy paste this code.. didn't feel like fighting dupe issue.
    $scope.openSettings = function(){

        $scope.liftForSettingsChange = name;
        $scope.liftObjectForSettingsChange = localStore.getLiftByName($rootScope.namelift);
        console.log($scope.liftObjectForSettingsChange );
        var confirmPopup = $ionicPopup.show({
            templateUrl: 'pop/pop-liftset.html',
            title: 'Settings for lift',
            scope: $scope,
            buttons: [
                {
                    text: '<b >Done</b>',
                    type: 'button-dark',
                    onTap: function (e) {
                        $scope.preventFlag = true;
                    }
                }
            ]
        });
        confirmPopup.then(function (res) {
            $rootScope.$broadcast('lift-settings-change',{name:name});
        });

    };
    $scope.changeSort = function (index, index2) {
        if (index != 4) {//if we aren't selecting the weight Rack
            console.log('reverted',$scope.liftObjectForSettingsChange['attr' + String(index)],index2);

            if($scope.liftObjectForSettingsChange['attr' + String(index)] == index2){
                $scope.liftObjectForSettingsChange['attr' + String(index)] = '.';
                console.log('revebrted',$scope.liftObjectForSettingsChange.attr1 == '1');
                return;
            }
            $scope.liftObjectForSettingsChange['attr' + String(index)] = index2;
        } else {
            $scope.liftObjectForSettingsChange['weight'] = index2;
        }
    };



    $scope.showInfo = function () {
        $scope.infoFlag = 6;
        var confirmPopup = $ionicPopup.show({
            title: 'Set Details',
            //subTitle: "Click 'Select Lift' to choose your movement" + "\n"
            //+ "Click 'Add Weight' to select reps and weight" + "\n"
            //+ " Use the clock to see your history" + "\n" + "\n"
            //+ " Plus and minus add/remove sets and lifts, check button to complete the workout ",
            scope: $scope,
            templateUrl: 'pop/pop-maininfo.html',
            buttons: [
                {
                    text: '<b>Done</b>',
                    type: 'button-dark',
                    onTap: function (e) {

                    }
                }
            ]
        });
    }
    $scope.lock = function () {

        this.setSelectionRange(0, 1);
    }

    $scope.outRemove2 = function () {
        if ($scope.removeFlag) {
            $scope.removeFlag = false;
        }
    }

    $scope.addSet = function () {
        //console.log('sets2', $scope.editingNumber.id, $scope.wtSelectPress, $scope.wtSelectPress)
        if ($scope.sets2[0].reps != 0 || $scope.sets2[0].wt != 0 || $scope.sets2.length > 1) {
            var last = angular.copy(_.last($scope.sets2));
            $scope.sets2.push(
                last
            );
        }
        $scope.popAddSet();
    };


    //$scope.selectNumber = function (index, id) {
    //    if (id == 1) {
    //        $scope.rangeFlipFlag = true;
    //        $scope.editingShow = {num: $scope.sets2[index].reps}
    //        $scope.editingNumber = {index: index, id: id}
    //        $scope.wtSelectPress = index + String(id)
    //
    //    }
    //    else if (id == 2) {
    //        $scope.rangeFlipFlag = false;
    //        $scope.editingShow = {num: $scope.sets2[index].wt}
    //        $scope.editingNumber = {index: index, id: id}
    //        $scope.wtSelectPress = index + String(id)
    //    }
    //}


    $scope.removeSet = function ($index) {
        if ($scope.removeFlag) {
            $scope.sets2.splice($index, 1);
            $scope.removeFlag = false;
        }
    }

    $scope.submitWeight = function () {

        $scope.closeModal('lift', 0, 2);
    }

    $scope.showInfo = function () {
        if ($rootScope.stateW == 'heroku') {
            var datenew = new Date()
            winston.log('info', $scope.$storage.mainObj.userId + ", viewed liftselect info")
        }
        $scope.infoFlag = 6;
        var confirmPopup = $ionicPopup.show({
            title: 'Add Weight',
            //subTitle: "Click 'Select Lift' to choose your movement" + "\n"
            //+ "Click 'Add Weight' to select reps and weight" + "\n"
            //+ " Use the clock to see your history" + "\n" + "\n"
            //+ " Plus and minus add/remove sets and lifts, check button to complete the workout ",
            scope: $scope,
            templateUrl: 'pop/pop-maininfo.html',
            buttons: [
                {
                    text: '<b>Done</b>',
                    type: 'button-dark',
                    onTap: function (e) {

                    }
                }
            ]
        });
        confirmPopup.then(function (res) {
            ////console.log('Tapped!', res);
            if ($rootScope.stateW == 'heroku') {
                var dateDiff = new Date() - datenew
                winston.log('info', $scope.$storage.mainObj.userId + ", closed liftselect after" + dateDiff)
            }
        });

    };


}]);

