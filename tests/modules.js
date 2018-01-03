"use strict";
define(["model"],function($model){
	var meta =  {
					title:"Modules"
				};
	var data = [
				{
					"id": 1,
					"name":"Account Management",
					"url":"#/accounts/index",
					"revoked":['USER'],
					"granted":null
				},
				{
					"id": 2,
					"name":"Home",
					"url":"#/",
					"revoked":null,
					"granted":['ADMIN']
				},
				{
					"id": 3,
					"name":"Logout",
					"url":"#/logout",
					"revoked":['USER'],
					"granted":['ADMIN']
				},
				{
					"id": 4,
					"name":"Trip Lungs",
					"url":"#/trip",
					"revoked":null,
					"granted":['ADMIN','USER']
				}
	];
	var obj = {meta:meta,data:data};
	var modules = new $model(obj);
	return modules;
});