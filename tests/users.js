"use strict";
define(["model"],function($model){
	var meta =  {
					title:"Users"
				};
	var data = [
				{
				  "id": 1,
				  "last_name": "Martinez",
				  "first_name": "Melchor",
				  "middle_initial": "E",
				  "username": "kuya mel",
				  "password": "password",
				  "status": "ACTIVE",
				  "group_id": "ADMIN"
				},
				{
				  "id": 2,
				  "last_name": "NoMasChenko",
				  "first_name": "Vasyl",
				  "middle_initial": "X",
				  "username": "matrix",
				  "password": "password",
				  "status": "INACTIVE",
				  "group_id": "ADMIN"
				},
				{
				  "id": 3,
				  "last_name": "Nutze",
				  "first_name": "Xtian",
				  "middle_initial": "C",
				  "username": "habhab",
				  "password": "password",
				  "status": "ACTIVE",
				  "group_id": "ADMIN"
				},
				{
				  "id": 4,
				  "last_name": "Arago",
				  "first_name": "Aaron",
				  "middle_initial": "K",
				  "username": "petlags",
				  "password": "password",
				  "status": "ACTIVE",
				  "group_id": "USER"
				},
				{
				  "id": 5,
				  "last_name": "Quiambao",
				  "first_name": "Enrika",
				  "middle_initial": "T",
				  "username": "betis",
				  "password": "password",
				  "status": "LOCKED",
				  "group_id": "USER"
				}
	];
	var obj = {meta:meta,data:data};
	var users = new $model(obj);
		users.POST = function(data){
			switch(data.action){
				case 'login':
					var __MSG = 'Invalid username/password';
					var __USER = {users:null};
					var users =  this.data;
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
					//data.status="ACTIVE";
					return {success:this.save(data)};
				break;
				/*case 'add':
					data.status="ACTIVE";
					return {success:this.save(data)};
				break;*/
				case 'edit':
					data.status="ACTIVE";
					return {success:this.save(data)};
				break;
				case 'reset':
					return {success:this.save(data)};
				break;
				case 'deactivate':
					return {success:this.save(data)};
				break;
			}
		}
	return users;
});