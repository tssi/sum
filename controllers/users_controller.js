define(['app','api'],function(app){
	app.register.controller('UserController',['$scope','api','$uibModal',function($scope,api,$uibModal){
		function getUsers(data){
			var success = function(response){
				$scope.Users = response.data;
				$scope.NextPage = response.meta.next;
				$scope.PrevPage = response.meta.prev;
				$scope.TotalItems = response.meta.count;
				$scope.LastItem = response.meta.page * response.meta.limit;
				$scope.FirstItem = $scope.LastItem - (response.meta.limit - 1);
				if ($scope.LastItem > $scope.TotalItems){
					$scope.LastItem = $scope.TotalItems;
				};
			};
			var error = function(response){
			};
			api.GET('users',data,success,error);
		};
		function getModules(){
			var successLoad = function(response){
				$scope.Modules = response.data;
			};
			var errorLoad = function(response){
			};
			api.GET('modules',successLoad,errorLoad);
		};
		function getGroups(){
			var successLoad = function(response){
				$scope.Groups = response.data;
			};
			var errorLoad = function(response){
			};
			api.GET('groups',successLoad,errorLoad);
		};
		function getActiveGroupsActiveModules(){
			$scope.activeGroup = null;
			$scope.activeModules = [];
			for(var i in $scope.Groups){
				var group = $scope.Groups[i];
				if($scope.activeUser.group_id == group.id){
					$scope.activeGroup = group;
				}
			}
			var am = $scope.activeGroup.modules;
			for(var j in $scope.Modules){
				var module = $scope.Modules[j];
				if(am.indexOf(module.id) != -1){
					$scope.activeModules.push(module);
				}
			}
		};
		$scope.init = function(){
			$scope.Users = [];
			$scope.Modules = [];
			$scope.Groups = [];
			$scope.ActivePage = 1;
			$scope.NextPage = null;
			$scope.PrevPage = null;
			$scope.activeGroup = null;
			$scope.activeUser = null;
			getUsers({page:$scope.ActivePage});
			getModules();
			getGroups();
		};
		$scope.navigatePage = function(page){
			$scope.ActivePage = page;
			getUsers({page:$scope.ActivePage});
		};
		$scope.SetActiveUser = function(user){
			$scope.activeUser = user;
			getActiveGroupsActiveModules();
		};
		$scope.filterUser = function(user){
			var searchBox = $scope.SearchUser;
			var keyword = new RegExp(searchBox,'i');
			var test = keyword.test(user.last_name);
			return !searchBox || test;
		};
		$scope.confirmSearch = function(){
			getUsers({page:1,keyword:$scope.SearchUser,fields:['last_name']});
			console.log($scope.ActivePage);
		}
		$scope.clearSearch = function(){
			$scope.SearchUser = "";
			getUsers({page:1});
		};
		$scope.removeUserInfo = function(){
			$scope.activeUser = null;
		};
		$scope.OpenModal = function(user,mode){
			if(!mode){
				mode = "add";
				$scope.Mode = mode;
			}
			$scope.Mode = mode;
			var group = $scope.Groups;
			var config = {
				templateUrl:"ModalContent.html",
				controller:"UserModalController",
				resolve:{
					User:function(){
						return user;
					},
					Groups:function(){
						return group;
					},
					Mode:function(){
						return mode;
					}
				}
			};
			var modal = $uibModal.open(config);
			var promise = modal.result;
			var callback = function(data){
				switch(data.action){
					case "reset":
						$scope.activeUser.password = data.password;
					break;
					case "register":
					case "edit":
						$scope.activeUser = data;
					break;
					case "activate":
					case "deactivate":
						$scope.activeUser = null;
					break;
				}
				getUsers();
				getActiveGroupsActiveModules();
			};
			var fallback = function(data){
			};
			promise.then(callback,fallback);
		};
	}]);
	app.register.controller('UserModalController',['$scope','$uibModalInstance','api','Groups','User','Mode',function($scope,$uibModalInstance,api,Groups,User,Mode){
		$scope.Groups = angular.copy(Groups);
		$scope.User = angular.copy(User);
		$scope.Mode = Mode;
		$scope.closeModal = function(){
			$uibModalInstance.dismiss();
		};
		$scope.confirmModal = function(mode){
			switch(mode){
				case "add":
					var data = $scope.User;
					data.action = "register";
				break;
				case "edit":
					var data = $scope.User;
					data.action = "edit";
				break;
				case "activate":
					var data = {id:$scope.User.id};
					data.action = "activate";
				break;
				case "deactivate":
					var data = {id:$scope.User.id};
					data.action = "deactivate";
				break;
			}
			var success = function(response){
				$uibModalInstance.close(response.data);
			};
			var error = function(response){
				
			};
			api.POST('users',data,success,error);
		};
		$scope.resetModal = function(){
			var data = {id:$scope.User.id,password:$scope.User.password};
			data.action = "reset";
			var success = function(response){
				$uibModalInstance.close(response.data);
			};
			var error = function(response){
				
			};
			api.POST('users',data,success,error);
		};
	}]);
});