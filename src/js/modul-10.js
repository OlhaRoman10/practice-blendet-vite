// Додай відображення дати і часу в реальному часі

const spanTextContent = document.querySelector(".date span");

spanTextContent.textContent = new Date().toLocaleString();

setInterval (() => spanTextContent.textContent = new Date().toLocaleString(), 1000);

