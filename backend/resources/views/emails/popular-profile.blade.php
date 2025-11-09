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
        }
        .header {
            background: linear-gradient(135deg, #FE3C72 0%, #FF655B 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 10px 10px;
        }
        .profile-info {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .profile-info h2 {
            margin-top: 0;
            color: #FE3C72;
        }
        .stat {
            font-size: 24px;
            font-weight: bold;
            color: #FE3C72;
            margin: 10px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 14px;
        }
        .emoji {
            font-size: 48px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Popular Profile Alert!</h1>
        <div class="emoji">🔥</div>
    </div>

    <div class="content">
        <h2>Great News!</h2>

        <p>A profile on your platform has become extremely popular!</p>

        <div class="profile-info">
            <h2>{{ $person->name }}</h2>
            <p><strong>Age:</strong> {{ $person->age }}</p>
            <p><strong>Location:</strong> {{ $person->location }}</p>
            <div class="stat">{{ $likesCount }} likes and counting!</div>
        </div>

        <p>This profile has reached the milestone of <strong>{{ $likesCount }} likes</strong>, making it one of the most popular profiles on your platform.</p>

        <p>You might want to:</p>
        <ul>
            <li>Review the profile for quality assurance</li>
            <li>Consider featuring this profile</li>
            <li>Analyze what makes this profile successful</li>
        </ul>

        <div class="footer">
            <p>This is an automated notification from your Tinder Clone application.</p>
            <p>Generated on {{ now()->format('F d, Y \a\t h:i A') }}</p>
        </div>
    </div>
</body>
</html>
