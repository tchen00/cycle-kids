let users = { "Dewei" : [{"login time": 1, "logout time": 1.5, "total time": 0.5}, {"login time": 2, "logout time": 2.5, "total time": 0.5}, {"login time": 3, "logout time": 3.5, "total time": 0.5}]};
  
function generateTableHead(table, data) {
let thead = table.createTHead();
let row = thead.insertRow();
for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
}
}

function generateTable(table, data) {
for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
    let cell = row.insertCell();
    let text = document.createTextNode(element[key]);
    cell.appendChild(text);
    }
}
}

let user = "Dewei";
let table = document.querySelector("table");
let data = Object.keys(users[user][0]);
generateTableHead(table, data);
generateTable(table, users[user]);