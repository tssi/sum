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
			$scope.PasaLoadGroups = [];
			//if ($scope.Groups.id){
				for (var i in $scope.Groups){
					if ($scope.Groups[i].id == $scope.activeModule.revoked){
						$scope.PasaLoadGroups.push($scope.Groups[i].id);
						//$scope.Levo = 'Grant';
					}
					if ($scope.Groups[i].id == $scope.activeModule.granted){
						$scope.PasaLoadGroups.push($scope.Groups[i].id);
						//$scope.Levo = 'Revoke';
					}
				}
			//}
			console.log($scope.PasaLoadGroups);
		};
		$scope.init = function(){
			$scope.Modules = [];
			$scope.Groups = [];
			$scope.Levo = '';
			LoadModules();
			LoadGroups();
		};
		$scope.SetActiveModule = function(module){
			$scope.activeModule = module;
			PasaLoad();
		};
		$scope.OpenModal = function(){
			var config = {
				templateUrl:"ModalContent.html",
				controller:"ModalController"
			};
			var modal = $uibModal.open(config);
			var promise = modal.result;
			var callback = function(data){
								$scope.Message = 'Modal closed';
							};
			var fallback = function(data){
								$scope.Message = 'Modal dismissed';
							};
			promise.then(callback,fallback);
		};
	}]);
	app.register.controller('ModalController',['$scope','$uibModalInstance','api',function($scope,$uibModalInstance,api){
		$scope.closeModal = function(){
			$uibModalInstance.dismiss();
		};
		$scope.confirmModal = function(){
		};
	}]);
});