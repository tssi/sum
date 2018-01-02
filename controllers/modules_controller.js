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
		$scope.init = function(){
			$scope.Modules = [];
			$scope.Groups = [];
			LoadModules();
			LoadGroups();
		};
		$scope.SetActiveModule = function(module){
			$scope.activeModule = module;
		};
	}]);
	app.register.controller('ModalController',['$scope','$uibModalInstance','api',function($scope,$uibModalInstance,api){
	}]);
});