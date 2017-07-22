<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/goodsreceipt/list', 'GoodsReceiptController@index');
Route::get('/goodsreceipt/create', 'GoodsReceiptController@store');
Route::get('/goodsreceipt/delete/{id}', 'GoodsReceiptController@destroy');


Route::get('/items', 'MaterialMasterController@index');
Route::get('/items/{code}', 'MaterialMasterController@index');
Route::post('/warehouse/submit', 'WarehouseController@submit');
Route::get('/warehouse', 'WarehouseController@index');
Route::get('/warehouse/{code}', 'WarehouseController@index');

