<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RecommendationController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\DislikeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Authentication
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Recommendations endpoint
    Route::get('/recommendations', [RecommendationController::class, 'index']);

    // Like endpoints
    Route::post('/likes', [LikeController::class, 'store']);
    Route::get('/liked-people', [LikeController::class, 'index']);

    // Dislike endpoint
    Route::post('/dislikes', [DislikeController::class, 'store']);
});
