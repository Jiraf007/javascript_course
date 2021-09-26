document.addEventListener('scroll', function() {
    console.log(navigation.getBoundingClientRect().top, document.body.getBoundingClientRect().top - navigation.scrollHeight);
    if (navigation.getBoundingClientRect().bottom <= 80) {
        navigation.style.position = 'fixed';
        navigation.style.top = (80 - navigation.scrollHeight) + 'px';
    }
    if ((document.body.getBoundingClientRect().top - navigation.scrollHeight) > navigation.getBoundingClientRect().top) {
        navigation.style.position = 'absolute';
        navigation.style.top = 0;
    } 

    if (art1.firstElementChild.getBoundingClientRect().top < 300) {
        art1.style.left = 0 + 'px';
    }
    if (art2.firstElementChild.getBoundingClientRect().top < 300) {
        art2.style.left = 0 + 'px';
    }
    if (art3.firstElementChild.getBoundingClientRect().top < 300) {
        art3.style.left = 0 + 'px';
    }
})