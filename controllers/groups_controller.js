define(['app','api'],function(app){
	app.register.controller('GroupsController',['$scope','api','$uibModal',function($scope,api,$uibModal){
		function LoadGroups(){
			var successLoad = function(response){
				console.log(response);
				$scope.Groups = response.data;
			};
			var errorLoad = function(response){
			};
			api.GET('groups',successLoad,errorLoad);
		};
		$scope.init = function(){
			$scope.Groups = [];
			LoadGroups();
		};
		$scope.SetActiveGroup = function(group){
			$scope.activeGroup = group;
		};
		$scope.removeGroupInfo = function(){
			$scope.activeGroup = null;
		};
	}]);
});