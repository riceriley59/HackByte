const intro = document.querySelector('.intro');
const logo = document.querySelector('.logo-header');
const logoSpan = document.querySelectorAll('.logo');
const transitionel = document.getElementById('transition');
const anchors = document.querySelectorAll('a');

window.addEventListener('DOMContentLoaded', ()=>{
    setTimeout(()=>{
        logoSpan.forEach((span, idx)=>{
            setTimeout(()=>{
                span.classList.add('active');
            }, (idx + 1) * 400);
        });

        setTimeout(()=>{
            logoSpan.forEach((span, idx)=>{
                setTimeout(()=>{
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50);
            });
        }, 2000);

        setTimeout(()=>{
            intro.style.top = '-100vh';
        }, 2300);
    });
});

window.addEventListener('load', ()=>{
    setTimeout(()=>{
        transitionel.classList.remove('is-active');
    }, 500);

    for(let i = 0; i < anchors.length; i++){
        const anchor = anchors[i];
        anchor.addEventListener('click', e =>{
            e.preventDefault();
            let target = e.target.href;

            transitionel.classList.add('is-active');

            setTimeout(()=>{
                window.location.href = target;
            }, 500);
        })
    }
});