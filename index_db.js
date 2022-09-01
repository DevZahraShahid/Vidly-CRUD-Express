const express = require("express");
const app = new express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/logging")();
require("./startup/config")();

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}...`));
