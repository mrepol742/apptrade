<?php

use Illuminate\Support\Facades\Route;
use App\Http\Auth\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\SalesLockController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\PrinterController;

Route::get('/', fn() => view('index'));

Route::group(['prefix' => 'api'], function () {
    Route::prefix('auth')->group(function () {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/verify-session', [AuthController::class, 'verifySession']);
    });

    // Admin
    Route::get('/users', [UserController::class, 'getUsers']);
    Route::post('/users', [UserController::class, 'createUser']);
    Route::get('/products', [ProductController::class, 'getProducts']);
    Route::get('/departments', [DepartmentController::class, 'getDepartments']);
    Route::post('/departments', [DepartmentController::class, 'createDepartment']);

    Route::group(['prefix' => 'export'], function () {
        Route::get('/users', [ExportController::class, 'exportUsers']);
        Route::get('/products', [ExportController::class, 'exportProducts']);
        Route::get('/departments', [ExportController::class, 'exportDepartments']);
    });

    // Sales lock cashier
    Route::get('/sales-lock', [SalesLockController::class, 'getSalesLock']);
    Route::post('/sales-lock', [SalesLockController::class, 'createSalesLock']);

    // Global
    Route::get('/groups', [GroupController::class, 'getGroups']);
    Route::post('/products', [ProductController::class, 'createProduct']);
    Route::get('/products/{id?}', [ProductController::class, 'getProduct']);
    Route::post('/products/search', [ProductController::class, 'search']);
    Route::post('/sales/checkout', [SalesController::class, 'checkout']);
    Route::get('/sales', [SalesController::class, 'getSales']);

    Route::post('/printer', [PrinterController::class, 'setPrinter']);
    Route::post('/printer/status', [PrinterController::class, 'setStatus']);
});
