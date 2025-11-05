let header = document.querySelector('header');
let title = document.querySelector('.title');
let titles = [
    "Frontend Master",
    "Python Developer",
    "Competitive Programmer",
    "Web Developer",
]
let title_count = 0;

// let remove_text = 
let set_text = (text, el) => {
    new Promise(
        function(resolve, reject) {
            var text_len = el.innerText.length;
            for(var skat in el.innerText){
                setTimeout(() => {el.innerText = el.innerText.slice(0, -(0 + 1));}, 50*skat)
            }
        setTimeout(() => {resolve()}, 70 * text_len + 10)
    }).then(
        function() {
            for (let ind in text){
                setTimeout(() => {
                    var new_text = el.innerText.slice(0, -1) + text[ind] + '|';
                    el.innerText = new_text;
                }, 50*ind);
            }
            
        }, (err) => {console.log(err);}
    ).then(
        function() {
            setTimeout(() => {
                set_text(titles[title_count++ % titles.length], title);
            }, 3000)
        }
    )
    
}
window.addEventListener('DOMContentLoaded', () => {
    set_text(titles[title_count++ % titles.length], title);    
})