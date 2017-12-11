define(['app'],function(app){
	app.register.controller('KemController',['$scope',function($scope){
		function LoadUsers(){
				var successLoad = function(response){
					$scope.Users = response.data;
				};
				var errorLoad = function(response){
					
				};
				api.GET('users',successLoad,errorLoad);
			};
			$scope.init = function(){
				$scope.Users = [];
				LoadUsers();
			};

	}]);
});