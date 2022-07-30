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

container = document.querySelector('.scene');

function init(){
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    setInterval(()=>{
        if(window.innerWidth > 1024){
            camera.position.set(-30, 8, 100);
        }
        else if(window.innerWidth > 768 && window.innerWidth < 1024){
            camera.position.set(0, 20, 100);
        }
        else if(window.innerWidth < 640){
            camera.position.set(0, 50, 300);
        }

        animate();
    }, 500);

    const ambient = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10,10,10);
    scene.add(light);

	let pixelRatio = window.devicePixelRatio
	let AA = true
	if (pixelRatio > 1) {
  		AA = false
	}

    renderer = new THREE.WebGLRenderer({antialias:AA, alpha:true, powerPreference: 'high-performance'});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    let loader = new THREE.GLTFLoader();
    loader.load('../model/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        house = gltf.scene.children[0];
        house.rotation.z = 5;
        house.rotation.x = 5;
        house.rotation.y = -0.05;
        animate();
    });

    var handler = function (element, type, func) {
		if (element.addEventListener) {
			element.addEventListener(type, func, false);
		} else if (window.attachEvent) {
			element.attachEvent("on" + type, func);
		} else {
			element["on" + type] = func;
		}
	};

    var windowSize = function (withScrollBar) {
		var wid = 0;
		var hei = 0;
		if (typeof window.innerWidth != "undefined") {
			wid = window.innerWidth;
			hei = window.innerHeight;
		}
		else {
			if (document.documentElement.clientWidth == 0) {
				wid = document.body.clientWidth;
				hei = document.body.clientHeight;
			}
			else {
				wid = document.documentElement.clientWidth;
				hei = document.documentElement.clientHeight;
			}
		}
		return { width: wid - (withScrollBar ? (wid - document.body.offsetWidth + 1) : 0), height: hei };
	};

    var size = windowSize(true);

	// NOTE: this function will set the camera to follow the box
	handler(container, "mousemove", function (event) {
		var offX = 0;
		var offY = 0;
		if (typeof window.pageXOffset != "undefined") {
			offX = window.pageXOffset;
			offY = window.pageYOffset;
		}
		else {
			if (document.documentElement.scrollTop == 0) {
				offX = document.body.scrollLeft;
				offY = document.body.scrollTop;
			}
			else {
				offX = document.documentElement.scrollLeft;
				offY = document.documentElement.scrollTop;
			}
		}
		var x, y;
		if (typeof event.pageX != "undefined") {
			x = event.pageX;
			y = event.pageY;
		}
		else {
			x = event.clientX;
			y = event.clientY;
		}
		x -= offX;
		y -= offY;

		if (x < 0) {
			x = 0;
		}
		if (y < 0) {
			y = 0;
		}

        house.rotation.z = 5;
        house.rotation.x = 5;
        house.rotation.y = -0.05;

		house.rotation.x += (y - size.height / 2) * 0.00025;

		house.rotation.z += (x - size.width / 2) * 0.00025;
    });
}

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();
