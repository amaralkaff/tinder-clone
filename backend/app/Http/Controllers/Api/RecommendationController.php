<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class RecommendationController extends Controller
{
    /**
     * Get paginated list of recommended people
     *
     * @OA\Get(
     *     path="/recommendations",
     *     tags={"Recommendations"},
     *     summary="Get paginated list of recommended people",
     *     description="Returns a list of people excluding those already liked or disliked by the user",
     *     @OA\Parameter(
     *         name="user_id",
     *         in="query",
     *         description="ID of the current user (optional)",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         description="Number of items per page (default: 15)",
     *         required=false,
     *         @OA\Schema(type="integer", default=15)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Person")
     *             ),
     *             @OA\Property(property="pagination", ref="#/components/schemas/Pagination")
     *         )
     *     )
     * )
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 15);
        $userId = $request->user()->id;

        $query = Person::with('pictures');

        // Exclude people the user has already liked or disliked
        $query->whereNotIn('id', function($q) use ($userId) {
            $q->select('liked_id')
              ->from('likes')
              ->where('liker_id', $userId);
        })
        ->whereNotIn('id', function($q) use ($userId) {
            $q->select('disliked_id')
              ->from('dislikes')
              ->where('disliker_id', $userId);
        })
        ->where('id', '!=', $userId);

        $people = $query->orderBy('created_at', 'desc')
                       ->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $people->items(),
            'pagination' => [
                'current_page' => $people->currentPage(),
                'per_page' => $people->perPage(),
                'total' => $people->total(),
                'last_page' => $people->lastPage(),
            ],
        ]);
    }
}
