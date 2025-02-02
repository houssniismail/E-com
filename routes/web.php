<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ShowProductsOfOneCategoryController;
use App\Http\Controllers\HomeController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;

Route::get('/account/orders', function () {
    return View('Pages.authPage.LoginRegister');
});

Route::get('/', [HomeController::class, 'index']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

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

    Route::get('/cart',[CartController::class,'index'])->name('cart');

});

Route::get('products-category/{id}', [ShowProductsOfOneCategoryController::class, 'show'])->name('products-category');



require __DIR__ . '/auth.php';
