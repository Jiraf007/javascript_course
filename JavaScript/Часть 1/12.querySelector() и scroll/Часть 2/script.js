// ПРОКРУТКА К ЯКОРЮ
function scrollToElement(element) {
    let elementY = window.pageYOffset + element.getBoundingClientRect().top;
    let distance = elementY - window.pageYOffset - 90;
    console.log(distance);
    let interval = distance / 20;
    let flag = 0;
    let timerId = setInterval(function() {
        window.scrollBy(0, interval);
        flag += 1;
        if (flag == 20) clearInterval(timerId);
    }, 5);
}

let arrH1 = container.querySelectorAll('h1');
let arrLi = nav.querySelectorAll('li');
document.addEventListener('scroll', function() {
    // ПОЯВЛЕНИЕ КНОПКИ НАВЕРХ
    if (window.pageYOffset >= (document.body.scrollHeight / 4)) {
        up.style.opacity = 1;
    }
    else up.style.opacity = 0;

    // ВЫДЕЛЕНИЕ АКТИВНОГО БЛОКА
    for (let index in arrH1) {
        try {
            if (arrH1[index].getBoundingClientRect().top <= 120) {
                arrLi[index].style.color = '#44d';
                arrLi[index-1].style.color = '#000';
            } else {
                arrLi[index].style.color = '#000';
            }
        } catch {}
    }

    // ПОЛОСА ПРОКРУТКИ
    let progressWidth = window.pageYOffset / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * document.documentElement.clientWidth;
    progress.style.left = progressWidth + 'px';
    if (Math.round(progressWidth) == Math.round(document.documentElement.clientWidth)) progressLine.style.backgroundColor = 'rgb(0, 202, 17)';
    else progressLine.style.backgroundColor = 'rgb(255, 36, 36)';

})

// НАЖАТИЕ КНОПКИ НАВЕРХ
up.addEventListener('click', function() {
    let timerId = setInterval(function() {
        window.scrollBy(0, -10);
        if (window.pageYOffset == 0) clearInterval(timerId);
    }, 1);
})

// ПРОКРУТКА К ЯКОРЮ
a1.addEventListener('click', function () {
    scrollToElement(head1);
})
a2.addEventListener('click', function () {
    scrollToElement(head2);
})
a3.addEventListener('click', function () {
    scrollToElement(head3);
})
a4.addEventListener('click', function () {
    scrollToElement(head4);
})

