<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dislike;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class DislikeController extends Controller
{
    /**
     * Dislike a person
     *
     * @OA\Post(
     *     path="/dislikes",
     *     tags={"Dislikes"},
     *     summary="Dislike a person",
     *     description="Create a dislike relationship between two people",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"disliker_id", "disliked_id"},
     *             @OA\Property(property="disliker_id", type="integer", example=1),
     *             @OA\Property(property="disliked_id", type="integer", example=2)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Person disliked successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Person disliked successfully"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=409,
     *         description="Already disliked this person",
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
        $profile = $request->user()->person;

        if (!$profile) {
            return response()->json([
                'success' => false,
                'message' => 'Profile not found. Please create your profile first.',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'disliked_id' => 'required|integer|exists:people,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        // Check if already disliked
        $existingDislike = Dislike::where('disliker_id', $profile->id)
                                 ->where('disliked_id', $request->disliked_id)
                                 ->first();

        if ($existingDislike) {
            return response()->json([
                'success' => false,
                'message' => 'Already disliked this person',
            ], 409);
        }

        $dislike = Dislike::create([
            'disliker_id' => $profile->id,
            'disliked_id' => $request->disliked_id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Person disliked successfully',
            'data' => $dislike,
        ], 201);
    }
}
