const textarea = document.getElementById("text");
const result = document.getElementById("result");
const $completion = document.getElementById("completion");
let resultCompile;

eval(`console.log = (text) => {
        return (text instanceof Object) ? JSON.stringify(text) :
                (text instanceof Array) ? "[" + text + "]" :
                text
		};`);

textarea.addEventListener("input", () => {
  let lines = textarea.value.split("\n");
  resultCompile = "";

  completion(lines);
  lines.forEach((line) => {
    resultCompile += (line.trim() !== "") ? compiler(line) : "<br>";
  });

  result.innerHTML = resultCompile;
});

function completion(lines) {
  let words = lines[lines.length - 1].split(" ");
  let word = words[words.length - 1];

  if (word.length > 0) {
    $completion.innerHTML = wordKey.filter((e) => {
      return e.startsWith(word);
    }).map((e) => {
      return `<span>${e}</span>`;
    }).join("");

    $completion.style.opacity = 1;
    $completion.style.top = `${(lines.length + 1)}em`;
    $completion.style.left = `0.7em`;
  } else {
    $completion.style.opacity = 0;
  }
}

function compiler(value) {
  try {
    return `<p>${eval(value)}</p>`;
  } catch (error) {
    return `<b style="color:red">${error}</b>`;
  }
}
