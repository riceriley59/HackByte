const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.showcaselist');
    const showcaselinks = document.querySelectorAll('.showcaselist li');

    burger.addEventListener('click', ()=>{
        nav.classList.toggle('nav-active');


        showcaselinks.forEach((link, index) => {
            link.style.animation = 'navLinkFade 0.5s ease forwards ' + (index/7) + 's';
        });

        burger.classList.toggle('toggle');

        showcaselinks.forEach((link) =>{
            link.addEventListener('click', ()=>{
                showcaselist.classList.toggle('nav-active');
                burger.classList.remove('toggle');
            });
        });
    });
}

navSlide();