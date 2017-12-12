define(['app','api'],function(app){
	app.register.controller('UserController',['$scope','api',function($scope,api){
		function LoadUsers(){
			var successLoad = function(response){
				$scope.Users = response.data;
			};
			var errorLoad = function(response){
				
			};
			api.GET('userses',successLoad,errorLoad);
		};
		$scope.init = function(){
			$scope.Users = [];
			LoadUsers();
		};
		$scope.SetActiveUser = function(user){
				console.log(user);
			$scope.activeUser = user;
		};

	}]);
});