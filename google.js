// document.getElementById('authorize_button').style.visibility = 'hidden';
// document.getElementById('signout_button').style.visibility = 'hidden';

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
    gapi.load('client', intializeGapiClient);
}
gapiLoaded();

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function intializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
    });
    gisInited = true;
}
gisLoaded();

/**
 *  evento de click
 * capturar dados de formulario para registro de calendario
 */
$(document).on('click', '.btn', function(event){
    event.preventDefault();
    let form = document.querySelector('#form');

    if (form.description.value != '') {
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw (resp);
            }

            let data = {
                description: form.description.value
            }
    
            setEvent(data);
        };

        if (gapi.client.getToken() === null) {
            // Solicitar ao usuário que selecione uma Conta do Google e solicitar consentimento para compartilhar seus dados
            // ao estabelecer uma nova sessão.
            tokenClient.requestAccessToken({
                    prompt: 'consent'
            });
        } else {
            // Ignorar a exibição do seletor de contas e da caixa de diálogo de consentimento para uma sessão existente.
            tokenClient.requestAccessToken({
                prompt: ''
            });
        }
    } else {
        $('.alert').addClass('alert-action');
        $('.alert').text('Preencha os campos!');
    }
});

/**
 *  Desconectar o usuário ao clicar no botão.
 */
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
    }
}

/**
 * Listar eventos criados 
 */
async function listUpcomingEvents() {
    let response;
    try {
        const request = {
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime',
        };
        response = await gapi.client.calendar.events.list(request);
    
        const events = response.result.items;

        if (!events || events.length == 0) {
            document.getElementById('content').innerText = 'No events found.';
            return;
        }
        const output = events.reduce(
            (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
            'Events:\n');

        document.getElementById('content').html = output;
        
    } catch (err) {
        document.getElementById('content').html = err.message;
        return;
    }
}

// adicionar evento em calendario
async function setEvent(params) {

    var event = {
        'summary': `${summary}`,
        'location': `${local}`,
        'description': `${params.description}`,
        'start': {
            'dateTime': upDateDays((new Date()).toISOString()),
            'timeZone': 'America/Sao_Paulo'
        },
        'end': {
            'dateTime': upDateDays(upDateHs((new Date()).toISOString())),
            'timeZone': 'America/Sao_Paulo'
        },
        'attendees': [
            {'email': `${emailPrimary}`}
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 60}
            ]
        }
    };
      
    var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
    });         

    request.execute(function(event) {
        if (event.status === 'confirmed') {
            let link = `<a href="${event.htmlLink}" target="_blank">Link</a>`;
            $('.alert').addClass('alert-action-success');
            $('.alert').html(link);
        } else {
            $('.alert').addClass('alert-action');
            $('.alert').text('Erro no envio!');
        }
    });
}


// adicionar horas em data
function upDateHs(params)
{
    var time = new Date(params);
    var newDate = new Date(params);
    newDate.setHours(time.getHours() + 1);

    return newDate;
}
// adcionar dias em data
function upDateDays(params)
{
    var time = new Date(params);
    var newDate = new Date();
    newDate.setDate(time.getDate() + 2);

    return newDate;
}