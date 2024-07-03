const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const run = require("./lib/cppCompiler");
app.use(express.static("public"));

app.post("/code", bodyParser.text(), async (req, res) => {
  const code = req.body;

  try {
    const result = await run(code);
    res.send(result);
  } catch (error) {
    res.statusCode = 422;
    res.send(error.stderr);
  }
});

app.listen(4000, () => {
  console.log(`server started at: http://localhost:4000 🚀 `);
});
