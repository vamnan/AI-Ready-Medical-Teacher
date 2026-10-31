// Google Apps Script backend for the webinar registration site.
// Paste into Extensions → Apps Script of a Google Sheet, set the ADMIN_KEY script property,
// and deploy as a Web app (Execute as: Me, Who has access: Anyone). See README.md.
// After changing this file: Deploy → Manage deployments → Edit → Version: New version (keeps the same URL).

var SHEET_NAME = 'Registrations';
var FIELDS = ['timestamp', 'name', 'email', 'mobile', 'institution', 'specialty', 'designation', 'aiUse', 'question', 'consent'];
var HEADERS = ['Timestamp', 'Full name', 'Email', 'Mobile', 'Institution', 'Specialty', 'Designation', 'AI use', 'Question', 'Consent'];
var MAX_LEN = { name: 120, email: 160, mobile: 20, institution: 200, specialty: 80, designation: 40, aiUse: 60, question: 1000 };

// Post-webinar survey and starter-workshop waitlist.
var SURVEY_SHEET = 'Survey';
var SURVEY_FIELDS = ['timestamp', 'email', 'name', 'prepTask', 'usefulness', 'likelihood', 'maxPrice', 'slot', 'host', 'hostInstitution', 'hostContact', 'waitlist', 'comment'];
var SURVEY_HEADERS = ['Timestamp', 'Email', 'Name', 'Most time-consuming prep task', 'Usefulness (1-5)', 'Likelihood to attend hands-on', 'Most would pay', 'Preferred slot', 'Institution could host', 'Host institution', 'Host contact', 'Waitlist (with consent)', 'Comment'];
var SURVEY_MAX = { email: 160, name: 120, hostInstitution: 200, hostContact: 160, comment: 1000 };
var SURVEY_OPTIONS = {
  prepTask: ['Objectives & lesson plans', 'Slides', 'Clinical cases', 'MCQs & assessment', 'Feedback', 'Other'],
  likelihood: ['Very unlikely', 'Unlikely', 'Not sure', 'Likely', 'Very likely'],
  maxPrice: ['Only if free', '₹199', '₹299', '₹399', '₹699', '₹999 or more'],
  slot: ['Weekday 6–8 PM', 'Saturday afternoon', 'Sunday morning'],
  host: ['Yes, contact me', 'Maybe', 'No']
};

function getSheet_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Trim, cap length, and stop values like "=HYPERLINK(...)" from being run as spreadsheet formulas.
function clean_(v, max) {
  var s = String(v == null ? '' : v).trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function validEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function doPost(e) {
  var data;
  try { data = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: 'bad_request' }); }

  // Honeypot field: bots fill it, people never see it.
  if (data.website) return json_({ ok: true });

  if (data.type === 'survey') return saveSurvey_(data);
  return saveRegistration_(data);
}

function saveRegistration_(data) {
  var email = String(data.email || '').trim().toLowerCase();
  if (!data.name || !validEmail_(email) || !data.institution || !data.designation || data.consent !== true) {
    return json_({ ok: false, error: 'missing_fields' });
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sh = getSheet_(SHEET_NAME, HEADERS);
    var last = sh.getLastRow();
    if (last > 1) {
      var emails = sh.getRange(2, 3, last - 1, 1).getValues();
      for (var i = 0; i < emails.length; i++) {
        if (String(emails[i][0]).trim().toLowerCase() === email) return json_({ ok: true, duplicate: true });
      }
    }
    sh.appendRow([
      new Date(),
      clean_(data.name, MAX_LEN.name),
      clean_(email, MAX_LEN.email),
      clean_(data.mobile, MAX_LEN.mobile),
      clean_(data.institution, MAX_LEN.institution),
      clean_(data.specialty, MAX_LEN.specialty),
      clean_(data.designation, MAX_LEN.designation),
      clean_(data.aiUse, MAX_LEN.aiUse),
      clean_(data.question, MAX_LEN.question),
      'Yes'
    ]);
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// One survey response per email: a later response replaces the earlier one.
function saveSurvey_(data) {
  var email = String(data.email || '').trim().toLowerCase();
  var usefulness = Number(data.usefulness);
  var ok = validEmail_(email) &&
    SURVEY_OPTIONS.prepTask.indexOf(data.prepTask) !== -1 &&
    usefulness >= 1 && usefulness <= 5 && Math.round(usefulness) === usefulness &&
    SURVEY_OPTIONS.likelihood.indexOf(data.likelihood) !== -1 &&
    SURVEY_OPTIONS.maxPrice.indexOf(data.maxPrice) !== -1 &&
    SURVEY_OPTIONS.slot.indexOf(data.slot) !== -1 &&
    SURVEY_OPTIONS.host.indexOf(data.host) !== -1;
  if (!ok) return json_({ ok: false, error: 'missing_fields' });
  // Joining the waitlist needs its own consent.
  var waitlist = data.waitlist === true && data.waitlistConsent === true;

  var row = [
    new Date(),
    clean_(email, SURVEY_MAX.email),
    clean_(data.name, SURVEY_MAX.name),
    data.prepTask,
    usefulness,
    data.likelihood,
    data.maxPrice,
    data.slot,
    data.host,
    clean_(data.hostInstitution, SURVEY_MAX.hostInstitution),
    clean_(data.hostContact, SURVEY_MAX.hostContact),
    waitlist ? 'Yes' : 'No',
    clean_(data.comment, SURVEY_MAX.comment)
  ];

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sh = getSheet_(SURVEY_SHEET, SURVEY_HEADERS);
    var last = sh.getLastRow();
    if (last > 1) {
      var emails = sh.getRange(2, 2, last - 1, 1).getValues();
      for (var i = 0; i < emails.length; i++) {
        if (String(emails[i][0]).trim().toLowerCase() === email) {
          sh.getRange(i + 2, 1, 1, row.length).setValues([row]);
          return json_({ ok: true, updated: true });
        }
      }
    }
    sh.appendRow(row);
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function readRows_(sheetName, headers, fields, convert) {
  var values = getSheet_(sheetName, headers).getDataRange().getValues();
  return values.slice(1).map(function (r) {
    var o = {};
    fields.forEach(function (f, i) { o[f] = convert(f, r[i]); });
    return o;
  });
}

function doGet(e) {
  var key = PropertiesService.getScriptProperties().getProperty('ADMIN_KEY');
  if (!key || !e.parameter || e.parameter.key !== key) return json_({ ok: false, error: 'unauthorized' });

  var rows = readRows_(SHEET_NAME, HEADERS, FIELDS, function (f, v) {
    if (f === 'timestamp') return v instanceof Date ? v.toISOString() : String(v);
    if (f === 'consent') return v === 'Yes' || v === true;
    return String(v).replace(/^'/, '');
  });
  var survey = readRows_(SURVEY_SHEET, SURVEY_HEADERS, SURVEY_FIELDS, function (f, v) {
    if (f === 'timestamp') return v instanceof Date ? v.toISOString() : String(v);
    if (f === 'usefulness') return Number(v) || 0;
    if (f === 'waitlist') return v === 'Yes' || v === true;
    return String(v).replace(/^'/, '');
  });
  return json_({ ok: true, rows: rows, survey: survey });
}
