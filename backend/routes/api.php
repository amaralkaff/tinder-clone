<?php

use App\Http\Controllers\Api\RecommendationController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\DislikeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Recommendations endpoint
Route::get('/recommendations', [RecommendationController::class, 'index']);

// Like endpoints
Route::post('/likes', [LikeController::class, 'store']);
Route::get('/liked-people', [LikeController::class, 'index']);

// Dislike endpoint
Route::post('/dislikes', [DislikeController::class, 'store']);
