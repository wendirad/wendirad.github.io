const theme_toggler = document.querySelector("#toggler")
const html = document.querySelector('html')
let currentTheme = localStorage.getItem('theme')
if (currentTheme == null || currentTheme == 'light'){
    html.classList.remove('dark')
    html.classList.add('light')
    currentTheme = 'light';
    theme_toggler.checked = false;
    localStorage.setItem('theme','light')
}
else{
    html.classList.remove('light')
    html.classList.add('dark')
    currentTheme = 'dark'
    theme_toggler.checked =true;
    localStorage.setItem('theme','dark');
}
theme_toggler.addEventListener('click', () => {
    console.log(theme_toggler.checked)
    console.log(currentTheme)
    if (theme_toggler.checked || currentTheme == 'light') {
            html.classList.remove('light')
            html.classList.add('dark')
            currentTheme = 'dark'
            localStorage.setItem('theme','dark')
        }
        else {
            html.classList.remove('dark')
            html.classList.add('light')
            currentTheme = 'light'
            localStorage.setItem('theme','light')
        }
})

