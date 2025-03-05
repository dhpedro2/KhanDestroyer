const baseClasses = ["_19uopuu", "_ssxvf9l", "_4i5p5ae", "_1r8cd7xe", "_1yok8f4"];
khanwareDominates = true;

(async () => { 
    while (khanwareDominates) {
        if (features.autoAnswer && features.questionSpoof) {
            
            const classToCheck = [...baseClasses];

            if (features.nextRecomendation)  device.mobile ? classToCheck.push("_ixuggsz") : classToCheck.push("_1kkrg8oi");
            if (features.repeatQuestion) classToCheck.push("_ypgawqo");

            for (const q of classToCheck) {
                findAndClickByClass(q);
                const element = document.getElementsByClassName(q)[0];
                if (element && element.textContent === "Mostrar resumo") {
                    sendToast("🎉┃Exercício concluído!", 3000);
                }
            }
        }
        await delay(featureConfigs.autoAnswerDelay * 750);
    }
})();
