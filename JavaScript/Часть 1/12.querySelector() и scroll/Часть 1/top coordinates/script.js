document.addEventListener('scroll', function() {
    let arr = document.body.firstElementChild.children;
    for (let elem of arr) {
        elem.innerHTML = elem.getBoundingClientRect().top;
    }
})
