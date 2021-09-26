document.addEventListener('scroll', function() {
    let arr = document.body.firstElementChild.children;
    for (let elem of arr) {
        elem.innerHTML = elem.getBoundingClientRect().top;
        if (elem.getBoundingClientRect().top >= 0 && elem.getBoundingClientRect().top <= 600) {
            elem.style.backgroundColor = 'rgb(102, 114, 221)';
        }
        else elem.style.backgroundColor = '#6d6';
    }
})
