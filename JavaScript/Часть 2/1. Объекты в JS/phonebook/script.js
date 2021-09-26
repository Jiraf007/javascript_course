function searchNumber(str, flag) {
    let numberExist = false;
    for (let elem of arr) {
        if (elem.name == str) {
            numberExist = true;
            if (flag == 'search') {
                searchedName.innerHTML = elem.number;
            }
        }
    }
    return numberExist;
}

let arr = [];
let numberExist;
let flag;

btnAdd.addEventListener('click', function () {
    flag = 'add';
    let usName = userName.value;
    numberExist = searchNumber(usName);
    if (numberExist == false) {
        let usNumber = userNumber.value;
        let obj = {
            name: usName,
            number: usNumber
        }
        arr.push(obj);
    }
    else {
        alert('Запись с таким именем уже существует!');
    }
    userName.value = '';
    userNumber.value = '';
})

btnSearch.addEventListener('click', function () {
    flag = 'search';
    numberExist = searchNumber(search.value, flag);
    if (!numberExist) {
        alert('Такого имени нет в списке!');
    }
    search.value = '';
})