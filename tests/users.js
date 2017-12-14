"use strict";
define(["model"],function($model){
	/*var user =  new $model(
			{
			  "meta": {
			    "title": "Users"
			  },
			  "data": [
			    {
			      "id": 0,
				 "username":"admin",
				 "password":"password",
				 "user_type":"admin"
			    },
			    {
			      "id": 1,
			     "username":"user",
				 "password":"password",
				 "user_type":"user"
			    }
			  ]
			}
		);*/
	var meta =  {
					title:"Users"
				};
	var data = [
				{
				  "id": 1,
				  "last_name": "Dela Cruz",
				  "first_name": "Juan",
				  "middle_name": "A",
				  "username": "admin",
				  "password": "password",
				  "status": "ACTIVE",   
				  "group_id": "ADMIN"
				},
				{
				  "id": 2,
				  "last_name": "NoMasChenko",
				  "first_name": "Vasyl",
				  "middle_name": "X",
				  "username": "matrix",
				  "password": "password",
				  "status": "INACTIVE",
				  "group_id": "ADMIN"
				},
				{
				  "id": 3,
				  "last_name": "Nutze",
				  "first_name": "Xtian",
				  "middle_name": "C",
				  "username": "habhab",
				  "password": "password",
				  "status": "LOCKED",
				  "group_id": "ADMIN"
				},
				{
				  "id": 4,
				  "last_name": "Martinez",
				  "first_name": "Melchor",
				  "middle_name": "E",
				  "username": "kuya mel",
				  "password": "password",
				  "status": "ACTIVE",
				  "group_id": "ADMIN"
				}
	];
	var obj = {meta:meta,data:data};
	var users = new $model(obj);
		users.POST = function(data){
			switch(data.action){
				case 'login':
					var __MSG = 'Invalid username/password';
					var __USER = {users:null};
					var users =  users.data;
					for(var index in users){
						var u = users[index];
						if(u.username==data.username && u.password==data.password){
							__USER.users = angular.copy(u);
							__MSG = 'Login successful!';
						}
					}
					return {success:{data:__USER,message:__MSG}};
				break;
				case 'logout':
					var __USER = {users:null};
					var __MSG = 'Logout successful!';
					return {success:{data:__USER,message:__MSG}};
				break;
				case 'register':
					return {success:users.save(data)};
				break;
			}
			
		}
	return users;
});