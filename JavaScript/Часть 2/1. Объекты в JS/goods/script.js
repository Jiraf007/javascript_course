let goods = [
    {
        title: 'Яблоки',
        price: 10
    },
    {
        title: 'Вишня',
        price: 100
    },
    {
        title: 'Помидоры',
        price: 30
    },
    {
        title: 'Брокколи',
        price: 50
    },
    {
        title: 'Груши',
        price: 20
    },
    {
        title: 'Капуста',
        price: 15
    }, {
        title: 'Персики',
        price: 70
    }, {
        title: 'Лимоны',
        price: 80
    }
];

btn.addEventListener('click', function () {
    let arr = [];
    document.body.querySelector('table').innerHTML = '';
    for (let elem of goods) {
        if ((elem.price >= parseInt(from.value)) && ((elem.price <= parseInt(to.value)))) {
            arr.push(elem);
        }
    }
    for (let elem of arr) {
        document.body.querySelector('table').innerHTML += `<tr><td>${elem.title}</td><td>${elem.price}</td></tr>`;
    }
})