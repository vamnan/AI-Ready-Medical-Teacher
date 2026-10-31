// Talks to the Google Apps Script backend, or to localStorage in demo mode.
(function () {
  var API_URL = (window.APP_CONFIG && window.APP_CONFIG.API_URL || "").trim();
  var DEMO_KEY = "webinar_demo_registrations";
  var DEMO_SURVEY_KEY = "webinar_demo_survey";
  var demo = !API_URL;

  function demoRead(key) {
    try { return JSON.parse(localStorage.getItem(key || DEMO_KEY) || "[]"); } catch (e) { return []; }
  }
  function demoWrite(rows, key) {
    try { localStorage.setItem(key || DEMO_KEY, JSON.stringify(rows)); } catch (e) {}
  }

  // One survey response per email, as on the server: a later response replaces the earlier one.
  function demoSurvey(data) {
    var rows = demoRead(DEMO_SURVEY_KEY);
    var email = String(data.email).trim().toLowerCase();
    var row = Object.assign({}, data, {
      timestamp: new Date().toISOString(),
      email: email,
      usefulness: Number(data.usefulness) || 0,
      waitlist: data.waitlist === true && data.waitlistConsent === true
    });
    delete row.type; delete row.website; delete row.waitlistConsent;
    var i = rows.findIndex(function (r) { return String(r.email).toLowerCase() === email; });
    if (i !== -1) { rows[i] = row; demoWrite(rows, DEMO_SURVEY_KEY); return { ok: true, updated: true }; }
    rows.push(row);
    demoWrite(rows, DEMO_SURVEY_KEY);
    return { ok: true };
  }

  async function submit(data) {
    if (demo) {
      if (data.type === "survey") return demoSurvey(data);
      var rows = demoRead();
      var email = String(data.email).toLowerCase();
      if (rows.some(function (r) { return String(r.email).toLowerCase() === email; })) {
        return { ok: true, duplicate: true };
      }
      rows.push(Object.assign({ timestamp: new Date().toISOString() }, data));
      demoWrite(rows);
      return { ok: true };
    }
    // text/plain keeps this a "simple" request, so the browser skips the CORS preflight Apps Script can't answer.
    var res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    });
    return res.json();
  }

  async function list(adminKey) {
    if (demo) return { ok: true, rows: demoRead(), survey: demoRead(DEMO_SURVEY_KEY) };
    var res = await fetch(API_URL + "?action=list&key=" + encodeURIComponent(adminKey));
    return res.json();
  }

  window.RegAPI = {
    demo: demo,
    submit: submit,
    list: list,
    seedDemo: function (rows, survey) {
      demoWrite(demoRead().concat(rows));
      if (survey) demoWrite(demoRead(DEMO_SURVEY_KEY).concat(survey), DEMO_SURVEY_KEY);
    },
    clearDemo: function () { demoWrite([]); demoWrite([], DEMO_SURVEY_KEY); }
  };
})();
