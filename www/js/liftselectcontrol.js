/**
 * Created by Jbalchun on 7/26/15.
 */
var app = angular.module('MyApp.liftselectcontrol', ['MyApp.services', 'ngStorage', 'ngCordova']);
app.controller('liftselectcontrol',
    function ($scope, $ionicScrollDelegate, $ionicPlatform, $localStorage,$timeout, localStore, $ionicPopup, $rootScope) {

        $scope.liftData = $localStorage.liftData;
        $scope.matchedLifts = [];
        $scope.attr1Pressed = '.';
        $scope.attr2Pressed = '.';
        $scope.attr3Pressed = '.';
        $scope.searchTextC = '';
        $scope.selectLift = {name: "Select Lift"};
        $scope.newLiftName = {name: ''};
        $scope.custom = false;
        $scope.customLifts = [];
        
        $scope.removeFlagB = false;
        $scope.liftForSettingsChange = '';
        $scope.liftObjectForSettingsChange = {};
        $scope.liftSelectorState = 'All Lifts';
        $scope.keyBoardUp = false;
        window.addEventListener('native.hidekeyboard', keyboardHideHandler);
        window.addEventListener('native.showkeyboard', keyboardShowHandler);
        function keyboardHideHandler(e){
            //alert('Goodnight, sweet prince');
            $scope.keyBoardUp = false;
        }
        function keyboardShowHandler(e){
            $scope.keyboardUp = true;
        }


        $scope.closeKeyboard = function () {
            //cordova.plugins.Keyboard.hide()
            document.activeElement.blur();
            document.activeElement.blur();
        };

        $scope.showInfo = function () {
            if ($rootScope.stateW == 'heroku') {
                var datenew = new Date()
                winston.log('info', $scope.$storage.userId + ", viewed liftselect info")
            }
            $scope.infoFlag = 5;
            var confirmPopup = $ionicPopup.show({
                title: 'Lift select',
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
                    winston.log('info', $scope.$storage.userId + ", closed liftselect after" + dateDiff)
                }
            });

        };
        //$scope.addLiftFlag = false;

        //Removal function. This feature is overkill for now.
        //$scope.$watch(function () { return $localStorage.selectedLiftNames; },function(){
        //    $scope.selectedLiftNames2 = $localStorage.selectedLiftNames;
        //
        //    var newList1 =$scope.liftData;
        //    angular.forEach($scope.liftData,function(lift,index){
        //        //console.log('inforit')
        //        if(lift.name && $scope.selectedLiftNames2.indexOf(lift.name)> -1){
        //            newList1.splice(index,1);
        //        }
        //    });
        //
        //    $scope.liftData = newList1;
        //
        //});


        $scope.liftDataRm = function () {
            //console.log($scope.liftData);
            return newList;
        }

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

        $scope.editSettings = function (name) {
            $scope.liftForSettingsChange = name;
            $scope.liftObjectForSettingsChange = localStore.getLiftByName(name);

            var confirmPopup = $ionicPopup.show({
                templateUrl: 'pop/pop-liftset.html',
                title: 'Settings for lift',
                scope: $scope,
                buttons: [
                    {
                        text: '<b >Done</b>',
                        type: 'button-dark',
                        onTap: function (e) {

                        }
                    }
                ]
            });
            confirmPopup.then(function (res) {
                //console.log('Tapped!', res);
            });
        };

        $scope.listSort = function (cat, val) {
            $ionicScrollDelegate.scrollTop();
            if (cat == 1) {
                if ($scope.attr1Pressed == val) {
                    $scope.attr1Pressed = '.'
                } else $scope.attr1Pressed = val;
            } else if (cat == 2) {
                if ($scope.attr2Pressed == val) {
                    $scope.attr2Pressed = '.'
                } else $scope.attr2Pressed = val;
            } else if (cat == 3) {
                if ($scope.attr3Pressed == val) {
                    $scope.attr3Pressed = '.'
                } else $scope.attr3Pressed = val;
            }
            $ionicScrollDelegate.scrollTop();
        };

        $scope.filterCustom = function (dontFlip) {//flag for whether or not you should switch
            $scope.reset();
            $scope.custom ? $scope.liftSelectorState = "All Lifts" : $scope.liftSelectorState = "User Entered Lifts"
            if (dontFlip && !$scope.custom) {
                $scope.custom = !$scope.custom;
            }
            else if (!dontFlip) {
                $scope.custom = !$scope.custom;
            }
            $timeout(function(){
                $ionicScrollDelegate.$getByHandle('liftBox').scrollTop();
            },100);

        };

        $scope.reset = function () {
            $scope.attr1Pressed = '.';
            $scope.attr2Pressed = '.';
            $scope.attr3Pressed = '.';
            $scope.selected = '.';
            //$scope.custom = false;
            $scope.removeFlagB = false;
            $scope.searchTextC = '';
            $scope.searchText = '';
        };
        // $scope.selected = 0;


        $scope.watch = function (searchText) {
            $scope.searchTextC = searchText;
        };

        $scope.$on('reset-liftselect', function () {
            $scope.reset();
        });

        $scope.isSelected = function (lift) {
            return $scope.selected === lift;
        };

        $scope.removeLiftEntry = function (index) {

            if ($scope.removeFlag) {
                localStore.removeLiftEntry(index);
                //$scope.removeFlag = false;
            }
            //$scope.removeFlag = false;
        };

        $scope.setLift = function (lift, index) {
            //console.log('remove', lift, index);
            if ($scope.removeFlagB) {
                localStore.removeLiftEntry(lift.name);
                return;
            }
            $scope.selected = lift;
            $scope.closeModal(lift, 0, 1);
        }

        $scope.backFrom = function () {
            $scope.closeModal('no change', 0, 1);

        }
        $scope.swipeLeftLift = function () {
            $scope.closeModal("", 0, 1);
        }

        //$scope.addLift = function () {
        //    $scope
        //}
        $scope.$on('edit-settings',function(event,args){
            $timeout(function () {
                $scope.editSettings(args.name);
            }, 500);
        });
        $scope.goToUrl = function (name, $ionicPlatform) {
            var namePlus = name.replace(/ /g, "+");
            var link = 'https://www.google.com/search?q=' + namePlus;
            //window.open( link, '_system', 'location=yes');
            var ref = window.open(link, '_blank', 'location=no');
            //ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
            //ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
            ref.addEventListener('loaderror', function (event) {
                alert('error: ' + event.message);
                ref.close();
            });
            //ref.addEventListener('exit', function(event) { alert(event.type); });

        }

        $scope.hideFlag = true;
        $scope.addLiftPopup = function () {
            //console.log("trying ");
            var addLiftPopup = $ionicPopup.show({
                template: '<input ng-readonly="!hideFlag" type="text" ng-model="newLiftName.name" maxlength="30">',
                title: 'Enter new lift name',
                subTitle: "Press 'View Added' Button to filter to your added lifts",
                scope: $scope,
                buttons: [
                    {text: 'Cancel',
                        onTap: function (e) {
                            $scope.hideFlag = false;
                            e.preventDefault();
                            $timeout(function() {//this was to prevent the keyboard from opening when this popup closed. WEIRD
                                addLiftPopup.close();
                            }, 300);
                            $timeout(function() {
                                $scope.hideFlag = true;
                            }, 500);

                        }//todo test this on device
                    },
                    {
                        text: '<b>Add</b>',
                        type: 'button-dark',
                        onTap: function (e) {
                            $scope.addLiftFlag = !$scope.addLiftFlag
                            if ($scope.newLiftName.name == '') {
                                //TODO grey out button until they type something
                                //TODO focus snap
                                e.preventDefault();
                            } else {

                                localStore.addLiftToList($scope.newLiftName.name);
                                // TODO get this to work properly

                                $scope.liftData = $localStorage.liftData;
                                $scope.filterCustom(true);
                                    //$rootScope.email.email = ''
                                $rootScope.$broadcast('edit-settings',{name:angular.copy($scope.newLiftName.name)});
                                //$scope.editSettings($scope.newLiftName.name);
                                $scope.newLiftName.name = '';
                                //e.preventDefault();

                            }

                        }
                    }
                ]
            });
            addLiftPopup.then(function (res) {
                $scope.addLiftFlag = !$scope.addLiftFlag
                //console.log('Tapped!', res);
            });

        };

    }
);