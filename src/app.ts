import {Message, Call, Document} from "./messages";
import {Firm} from "./firm";

const restify = require("restify");

const firms = [
  new Firm("AA", "1960", 57, "Ghana", 153, "Agroprocessing"),
  new Firm("CC", "1981", 36, "Tanzania", 167, "Forestry"),
  new Firm("DD", "2009", 8, "Ethiopia", 228, "Agroprocessing"),
  new Firm("EE", "2000", 17, "Tanzania", 120, "Agroprocessing"),
  new Firm("FF", "1987", 30, "Ghana", 186, "Forestry"),
  new Firm("GG", "1950", 67, "Ghana", 146, "Services"),
  new Firm("HH", "1980", 37, "Kenya", 60, "Services"),
  new Firm("II", "1984", 33, "Kenya", 83, "Mining"),
  new Firm("JJ", "1963", 54, "Kenya", 92, "Agroprocessing"),
  new Firm("KK", "1988", 29, "Cameroon", 181, "Mining"),
  new Firm("LL", "2008", 9, "Cameroon", 93, "Chemicals"),
  new Firm("MM", "1993", 24, "Djibouti", 215, "Chemicals"),
  new Firm("NN", "1956", 61, "South Africa", 36, "Agroprocessing"),
  new Firm("OO", "1957", 60, "Namibia", 55, "Forestry"),
  new Firm("PP", "1960", 57, "Botswana", 135, "Agroprocessing"),
  new Firm("QQ", "1989", 28, "Namibia", 166, "Agroprocessing"),
  new Firm("RR", "1966", 51, "Namibia", 205, "Forestry"),
  new Firm("SS", "1980", 37, "South Africa", 95, "Services"),
  new Firm("TT", "1988", 29, "Mozambique", 124, "Services"),
  new Firm("UU", "2004", 13, "Mozambique", 239, "Mining"),
  new Firm("VV", "1991", 26, "Ghana", 205, "Agroprocessing"),
  new Firm("WW", "1950", 67, "Tanzania", 161, "Mining"),
  new Firm("XX", "1959", 58, "Ethiopia", 134, "Chemicals"),
  new Firm("YY", "1990", 27, "Tanzania", 160, "Chemicals"),
  new Firm("ZZ", "1996", 21, "Ghana", 153, "Agroprocessing")
];

function respondInteraction(req: any, res: any, next: any) {
  const org = req.params.org;
  let interactions: Message[] = [];
  interactions.push(new Message("01.12.17", "13.45", "firm", "What is the best way to produce juice?"));
  interactions.push(new Message("01.12.17", "13.44", "expert", "What type of juice do you want to manufacture?"));
  interactions.push(new Message("01.12.17", "16.01", "expert", "Can we do a call tomorrow?"));
  interactions.push(new Message("01.12.17", "16.04", "firm", "Yes, lets do 14.00"));

  interactions.push(new Call("02.12.17", "14.00", "firm", "Hi, how are you?"));
  interactions.push(new Call("02.12.17", "14.00", "expert", "I am good! What kind of juice do you want to produce?"));
  interactions.push(new Call("02.12.17", "14.01", "firm", "We are thinking of making juice out of oranges and mangos. Does the processing process differ between them?"));
  interactions.push(new Call("02.12.17", "14.02", "expert", "Not necessarily, but you will not be able to produce them at the same time. For that you will need to think about a cleaning process that guarantees hygiene standards. Do you currently have those standards?"));
  interactions.push(new Call("02.12.17", "14.02", "firm", "Yes we do, but they were formulated three years ago and now that we want to export to the EU we need to comply with some new regulations. Could you help us with that?"));
  interactions.push(new Call("02.12.17", "14.02", "expert", "Yes, let me share with you later some examples of juice processing and hygiene standards. Could you maybe share with me a picture of how your current processing unit looks?"));
  interactions.push(new Call("02.12.17", "14.03", "firm", "Will do that now"));

  interactions.push(new Document("02.12.17", "14.05", "firm", "processing unit"));
  interactions.push(new Message("02.12.17", "14.07", "firm", "In the picture you see our new machine X which we bought last year. We have now ordered machine Y to automatically package our products."));
  interactions.push(new Message("02.12.17", "15.34", "expert", "Thanks, I will send you now an overview on mango and orange processing."));
  interactions.push(new Document("02.12.17", "15.34", "expert", "juice processing"));
  interactions.push(new Message("02.12.17", "15.35", "expert", "and an overview on current hygiene standards for juices in the EU."));
  interactions.push(new Document("02.12.17", "15.34", "expert", "hygiene standards"));

  res.send({"org": org, "interactions": interactions});
  next();
}

function respondMetaData(req: any, res: any, next: any) {
  const org = req.params.org;
  const firm = firms.filter( f => f.name === org );
  if ( firm[0] )
    res.send(firm[0]);
  else
    res.send(404);
  next();
}

const server = restify.createServer();
server.get("/interaction/:org", respondInteraction);
server.get("/metadata/:org", respondMetaData);

server.listen(8080, () => {
  console.log("%s listening at %s", server.name, server.url);
});