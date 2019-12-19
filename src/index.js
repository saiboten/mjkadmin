import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import moment from "moment";
import AdminOverview from "./components/admin/AdminOverview";

moment.defineLocale("nb", {
  months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split(
    "_"
  ),
  monthsShort: "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split(
    "_"
  ),
  monthsParseExact: true,
  weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
  weekdaysShort: "sø._ma._ti._on._to._fr._lø.".split("_"),
  weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D. MMMM YYYY",
    LLL: "D. MMMM YYYY [kl.] HH:mm",
    LLLL: "dddd D. MMMM YYYY [kl.] HH:mm"
  },
  calendar: {
    sameDay: "[i dag kl.] LT",
    nextDay: "[i morgen kl.] LT",
    nextWeek: "dddd [kl.] LT",
    lastDay: "[i går kl.] LT",
    lastWeek: "[forrige] dddd [kl.] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "om %s",
    past: "%s siden",
    s: "noen sekunder",
    m: "ett minutt",
    mm: "%d minutter",
    h: "en time",
    hh: "%d timer",
    d: "en dag",
    dd: "%d dager",
    M: "en måned",
    MM: "%d måneder",
    y: "ett år",
    yy: "%d år"
  },
  ordinalParse: /\d{1,2}\./,
  ordinal: "%d.",
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4 // The week that contains Jan 4th is the first week of the year.
  }
});

moment.locale("nb");

ReactDOM.render(<AdminOverview />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
