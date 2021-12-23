"use strict";
let logged;
function sendAnalytics(data) {
  console.log(data);
  logged = true;
  console.log(logged);
}
sendAnalytics("the data");
//# sourceMappingURL=analytics.js.map
