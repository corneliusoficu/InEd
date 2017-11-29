var section = document.getElementsByClassName('section-content')[0];
section.innerHTML = "";

var xhr= new XMLHttpRequest();
xhr.open('GET', 'https://threejs.org/docs/#manual/introduction/How-to-run-thing-locally', true);
xhr.onreadystatechange= function() {
    if (this.readyState!==4) return;
    if (this.status!==200) return; // or whatever error handling you want
    section.innerHTML += this.responseText;

};
xhr.send();
/*
Eu zic sa incercam ceva de genul...sa o facem un SPA
stergi ce

*/