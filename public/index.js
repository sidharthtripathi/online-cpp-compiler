const codeSection = document.getElementById("code");
const result = document.getElementById("result");
function getResult(e) {
  const code = codeSection.value;
  result.innerText = "loading..";
  fetch("/code", { method: "POST", body: code })
    .then((res) => res.text())
    .then((res) => {
      result.innerText = res;
    });
}
