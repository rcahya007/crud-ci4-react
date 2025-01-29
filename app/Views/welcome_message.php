<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>CRUD CI REACT TAILWIND</title>
    <meta name="description" content="The small framework with powerful features">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/png" href="/favicon.ico">
    <script>
        // Kirim data PHP ke React sebagai variabel global
        window.APP_DATA = <?= json_encode($data ?? []) ?>;
    </script>
</head>

<body>
</body>

</html>