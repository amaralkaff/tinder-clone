<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Like;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class LikeController extends Controller
{
    /**
     * Like a person
     *
     * @OA\Post(
     *     path="/likes",
     *     tags={"Likes"},
     *     summary="Like a person",
     *     description="Create a like relationship between two people",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"liker_id", "liked_id"},
     *             @OA\Property(property="liker_id", type="integer", example=1),
     *             @OA\Property(property="liked_id", type="integer", example=2)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Person liked successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Person liked successfully"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=409,
     *         description="Already liked this person",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'liker_id' => 'required|integer|exists:people,id',
            'liked_id' => 'required|integer|exists:people,id|different:liker_id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        // Check if already liked
        $existingLike = Like::where('liker_id', $request->liker_id)
                           ->where('liked_id', $request->liked_id)
                           ->first();

        if ($existingLike) {
            return response()->json([
                'success' => false,
                'message' => 'Already liked this person',
            ], 409);
        }

        $like = Like::create([
            'liker_id' => $request->liker_id,
            'liked_id' => $request->liked_id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Person liked successfully',
            'data' => $like,
        ], 201);
    }

    /**
     * Get list of people the user has liked
     *
     * @OA\Get(
     *     path="/liked-people",
     *     tags={"Likes"},
     *     summary="Get list of liked people",
     *     description="Returns paginated list of people that the user has liked",
     *     @OA\Parameter(
     *         name="user_id",
     *         in="query",
     *         description="ID of the user",
     *         required=true,
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
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Missing user_id parameter",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $userId = $request->input('user_id');
        $perPage = $request->input('per_page', 15);

        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => 'user_id is required',
            ], 400);
        }

        $likedPeople = Person::whereIn('id', function($query) use ($userId) {
            $query->select('liked_id')
                  ->from('likes')
                  ->where('liker_id', $userId);
        })
        ->with('pictures')
        ->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $likedPeople->items(),
            'pagination' => [
                'current_page' => $likedPeople->currentPage(),
                'per_page' => $likedPeople->perPage(),
                'total' => $likedPeople->total(),
                'last_page' => $likedPeople->lastPage(),
            ],
        ]);
    }
}
