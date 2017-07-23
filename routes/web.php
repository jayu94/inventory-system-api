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

Route::get('/goodsreceipt', 'GoodsReceiptController@index');
//Route::get('/goodsreceipt/', 'GoodsReceiptController@index');
Route::post('/goodsreceipt', 'GoodsReceiptController@store');
Route::put('/goodsreceipt', 'GoodsReceiptController@store');
Route::get('/goodsreceipt/delete/{id}', 'GoodsReceiptController@destroy');


Route::get('/items/', 'MaterialMasterController@index');
Route::get('/items/{code}', 'MaterialMasterController@index');
Route::post('/warehouse/submit', 'WarehouseController@submit');
Route::get('/warehouse/', 'WarehouseController@index');
Route::get('/warehouse/{code}', 'WarehouseController@index');
Route::get('/turnoverrequest/{code}', 'TurnoverRequestController@index');
Route::get('/turnoverrequest/', 'TurnoverRequestController@index');
Route::post('/turnoverrequest/submit', 'TurnoverRequestController@submit');
Route::post('/returntosupplier/submit', 'ReturnToSupplierController@submit');
Route::get('/returntosupplier/', 'ReturnToSupplierController@index');
Route::get('/returntosupplier/{code}', 'ReturnToSupplierController@index');
Route::post('/physicalinventorycount/submit', 'PhysicalInventoryCountController@submit');
Route::get('/physicalinventorycount/', 'PhysicalInventoryCountController@index');
Route::get('/physicalinventorycount/{code}', 'PhysicalInventoryCountController@index');



Route::get('/goodsreceipt/items', 'GoodsReceiptController@index');
Route::get('/goodsreceipt/edit/{id}', 'GoodsReceiptController@show');
