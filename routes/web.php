<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn() => view('index'));

Route::group(['prefix' => 'api'], function () {
    Route::prefix('auth')->group(function () {
        Route::post('/login', [\App\Http\Auth\AuthController::class, 'login']);
        Route::post('/logout', [\App\Http\Auth\AuthController::class, 'logout']);
        Route::post('/verify-session', [\App\Http\Auth\AuthController::class, 'verifySession']);
    });
    
    // Admin
    Route::get('/users', [\App\Http\Controllers\UserController::class, 'getUsers']);
    Route::post('/users', [\App\Http\Controllers\UserController::class, 'createUser']);
    Route::get('/products', [\App\Http\Controllers\ProductController::class, 'getProducts']);
    Route::get('/departments', [\App\Http\Controllers\DepartmentController::class, 'getDepartments']);
    Route::post('/departments', [\App\Http\Controllers\DepartmentController::class, 'createDepartment']);

    Route::group(['prefix' => 'export'], function () {
        Route::get('/users', [\App\Http\Controllers\ExportController::class, 'exportUsers']);
        Route::get('/products', [\App\Http\Controllers\ExportController::class, 'exportProducts']);
        Route::get('/departments', [\App\Http\Controllers\ExportController::class, 'exportDepartments']);
    });

    Route::group(['prefix' => 'printers'], function () {
        Route::get('/', [\App\Http\Controllers\PrinterController::class, 'getPrinters']);
    });


    // Global
    Route::get('/groups', [\App\Http\Controllers\GroupController::class, 'getGroups']);
    Route::post('/products', [\App\Http\Controllers\ProductController::class, 'createProduct']);
    Route::get('/products/{id?}', [\App\Http\Controllers\ProductController::class, 'getProduct']);
});