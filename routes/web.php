<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\ShowProductsOfOneCategoryController;
use App\Http\Controllers\HomeController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\MerchantController;
use App\Http\Controllers\AccountantController;

Route::get('/account/orders', function () {
    return View('Pages.authPage.LoginRegister');
});

Route::get('/', [HomeController::class, 'index']);


Route::middleware('auth')->group(function(){
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/products', [ProductController::class, 'index'])->name('product.index');
    Route::get('/product/create', [ProductController::class, 'create']);
    Route::post('/product/store', [ProductController::class, 'store']);
    Route::get('/product/show/{id}', [ProductController::class, 'show']);
    Route::get('/product/{id}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/product/{id}', [ProductController::class, 'update'])->name('product.update');

    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/category/create', [CategoryController::class, 'create']);
    Route::post('/category/store', [CategoryController::class, 'store']);
    Route::get('/category/{id}/show', [CategoryController::class, 'show']);
    Route::get('/category/{id}/edit', [CategoryController::class, 'edit']);
    Route::delete('/category/{id}', [CategoryController::class, 'destroy'])->name('category.delete');

    Route::get('/customer/dashboard', [CustomerController::class, 'index'])->name('customer.dashboard');
    Route::get('/cart',[CartController::class,'index'])->name('cart');
    Route::post('/sale',[SaleController::class,'store'])->name('sale');
    Route::delete('/sale/{id}', [SaleController::class, 'destroy'])->name('sales.destroy');
    Route::get('/sales',[SaleController::class,'index'])->name('sale.index');

   
    Route::delete('/sale/{id}', [SaleController::class, 'destroy'])->name('sales.destroy');
    Route::get('/sales',[SaleController::class,'index'])->name('sale.index');
});

Route::middleware(['auth','verified','role:admin'])->group(function(){
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
});

Route::middleware(['auth','verified','role:merchant'])->group(function(){
    Route::get('/merchant/dashboard', [MerchantController::class, 'index'])->name('merchant.dashboard');
});

Route::middleware(['auth','verified','role:customer'])->group(function(){
    Route::get('/customer/dashboard', [CustomerController::class, 'index'])->name('customer.dashboard');
    Route::get('/cart',[CartController::class,'index'])->name('cart');
    Route::post('/sale',[SaleController::class,'store'])->name('sale');
    Route::delete('/sale/{id}', [SaleController::class, 'destroy'])->name('sales.destroy');
    Route::get('/sales',[SaleController::class,'index'])->name('sale.index');
});

Route::middleware(['auth','verified','role:accountant'])->group(function(){
    Route::get('/accountant/dashboard', [AccountantController::class, 'index'])->name('accountant.dashboard');
});


Route::get('products-category/{id}', [ShowProductsOfOneCategoryController::class, 'show'])->name('products-category');



require __DIR__ . '/auth.php';
