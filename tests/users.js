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
				},
				{
				  "id": 6,
				  "last_name": "a",
				  "first_name": "Enrika",
				  "middle_initial": "T",
				  "username": "betis",
				  "password": "password",
				  "status": "ACTIVE",
				  "group_id": "USER"
				},
				{
				  "id": 7,
				  "last_name": "b",
				  "first_name": "Enrika",
				  "middle_initial": "T",
				  "username": "betis",
				  "password": "password",
				  "status": "ACTIVE",
				  "group_id": "USER"
				},
				{
				  "id": 8,
				  "last_name": "c",
				  "first_name": "Enrika",
				  "middle_initial": "T",
				  "username": "betis",
				  "password": "password",
				  "status": "ACTIVE",
				  "group_id": "USER"
				},
				{
				  "id": 9,
				  "last_name": "d",
				  "first_name": "Enrika",
				  "middle_initial": "T",
				  "username": "betis",
				  "password": "password",
				  "status": "INACTIVE",
				  "group_id": "USER"
				},
				{
				  "id": 10,
				  "last_name": "e",
				  "first_name": "Enrika",
				  "middle_initial": "T",
				  "username": "betis",
				  "password": "password",
				  "status": "ACTIVE",
				  "group_id": "USER"
				},
				{
				  "id": 11,
				  "last_name": "f",
				  "first_name": "Enrika",
				  "middle_initial": "T",
				  "username": "betis",
				  "password": "password",
				  "status": "ACTIVE",
				  "group_id": "USER"
				},
				{
				  "id": 12,
				  "last_name": "g",
				  "first_name": "Enrika",
				  "middle_initial": "T",
				  "username": "betis",
				  "password": "password",
				  "status": "ACTIVE",
				  "group_id": "USER"
				},
				{
				  "id": 13,
				  "last_name": "h",
				  "first_name": "Enrika",
				  "middle_initial": "T",
				  "username": "betis",
				  "password": "password",
				  "status": "ACTIVE",
				  "group_id": "USER"
				},
				{
				  "id": 14,
				  "last_name": "i",
				  "first_name": "Enrika",
				  "middle_initial": "T",
				  "username": "betis",
				  "password": "password",
				  "status": "ACTIVE",
				  "group_id": "USER"
				}
	];
	var obj = {meta:meta,data:data};
	var User = new $model(obj);
	User.POST = function(data){
		switch(data.action){
			case 'login':
				var __MSG = 'Invalid username/password';
				var __USER = {users:null};
				var users =  User.data;
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
				data.status = "ACTIVE";
				return {success:User.save(data)};
			break;
			case 'edit':
				return {success:User.save(data)};
			break;
			case 'reset':
				return {success:User.save(data)};
			break;
			case 'activate':
				data.status = "ACTIVE";
				return {success:User.save(data)};
			break;
			case 'deactivate':
				data.status = "INACTIVE";
				return {success:User.save(data)};
			break;
		}
	}
	return User;
});