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

Route::get('/user/types', 'UserTypeController@list');

Route::post('/user/login', 'UserTypeController@dologin');

Route::get('/menus/list', 'MenusController@list');

Route::get('/menus/get/{id}', 'MenusController@item');

Route::get('/payment/pay/{cart_id}', 'PaymentController@makePayment');

Route::get('/cart/get/{id}', 'CartController@getcart');