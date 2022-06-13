const CLIENT_ID = '1089260019866-1khls7ucdp5bs8h14l8j8dio01kcjs0k.apps.googleusercontent.com';
const API_KEY = 'AIzaSyB9L1W-LYF1csM9GqcTFxWZJex8eZ_7fnw';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

let tokenClient;
let gapiInited = false;
let gisInited = false;

const summary = 'Agendamento MD System Web';
const local = 'Rua francisco haag, 600 Residencial Jardins 2, Apt 202 - Rio Branco, Brusque - SC, 88350-748';
const emailPrimary = 'thioalves@gmail.com';