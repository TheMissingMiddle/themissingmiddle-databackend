require("jasmine");
const frisby = require('frisby');
frisby.create('Test call')
    .get('http://localhost:8080/hello/test')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({ "name" : "test" })  
    .toss();