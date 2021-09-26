document.addEventListener('scroll', function() {
    if (window.pageYOffset >= (document.body.scrollHeight / 4)) {
        up.style.opacity = 1;
    }
    else up.style.opacity = 0;
})