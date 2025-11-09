<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *     title="Tinder-like App API",
 *     version="1.0.0",
 *     description="API documentation for a Tinder-like dating application",
 *     @OA\Contact(
 *         name="API Support",
 *         email="support@example.com"
 *     )
 * )
 * @OA\Server(
 *     url="/api",
 *     description="API Server"
 * )
 * @OA\Schema(
 *     schema="Person",
 *     type="object",
 *     required={"id", "name", "age", "location"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="John Doe"),
 *     @OA\Property(property="age", type="integer", example=25),
 *     @OA\Property(property="location", type="string", example="New York, USA"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time"),
 *     @OA\Property(
 *         property="pictures",
 *         type="array",
 *         @OA\Items(ref="#/components/schemas/Picture")
 *     )
 * )
 * @OA\Schema(
 *     schema="Picture",
 *     type="object",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="person_id", type="integer", example=1),
 *     @OA\Property(property="image_url", type="string", example="https://example.com/image.jpg"),
 *     @OA\Property(property="order", type="integer", example=0),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 * @OA\Schema(
 *     schema="Pagination",
 *     type="object",
 *     @OA\Property(property="current_page", type="integer", example=1),
 *     @OA\Property(property="per_page", type="integer", example=15),
 *     @OA\Property(property="total", type="integer", example=25),
 *     @OA\Property(property="last_page", type="integer", example=2)
 * )
 * @OA\Schema(
 *     schema="ErrorResponse",
 *     type="object",
 *     @OA\Property(property="success", type="boolean", example=false),
 *     @OA\Property(property="message", type="string", example="Error message"),
 *     @OA\Property(property="errors", type="object")
 * )
 */
abstract class Controller
{
    //
}
