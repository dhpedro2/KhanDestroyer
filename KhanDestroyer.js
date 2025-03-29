const featureConfigs = {
  initialDelay: 3000,
  subsequentDelays: [300, 1500, 500, 2000]
};
window.features = {
  autoAnswer: false,
  questionSpoof: true
};
const delay = p => new Promise(p2 => setTimeout(p2, p));
const playAudio = p3 => {
  const v = new Audio(p3);
  v.play();
};
function sendToast(p4, p5 = 5000, p6 = "bottom") {
  Toastify({
    text: p4,
    duration: p5,
    gravity: p6,
    position: "center",
    stopOnFocus: true,
    style: {
      background: "#000000"
    }
  }).showToast();
}
;
function findAndClickByClass(p7) {
  const v2 = document.getElementsByClassName(p7)[0];
  if (v2) {
    v2.click();
    if (v2.textContent === "Mostrar resumo") {
      sendToast("🎉 Exercício concluido!", 3000);
      playAudio("https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/4x5g14gj.wav");
    }
  }
  return !!v2;
}
async function loadScript(p8, p9) {
  return fetch(p8).then(p10 => p10.text()).then(p11 => {
    eval(p11);
  });
}
async function loadCss(p12) {
  return new Promise(p13 => {
    const v3 = document.createElement("link");
    v3.rel = "stylesheet";
    v3.type = "text/css";
    v3.href = p12;
    v3.onload = () => p13();
    document.head.appendChild(v3);
  });
}
function spoofQuestion() {
  const vA = ["🔥 Games Destroyer On Top[Discord](https://discord.gg/gamesdest)!", "🤍 Made by [@iUnknownBr](https://guns.lol/iunknownbr).", "🤍 Made by [Snow](https://guns.lol/imsnow)"];
  const v4 = window.fetch;
  window.fetch = async function (p14, p15) {
    let v5;
    if (p14 instanceof Request) {
      v5 = await p14.clone().text();
    } else if (p15 && p15.body) {
      v5 = p15.body;
    }
    const v6 = await v4.apply(this, arguments);
    const v7 = v6.clone();
    try {
      const v8 = await v7.text();
      let v9 = JSON.parse(v8);
      if (v9?.data?.assessmentItem?.item?.itemData) {
        let v10 = JSON.parse(v9.data.assessmentItem.item.itemData);
        if (v10.question.content[0] === v10.question.content[0].toUpperCase()) {
          v10.answerArea = {
            calculator: false,
            chi2Table: false,
            periodicTable: false,
            tTable: false,
            zTable: false
          };
          v10.question.content = vA[Math.floor(Math.random() * vA.length)] + "[[☃ radio 1]]";
          v10.question.widgets = {
            "radio 1": {
              options: {
                choices: [{
                  content: "Resposta correta.",
                  correct: true
                }, {
                  content: "Resposta Errada.",
                  correct: false
                }]
              }
            }
          };
          v9.data.assessmentItem.item.itemData = JSON.stringify(v10);
          sendToast("🔓 Questão Bypased.", 1000);
          const vO = {
            status: v6.status,
            statusText: v6.statusText,
            headers: v6.headers
          };
          return new Response(JSON.stringify(v9), vO);
        }
      }
    } catch (e) {}
    return v6;
  };
}
function autoAnswer() {
  (async () => {
    const vA2 = ["_s6zfc1u", "_ssxvf9l", "_4i5p5ae", "_1r8cd7xe", "_1yok8f4"];
    while (true) {
      if (window.features.autoAnswer && window.features.questionSpoof) {
        await delay(featureConfigs.initialDelay);
        for (let vLN0 = 0; vLN0 < vA2.length; vLN0++) {
          const vFindAndClickByClass = findAndClickByClass(vA2[vLN0]);
          if (vFindAndClickByClass && vLN0 < vA2.length - 1) {
            const v11 = featureConfigs.subsequentDelays[vLN0 % featureConfigs.subsequentDelays.length];
            await delay(v11);
          }
        }
      } else {
        await delay(1000);
      }
    }
  })();
}

loadScript("https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js").then(() => {
  DarkReader.setFetchMethod(window.fetch);
  DarkReader.enable();
  sendToast("🌑 Dark Mode ativado!", 2000);
});
loadCss("https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css");
loadScript("https://cdn.jsdelivr.net/npm/toastify-js").then(async () => {
  sendToast("🌿 Script injetado com sucesso!");
  window.features.autoAnswer = true;
  spoofQuestion();
  autoAnswer();
  console.clear();
});
