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

let container;
let camera;
let renderer;
let scene;
let house;

function init(){
    container = document.querySelector('.scene');

    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(-30, 10, 100);

    const ambient = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10,10,10);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    let loader = new THREE.GLTFLoader();
    loader.load('../model/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        house = gltf.scene.children[0];
        animate();
    });
}

function animate(){
    requestAnimationFrame(animate);
    house.rotation.z = 5;
    house.rotation.x = 5;
    house.rotation.y = -0.05;
    renderer.render(scene, camera);
}

init();

window.addEventListener('DOMContentLoaded', ()=>{
    setTimeout(()=>{
        
    }, 2000);
})