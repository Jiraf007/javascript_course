// ПРЕЛОАДЕР
function scaleUp(elem, elemTop) {
    let width = 100;
    let height = 100;
    let timerId = setInterval(function() {
        elemTop -= 1;
        width += 2;
        height += 2;
        elem.style.marginTop = elemTop + 'px';
        elem.style.width = width + 'px';
        elem.style.height = height + 'px';
        if (width >= 200) {
            clearInterval(timerId);
            scaleDown(elem, elemTop);
        }
    }, 16);
    return timerId;
}

function scaleDown(elem, elemTop) {
    let width = 200;
    let height = 200;
    let timerId = setInterval(function() {
        elemTop += 1;
        width -= 2;
        height -= 2;
        elem.style.marginTop = elemTop + 'px';
        elem.style.width = width + 'px';
        elem.style.height = height + 'px';
        if (width <= 100) {
            clearInterval(timerId);
            scaleUp(elem, elemTop);
        }
    }, 16);
    return timerId;
}

let headerHeight = document.querySelector('header').clientHeight;

let preloader = document.createElement('div');
preloader.classList.add('preloader');
let preloaderTop = document.documentElement.clientHeight / 2 - 50 - headerHeight;
preloader.style.marginTop = preloaderTop + 'px';
let hideArr = document.querySelectorAll('header, main, #progressLine');
for (elem of hideArr) {
    elem.classList.add('display-none');
}
document.body.insertBefore(preloader, document.body.firstElementChild);

let intervalId = scaleUp(preloader, preloaderTop);
let timerId = setTimeout(function() {
    preloader.remove();
    for (elem of hideArr) {
        elem.classList.remove('display-none');
    }
}, 3000)


// СЛАЙДЕР
let move = 0;
let slideNumber = 1;

arrowRight.addEventListener('click', function () {
    if (arrowLeft.classList.contains('invisible')) arrowLeft.classList.remove('invisible');
    if (slideNumber != 5) {
        slideNumber += 1;
        move -= 800;
        slidesWrapper.style.left = move + 'px';
        if (slideNumber == 5) arrowRight.classList.add('invisible');
        else arrowRight.classList.remove('invisible');
    }
})

arrowLeft.addEventListener('click', function () {
    if (arrowRight.classList.contains('invisible')) arrowRight.classList.remove('invisible');
    if (slideNumber != 1) {
        slideNumber -= 1;
        move += 800;
        slidesWrapper.style.left = move + 'px';
        if (slideNumber == 1) arrowLeft.classList.add('invisible');
        else arrowLeft.classList.remove('invisible');
    }
})


// ОТПРАВКА ФОРМЫ И ВЫВОД АЛЕРТА
orderButton.addEventListener('click', function () {
    let firstName = firstname_field.value;
    let lastName = lastname_field.value;
    let firstNameArr = firstName.split('');
    let phone = phone_field.value;
    orderAlert.firstElementChild.innerHTML = `<strong>Уважаемый ${lastName + ' ' + firstNameArr[0]}.!</strong><br>
    Наши специалисты уже получили Вашу заявку и свяжутся с Вами в ближайшее время по телефону <strong><nobr>${phone}</nobr></strong><br>
    Спасибо за обращение! `;
    orderAlert.classList.remove('invisible');

})


// УВЕЛИЧЕНИЕ КОЛИЧЕСТВА ТОВАРОВ В КОРЗИНЕ
function basketClick(elem) {
    elem.addEventListener('click', function () {
        count = parseInt(mainBasket.innerHTML);
        count += 1;
        mainBasket.innerHTML = count;
    })
}

let basketArr = document.querySelectorAll('.basket');
for (elem of basketArr) {
    basketClick(elem);
}


// БЕСКОНЕЧНАЯ СТРАНИЦА
let goodsArr = goods.children;
document.addEventListener('scroll', function () {
    if ((document.documentElement.scrollHeight - (window.pageYOffset + document.documentElement.clientHeight)) < 200) {
        for (let i = 0; i < 6; i++) {
            let inner = goodsArr[i].innerHTML;
            let newProd = document.createElement('div');
            newProd.classList.add('product');
            // newProd.style.opacity = 0;
            newProd.innerHTML = inner;
            let btn = newProd.querySelector('.basket');
            basketClick(btn);
            goods.appendChild(newProd);
        }
    }
    for (elem of goodsArr) {
        if ((document.documentElement.clientHeight - elem.getBoundingClientRect().top) > 200) {
            elem.style.opacity = 1;
        }
    }
})


// ЛИНИЯ ПРОКРУТКИ
document.addEventListener('scroll', function () {
    let progressWidth = window.pageYOffset / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * document.documentElement.clientWidth;
    progress.style.left = progressWidth + 'px';
    if (Math.round(progressWidth) == Math.round(document.documentElement.clientWidth)) progressLine.style.backgroundColor = 'rgb(0, 202, 17)';
    else progressLine.style.backgroundColor = 'rgb(255, 36, 36)';

})

// ПРОКРУТКА К ЯКОРЮ
function scrollToElement(element) {
    let elementY = window.pageYOffset + element.getBoundingClientRect().top;
    let distance = elementY - window.pageYOffset - 90;
    let interval = distance / 20;
    let flag = 0;
    let timerId = setInterval(function() {
        window.scrollBy(0, interval);
        flag += 1;
        if (flag == 20) clearInterval(timerId);
    }, 10);

}

let arrH2 = Array.from(document.querySelector('main').querySelectorAll('h2'));
let arrLi =  Array.from(document.querySelector('.mainnav').firstElementChild.children);
let upBtn = document.querySelector('footer');
let pageHeight = document.body.scrollHeight;
document.addEventListener('scroll', function() {
    // ПОЯВЛЕНИЕ КНОПКИ НАВЕРХ
    if (window.pageYOffset >= (pageHeight / 4)) {
        upBtn.style.opacity = 1;
    }
    else upBtn.style.opacity = 0;

    // ВЫДЕЛЕНИЕ АКТИВНОГО БЛОКА
    for (let index in arrH2) {
        try {
            if (arrH2[index].getBoundingClientRect().top <= 200) {
                arrLi[index].classList.add('active');
                arrLi[index-1].classList.remove('active');
            } else {
                arrLi[index].classList.remove('active');
            }
        } catch {}
    }

})

// НАЖАТИЕ КНОПКИ НАВЕРХ
upBtn.addEventListener('click', function() {
    let timerId = setInterval(function() {
        window.scrollBy(0, -10);
        if (window.pageYOffset == 0) clearInterval(timerId);
    }, 1);
})


for (let i = 0; i < 4; i++) {
    arrLi[i].addEventListener('click', function () {
        scrollToElement(arrH2[i]);
    })
}