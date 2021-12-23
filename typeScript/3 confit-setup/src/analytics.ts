let logged: boolean;
function sendAnalytics(data: string) {
  console.log(data);
  logged = true;
  console.log(logged);
}
sendAnalytics("the data");
