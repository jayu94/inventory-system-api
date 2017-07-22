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
Route::get('/goodsreceipt/items', 'GoodsReceiptController@index');
Route::get('/goodsreceipt/edit/{id}', 'GoodsReceiptController@show');