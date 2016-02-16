/// <reference path="./../../../typings/tsd.d.ts" />
//import * as sinon from "sinon";
//import * as express from "express";
//
//
//import {HomeController} from "./../../../src/controller/home/homeController";
//import {WeatherServiceInterface} from "./../../../src/library/services/weather/weatherServiceInterface";
//
//describe('HomeController Test', () => {
//   it('index should not throw exception', () => {
//
//       var mockWeatherServiceInterface = sinon.mock('WeatherServiceInterface');
//       var mockResponse = sinon.mock(express.Response);
//       var mockRequest = sinon.mock(express.Request);
//       mockRequest.expects("render").once();
//       var homeController = new HomeController(mockWeatherServiceInterface);
//       homeController.index(mockRequest, mockResponse);
//   });
//
//    it('index should throw exception', () => {
//
//        var mockWeatherServiceInterface = sinon.mock(WeatherServiceInterface);
//        var mockResponse = sinon.mock(express.Response);
//        var mockRequest = sinon.mock(express.Request);
//        mockRequest.stub("render").throwError();
//        var homeController = new HomeController(mockWeatherServiceInterface);
//        homeController.index(mockRequest, mockResponse);
//        sinon.assert.fail("expect to fail");
//    })
//});
