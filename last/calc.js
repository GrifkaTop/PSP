// Получаем доступ к экрану
const display = document.getElementById('calc-display');


function insert(val) {
    if (display) {
        if (display.value === "Ошибка") {
            display.value = "";
        }
        display.value += val;
    }
}
function clearDisplay() {
    if (display) {
        display.value = "";
    }
}

function calculate() {
    if (display && display.value !== "") {
        try {
            if (display.value.includes("**")) {
                throw new Error("**");
            }
            let a = display.value.replaceAll("^", "**");
            let result = eval(a);


            if (result === Infinity || result === -Infinity || isNaN(result)) {
                throw new Error("Infinity");
            }

            display.value = result;
        } catch (e) {
            display.value = "Ошибка";
        }
    }
}