<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Person;
use App\Models\Picture;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Get the authenticated user's profile
     *
     * @OA\Get(
     *     path="/profile",
     *     tags={"Profile"},
     *     summary="Get user profile",
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Profile data",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", ref="#/components/schemas/Person")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Profile not found"
     *     )
     * )
     */
    public function show(Request $request): JsonResponse
    {
        $profile = $request->user()->person()->with('pictures')->first();

        if (!$profile) {
            return response()->json([
                'success' => false,
                'message' => 'Profile not found. Please create your profile first.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $profile,
        ]);
    }

    /**
     * Create a new profile for the authenticated user
     *
     * @OA\Post(
     *     path="/profile",
     *     tags={"Profile"},
     *     summary="Create user profile",
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"age", "location"},
     *             @OA\Property(property="name", type="string", example="John Doe", description="Display name (optional, defaults to registration name)"),
     *             @OA\Property(property="age", type="integer", example=25),
     *             @OA\Property(property="location", type="string", example="Jakarta")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Profile created successfully"
     *     ),
     *     @OA\Response(
     *         response=409,
     *         description="Profile already exists"
     *     )
     * )
     */
    public function store(Request $request): JsonResponse
    {
        // Check if user already has a profile
        if ($request->user()->person) {
            return response()->json([
                'success' => false,
                'message' => 'Profile already exists. Use PUT to update.',
            ], 409);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'age' => 'required|integer|min:18|max:100',
            'location' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        // Use provided name or default to registration name
        $profileName = $request->input('name', $request->user()->name);

        $profile = Person::create([
            'user_id' => $request->user()->id,
            'name' => $profileName,
            'age' => $request->age,
            'location' => $request->location,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Profile created successfully',
            'data' => $profile,
        ], 201);
    }

    /**
     * Update the authenticated user's profile
     *
     * @OA\Put(
     *     path="/profile",
     *     tags={"Profile"},
     *     summary="Update user profile",
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="John Doe"),
     *             @OA\Property(property="age", type="integer", example=25),
     *             @OA\Property(property="location", type="string", example="Jakarta")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Profile updated successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Profile not found"
     *     )
     * )
     */
    public function update(Request $request): JsonResponse
    {
        $profile = $request->user()->person;

        if (!$profile) {
            return response()->json([
                'success' => false,
                'message' => 'Profile not found. Please create your profile first.',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'age' => 'sometimes|required|integer|min:18|max:100',
            'location' => 'sometimes|required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $profile->update($request->only(['name', 'age', 'location']));

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => $profile->fresh(),
        ]);
    }

    /**
     * Upload a profile picture
     *
     * @OA\Post(
     *     path="/profile/pictures",
     *     tags={"Profile"},
     *     summary="Upload profile picture",
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"image"},
     *                 @OA\Property(property="image", type="string", format="binary"),
     *                 @OA\Property(property="order", type="integer", example=1)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Picture uploaded successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Profile not found"
     *     )
     * )
     */
    public function uploadPicture(Request $request): JsonResponse
    {
        $profile = $request->user()->person;

        if (!$profile) {
            return response()->json([
                'success' => false,
                'message' => 'Profile not found. Please create your profile first.',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120', // max 5MB
            'order' => 'sometimes|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        // Store the image
        $image = $request->file('image');
        $path = $image->store('profiles', 'public');

        // Get the next order number if not provided
        $order = $request->input('order', $profile->pictures()->max('order') + 1);

        $picture = Picture::create([
            'person_id' => $profile->id,
            'image_url' => '/storage/' . $path,
            'order' => $order,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Picture uploaded successfully',
            'data' => $picture,
        ], 201);
    }

    /**
     * Delete a profile picture
     *
     * @OA\Delete(
     *     path="/profile/pictures/{id}",
     *     tags={"Profile"},
     *     summary="Delete profile picture",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Picture deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Picture not found"
     *     )
     * )
     */
    public function deletePicture(Request $request, $id): JsonResponse
    {
        $profile = $request->user()->person;

        if (!$profile) {
            return response()->json([
                'success' => false,
                'message' => 'Profile not found.',
            ], 404);
        }

        $picture = Picture::where('person_id', $profile->id)
            ->where('id', $id)
            ->first();

        if (!$picture) {
            return response()->json([
                'success' => false,
                'message' => 'Picture not found.',
            ], 404);
        }

        // Delete the file from storage
        $imagePath = str_replace('/storage/', '', $picture->image_url);
        Storage::disk('public')->delete($imagePath);

        $picture->delete();

        return response()->json([
            'success' => true,
            'message' => 'Picture deleted successfully',
        ]);
    }
}
