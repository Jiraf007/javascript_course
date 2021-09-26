let residentsBook = [
    {
        name: 'Венди Кордрой',
        age: '15',
        info: 'Общительна и беспечна, имеет много друзей. Прекрасно лазает по деревьям и обращается с оружием. Любимый цвет — фланелевый'
    },
    {
        name: 'Зус Рамирез',
        age: '22',
        info: 'Неуклюжий, неловкий, туговато соображает, но очень добрый и преданный семейству Пайнс и Бабулите. Обладает самыми разными талантами: выступал в роли диджея, рулевого корабля, водителя и так далее. Имеет старый пикап. Утверждает, что научился всему благодаря видеоиграм.'
    },
    {
        name: 'Пасифика Нортвест',
        age: '12',
        info: 'Популярная девочка в Гравити Фолз, из богатой семьи. Потомок фальшивого основателя города, Натаниэля Нортвеста. Любимый цвет — ярко-розовый.'
    }
]

function rendering() {
    document.body.querySelector('.residents').innerHTML = '';
    for (let index in residentsBook) {
        let newRes = document.createElement('div');
        newRes.classList.add('resident');
        newRes.innerHTML = `<div>Имя: ${residentsBook[index].name}<br>Возраст: ${residentsBook[index].age}<br>Информация о жителе: ${residentsBook[index].info}</div>`;
        document.body.querySelector('.residents').appendChild(newRes);
        let newBtn = document.createElement('button');
        newBtn.classList.add('deleteResident');
        newBtn.innerHTML = "Удалить";
        newBtn.addEventListener('click', function () {
            residentsBook.splice(index, 1);
            console.log(residentsBook);
            rendering();
        })
        newRes.appendChild(newBtn);
    }
}

deleteAll.addEventListener('click', function () {
    residentsBook = [];
    rendering();
})

addBtn.addEventListener('click', function () {
    let obj = {
        name: residentName.value,
        age: residentAge.value,
        info: residentInfo.value
    }
    residentsBook.push(obj);
    rendering();
})

rendering();