require("jasmine");
const frisby = require("frisby");
frisby.create("Test whether firm AA exists")
    .get("http://localhost:8080/metadata/AA")
    .expectStatus(200)
    .expectHeaderContains("content-type", "application/json")
    .expectJSON({name: "AA", established: "1960", active: 57, country: "Ghana", employees: 153, sector: "Agroprocessing" })
    .toss();

frisby.create("Test whether firm Ya does not exists")
    .get("http://localhost:8080/metadata/Ya")
    .expectStatus(404)
    .toss();

frisby.create("Calldata arrives")
    .get("http://localhost:8080/interaction/AA")
    .expectStatus(200)
    .expectHeaderContains("content-type", "application/json")
    .toss();
