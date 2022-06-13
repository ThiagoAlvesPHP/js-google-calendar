<!DOCTYPE html>
<html>

<head>
    <title>Google Calendar API</title>
    <meta charset="utf-8" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <link rel="stylesheet" href="./styles.css">
</head>

<body>
    <h3>Agendamento - Google Calendar</h3>
    <form id="form" action="">
        <div class="alert form"></div>
        <label class="form" for="description">Assunto</label>
        <textarea name="description" id="description" class="form" cols="30" rows="10"></textarea>
        <button class="btn form">Agendar</button>
    </form>
    <hr>

    <script defer src="https://apis.google.com/js/api.js"></script>
    <script defer src="https://accounts.google.com/gsi/client"></script>

    <script defer src="config-google.js"></script>
    <script defer src="google.js"></script>
</body>

</html>