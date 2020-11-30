init();
function init() {
    let copyrightYear = document.querySelector('#copyrightYear');
    copyrightYear.innerHTML = new Date().getFullYear();
}