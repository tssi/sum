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
			//console.log($scope.Groups[i].id);
			//console.log($scope.activeModule.revoked);
					if ($scope.Groups[i].id == $scope.activeModule.revoked){
						$scope.PasaLoadGroups.push($scope.activeModule.revoked);
					}
					if ($scope.Groups[i].id == $scope.activeModule.granted){
						$scope.PasaLoadGroups.push($scope.activeModule.granted);
					}
				}
			//}
			console.log($scope.PasaLoadGroups);
		};
		$scope.init = function(){
			$scope.Modules = [];
			$scope.Groups = [];
			LoadModules();
			LoadGroups();
		};
		$scope.SetActiveModule = function(module){
			$scope.activeModule = module;
			PasaLoad();
		};
	}]);
	app.register.controller('ModalController',['$scope','$uibModalInstance','api',function($scope,$uibModalInstance,api){
	}]);
});