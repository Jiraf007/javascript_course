btn.addEventListener('click', function () {
    let obj = {
        tagName: 'p',
        text: ':)',
        backgroundColor: '#a29bfe',
        display: 'inline-block',
        padding: '20px',
        borderRadius: '50px',
        fontWeight: 'bold'
    }
    let newElem = document.createElement(obj.tagName);
    newElem.innerHTML = obj.text;


    for (let key in obj) {
        if (key != 'tagName' || key != 'text') {
            newElem.style[key] = obj[key];
        }
    }


    document.body.appendChild(newElem);
})