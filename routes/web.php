<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn() => view('index'));

Route::group(['prefix' => 'api'], function () {
    Route::post('/login', [\App\Http\Auth\AuthController::class, 'login']);
    
    // Admin
    Route::get('/users', [\App\Http\Controllers\UserController::class, 'getUsers']);
    Route::post('/users', [\App\Http\Controllers\UserController::class, 'createUser']);
    Route::get('/products', [\App\Http\Controllers\ProductController::class, 'getProducts']);
    Route::get('/departments', [\App\Http\Controllers\DepartmentController::class, 'getDepartments']);
    Route::post('/departments', [\App\Http\Controllers\DepartmentController::class, 'createDepartment']);

    Route::group(['prefix' => 'export'], function () {
        Route::get('/users', [\App\Http\Controllers\ExportController::class, 'exportUsers']);
        Route::get('/products', [\App\Http\Controllers\ExportController::class, 'exportProducts']);
    });


    // Global
    Route::get('/groups', [\App\Http\Controllers\GroupController::class, 'getGroups']);
    Route::post('/products', [\App\Http\Controllers\ProductController::class, 'createProduct']);
});

// Catch-all route to redirect all other client routes to the index view
Route::fallback(fn() => view('index'));