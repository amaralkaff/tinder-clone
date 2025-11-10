<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Popular Profile Alert</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 5px;
        }
        .logo {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo img {
            max-width: 150px;
            height: auto;
        }
        h1 {
            color: #FE3C72;
            font-size: 24px;
            margin-bottom: 20px;
        }
        .profile-info {
            background: #f9f9f9;
            padding: 15px;
            border-left: 4px solid #FE3C72;
            margin: 20px 0;
        }
        .profile-info p {
            margin: 5px 0;
        }
        .likes-count {
            font-size: 20px;
            font-weight: bold;
            color: #FE3C72;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="{{ config('app.url') }}/tinder-logo.png" alt="Tinder Clone">
        </div>

        <h1>Popular Profile Alert</h1>

        <p>A profile has reached 50+ likes:</p>

        <div class="profile-info">
            <p><strong>Name:</strong> {{ $person->name }}</p>
            <p><strong>Age:</strong> {{ $person->age }}</p>
            <p><strong>Location:</strong> {{ $person->location }}</p>
            <p class="likes-count">{{ $likesCount }} likes</p>
        </div>

        <p>This profile has become popular and may need review.</p>

        <div class="footer">
            <p>Automated notification from Tinder Clone</p>
            <p>{{ now()->format('Y-m-d H:i:s') }}</p>
        </div>
    </div>
</body>
</html>
