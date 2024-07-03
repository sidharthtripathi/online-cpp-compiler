const { exec } = require("child_process");
const util = require("util");
const fs = require("fs");
const execPromisified = util.promisify(exec);
const writeFile = util.promisify(fs.writeFile);
async function run(code) {
  // creating src code file
  const writeResult = await writeFile("input_code/main.cpp", code);

  const { stdout: compileRes, stderr: compileErr } = await execPromisified(
    `g++ input_code/main.cpp -o input_code/main`
  );
  console.log(compileRes);
  if (compileErr) throw compileErr;
  const { stderr, stdout: res } = await execPromisified(`./input_code/main`);
  if (stderr) throw stderr;
  await execPromisified(`rm ./input_code/*`);
  return res;
}

module.exports = run;
