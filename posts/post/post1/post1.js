const burger = document.querySelector('.burger');
const showcaselinks = document.querySelectorAll('#showcaselist li');
const header = document.getElementById('showcase');

burger.addEventListener('click', ()=>{
    showcaselist.classList.toggle('nav-active');


    showcaselinks.forEach((link, index) => {
        link.style.animation = 'navLinkFade 0.5s ease forwards ' + (index/7) + 's';
    });

    burger.classList.toggle('toggle');

    if(window.scrollY < 1000 && window.innerWidth > 768 && window.innerWidth < 1024){
        header.classList.toggle("sticky");
    }
    else if(window.scrollY < 700 && window.innerWidth < 640){
        header.classList.toggle("sticky");
    }
});

showcaselinks.forEach((link) =>{
    link.addEventListener('click', ()=>{
        showcaselist.classList.toggle('nav-active');
        burger.classList.remove('toggle');
    });
});

window.addEventListener('scroll', ()=>{
	let value = window.scrollY;

	//sticky and responsive nav-bar
	if(window.innerWidth > 1600){
		header.classList.toggle("sticky", value > 900);
	}
	else if(window.innerWidth > 1200 && window.innerWidth < 1600){
		header.classList.toggle("sticky", value > 100);
	}
	else if(window.innerWidth > 768 && window.innerWidth < 1024){
		header.classList.toggle("sticky", value > 1000);
	}
	if(window.innerWidth < 640){
		header.classList.toggle("sticky", value > 700);
	}
});