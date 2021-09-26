btnApplyProfileChngs.addEventListener('click', function() {
    usName = userNameField.value;
    let arr = usName.split(' ');
    let arrName = arr[1].split('');
    let arrName2 = arr[2].split('');
    userName.innerHTML = `${arr[0]} ${arrName[0]}. ${arrName2[0]}.`;

    if (maleChkbx.checked) userPic.src = 'img/male.png';
    else userPic.src = 'img/female.png';
})

btnChangeTheme.addEventListener('click', function() {
    if (document.body.classList.contains('light-theme')) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    }
    else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
})

btnAddCompetence.addEventListener('click', function() {
    let comp = document.createElement('li');
    comp.innerHTML = newCompetence.value;
    comp.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        e.currentTarget.remove();
    })
    comp.addEventListener('dblclick', function() {
        let val = comp.innerHTML;
        comp.innerHTML = '';
        let editor = document.createElement('input');
        editor.value = val;
        editor.addEventListener('keydown', function(ee) {
            let k = ee.key;
            if (k == 'Enter') {
                comp.innerHTML = editor.value;
                editor.remove();
            }
        })
        comp.appendChild(editor);
    })
    competenceList.appendChild(comp);
    newCompetence.value = '';
})

let arrComp = competenceList.children;

btnClearCompetence.addEventListener('click', function() {
    count = arrComp.length;
    for (let i = count - 1; i >= 0; i--) {
        arrComp[i].remove();
    }
})

newCompetence.addEventListener('keydown', function(e2) {
    let k = e2.key;
    if (k == 'Enter') {
        let comp = document.createElement('li');
        comp.innerHTML = newCompetence.value;
        comp.addEventListener('contextmenu', function(e3) {
            e3.preventDefault();
            e3.currentTarget.remove();
        })
        comp.addEventListener('dblclick', function() {
            let val = comp.innerHTML;
            comp.innerHTML = '';
            let editor = document.createElement('input');
            editor.value = val;
            editor.addEventListener('keydown', function(ee) {
                let k = ee.key;
                if (k == 'Enter') {
                    comp.innerHTML = editor.value;
                    editor.remove();
                }
            })
            comp.appendChild(editor);
        })
        competenceList.appendChild(comp);
        newCompetence.value = '';
    }
})