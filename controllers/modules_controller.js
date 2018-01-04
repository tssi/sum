define(['app','api'],function(app){
	app.register.controller('ModulesController',['$scope','api','$uibModal',function($scope,api,$uibModal){
		function LoadModules(){
			var success = function(response){
				$scope.Modules = response.data;
			};
			var error = function(response){
			};
			api.GET('modules',success,error);
		};
		function LoadGroups(){
			var success = function(response){
				$scope.Groups = response.data;
			};
			var error = function(response){
			};
			api.GET('groups',success,error);
		};
		function PasaLoad(){
			$scope.Rs = [];
			$scope.Gs = [];
			for (var i in $scope.Groups){
				for (var j in $scope.activeModule.revoked){
					if ($scope.activeModule.revoked){
						if ($scope.Groups[i].id == $scope.activeModule.revoked[j]){
							$scope.Rs.push($scope.activeModule.revoked[j]);
						}
					}
				}
				for (var k in $scope.activeModule.granted){
					if ($scope.activeModule.granted){
						if ($scope.Groups[i].id == $scope.activeModule.granted[k]){
							$scope.Gs.push($scope.activeModule.granted[k]);
						}
					}
				}
			}
			//console.log($scope.Rs);
			//console.log($scope.Gs);
		};
		$scope.init = function(){
			$scope.Modules = [];
			$scope.Groups = [];
			$scope.Message = null;
			LoadModules();
			LoadGroups();
		};
		$scope.SetActiveModule = function(module){
			$scope.activeModule = module;
			PasaLoad();
		};
		$scope.revoke = function(index){
			$scope.activeModule.revoked.push($scope.Gs[index]);
			$scope.Rs.push($scope.Gs[index]);
			//console.log($scope.activeModule.revoked);
			$scope.activeModule.granted.splice(index,1);
			$scope.Gs.splice(index,1);
		};
		$scope.grant = function(index){
			$scope.activeModule.granted.push($scope.Rs[index]);
			$scope.Gs.push($scope.Rs[index]);
			$scope.activeModule.revoked.splice(index,1);
			$scope.Rs.splice(index,1);
		};
		$scope.OpenModal = function(activemodule){
			var config = {
				templateUrl:"ModalContent.html",
				controller:"ModalController",
				resolve:{
					ActiveModule:function(){
						return activemodule;
					}
				}
			};
			var modal = $uibModal.open(config);
			var promise = modal.result;
			var callback = function(data){
								$scope.activeModule = data;
								$scope.Message = 'Modal closed';
								LoadModules();
								PasaLoad();
							};
			var fallback = function(data){
								$scope.Message = 'Modal dismissed';
							};
			promise.then(callback,fallback);
		};
	}]);
	app.register.controller('ModalController',['$scope','$uibModalInstance','api','ActiveModule',function($scope,$uibModalInstance,api,ActiveModule){
		$scope.ActiveModule = ActiveModule;
		$scope.closeModal = function(){
			//console.log($scope.ActiveModule);
			$uibModalInstance.dismiss();
		};
		$scope.confirmModal = function(){
			var data = $scope.ActiveModule;
			data.revoked = ['USER','ADMIN'];
			data.granted = [];
			//console.log(data);
			var success = function(response){
				$uibModalInstance.close(response.data);
			};
			var error = function(response){
				
			};
			api.POST('modules',data,success,error);
		};
	}]);
});