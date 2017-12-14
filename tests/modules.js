"use strict";
define(["model"],function($model){
	var meta =  {
					title:"Modules"
				};
	var data = [
				{
					"id": 1,
					"name":"Account Management",
					"url":"#/accounts/index"
				},
				{
					"id": 2,
					"name":"Home",
					"url":"#/"
				},
				{
					"id": 3,
					"name":"Logout",
					"url":"#/logout"
				}
	];
	var obj = {meta:meta,data:data};
	var groups = new $model(obj);
	return groups;
});