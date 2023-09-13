const data = { id: 3, niveau: 5 };

new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open("get", "/api/sondage/un/77", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            resolve(xhr.responseText);
        }
    };

    xhr.send();
}).then((data) => {
    let data2 = JSON.parse(data);
    console.log(data2);
});
