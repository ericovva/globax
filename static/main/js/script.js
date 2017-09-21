function init() {
    'use strict';
    /* 	'To actually be able to display anything with Three.js, we need three things:
    	A scene, a camera, and a renderer so we can render the scene with the camera.'

       		- https://threejs.org/docs/#Manual/Introduction/Creating_a_scene 		*/

    var scene, camera, renderer;

    /* We need this stuff too */
    var container, aspectRatio,
        HEIGHT, WIDTH, fieldOfView,
        nearPlane, farPlane,
        mouseX, mouseY, windowHalfX,
        windowHalfY, stats, geometry,
        starStuff, materialOptions, stars,
        loader, options, spawnerOptions, particleSystem, clock, tick,
        starField, hazars,
        absolute, alpha, beta, gamma;


    init();

    function init() {
        tick = 0;
        clock = new THREE.Clock();

        container = document.getElementById('starForge_field');

        HEIGHT = window.innerHeight;
        WIDTH = window.innerWidth;
        aspectRatio = WIDTH / HEIGHT;
        fieldOfView = 35;
        nearPlane = 1;
        farPlane = 10000;
        mouseX = 0;
        mouseY = 0;
        absolute = 0;
        alpha = 0;
        beta = 0;
        gamma = 0;

        windowHalfX = WIDTH / 2;
        windowHalfY = HEIGHT / 2;

        loader = new THREE.TextureLoader();

        camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        //Z positioning of camera

        camera.position.x = -35;
        camera.position.y = -35;
        camera.position.z = 190;

        scene = new THREE.Scene({
            antialias: true
        });
        scene.fog = new THREE.FogExp2(0x000000, 0.0003);


        //check for browser Support
        if (webGLSupport()) {
            //yeah?  Right on...
            renderer = new THREE.WebGLRenderer({
                alpha: true
            });

        } else {
            //No?  Well that's okay.
            renderer = new THREE.CanvasRenderer();
        }

        renderer.setClearColor(0x111111, 1);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(WIDTH, HEIGHT);
        container.appendChild(renderer.domElement);

        window.addEventListener('resize', onWindowResize, false);
        document.addEventListener('mousemove', onMouseMove, false);

        window.addEventListener("deviceorientation", handleOrientation);
        particleSystem = new THREE.GPUParticleSystem({
            maxParticles: 25000
        });
        
        particleSystem.rotation.z = 1;

        /*
        scene.add(particleSystem);
        */
        // options passed during each spawned
        options = {
            position: new THREE.Vector3(),
            positionRandomness: .3,
            velocity: new THREE.Vector3(),
            velocityRandomness: 2,
            color: 0xaa88ff,
            colorRandomness: .2,
            turbulence: 0.1,
            lifetime: 2,
            size: 4,
            sizeRandomness: 1
        };
        spawnerOptions = {
            spawnRate: 5000,
            horizontalSpeed: 0,
            verticalSpeed: 0,
            timeScale: 0.2
        };

    }



    /*
    var controls = new function () {
        this.cameraX = -35;
        this.cameraY = -35;
        this.cameraZ = 150;
    }

    
    var gui = new dat.GUI();
    gui.add(controls, 'cameraX', -1000.0, 1000.0);
    gui.add(controls, 'cameraY', -1000.0, 1000.0);
    gui.add(controls, 'cameraZ', -1000.0, 1000.0);
    */


    
    var starSize = 1;
    var hazarSize = 5;
    
    var stars_number = 900;
    var hazars_number = 100;
   
    if (window.innerWidth < 500) {
         starSize = 1.5;
        hazarSize = 6;
        stars_number = 450;
     }
    
    
    // The wizard's about to get busy.
    starField = starForge();
    hazars = hazars();

    starField.scale.set(0, 0, 0);
    hazars.scale.set(0, 0, 0);
    
   

    render();

    new TWEEN.Tween(starField.scale).to({
            x: 1,
            y: 1,
            z: 1
        }, 1500)
        .easing(TWEEN.Easing.Exponential.InOut).start();
    
    new TWEEN.Tween(hazars.scale).to({
            x: 1,
            y: 1,
            z: 1
        }, 1500)
        .easing(TWEEN.Easing.Exponential.InOut).start();
    
    new TWEEN.Tween(particleSystem.scale).to({
            x: 1,
            y: 1,
            z: 1
        }, 1500)
        .easing(TWEEN.Easing.Exponential.InOut).start();
    

        
    function render() {
        
        starField.geometry.verticesNeedUpdate = true;
        hazars.geometry.verticesNeedUpdate = true;
        

       
        if (gamma == 0) {
             camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        }
        else {
        camera.position.x += (gamma - camera.position.x) * 0.05;
        camera.position.y += (-beta - camera.position.y) * 0.05; 
        }
       
        
         TWEEN.update();
        
        camera.lookAt(starField.position);
        
        camera.rotation.z = 0.3;
        
        camera.updateProjectionMatrix();

        // add some rotation to the system
        starField.rotation.y += 0.001;
        hazars.rotation.y += 0.0005;

        
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    function webGLSupport() {
        /* 	The wizard of webGL only bestows his gifts of power
        	to the worthy.  In this case, users with browsers who 'get it'.		*/

        try {
            var canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (
                canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            // console.warn('Hey bro, for some reason we\'re not able to use webGL for this.  No biggie, we\'ll use canvas.');
            return false;
        }
    }

    function onWindowResize() {

        // Everything should resize nicely if it needs to!
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;

        camera.aspect = aspectRatio;
        camera.updateProjectionMatrix();
        renderer.setSize(WIDTH, HEIGHT);
    }
    

    function starForge() {
        var starsGeometry = new THREE.Geometry();
        var distance = 130;
        for (var i = 0; i < stars_number; i++) {

            var star = new THREE.Vector3();
            var theta = Math.random() * 360.0;
            var phi = Math.random() * 360.0;
            var distance_random = distance * Math.random();

            star.x = distance_random * Math.sin(theta) * Math.cos(phi);
            star.y = distance_random * Math.sin(theta) * Math.sin(phi);
            star.z = distance_random * Math.cos(theta);

            starsGeometry.vertices.push(star)

        }

        var starsMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: starSize,
            blending: THREE.AdditiveBlending,
            transparent: true,
            map: loader.load(
                "static/main/img/webgl/haze.png"
            ),
            depthTest: 0

        })


        var starField = new THREE.Points(starsGeometry, starsMaterial);

        scene.add(starField);

        return starField;
    }

    function hazars() {
        var starsGeometry = new THREE.Geometry();
        var distance = 90;
        for (var i = 0; i < hazars_number; i++) {

            var star = new THREE.Vector3();
            var theta = Math.random() * 360.0;
            var phi = Math.random() * 360.0;
            var distance_random = distance * Math.random();

            star.x = distance_random * Math.sin(theta) * Math.cos(phi);
            star.y = distance_random * Math.sin(theta) * Math.sin(phi);
            star.z = distance_random * Math.cos(theta);

            starsGeometry.vertices.push(star)

        }

        var starsMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: hazarSize,
            blending: THREE.AdditiveBlending,
            transparent: true,
            map: loader.load(
                "static/main/img/webgl/star.png"
            ),
            depthTest: 0

        })


        var hazars = new THREE.Points(starsGeometry, starsMaterial);

        scene.add(hazars);

        return hazars;
    }

    function onMouseMove(e) {
        var k = 0.1;
        mouseX = (e.clientX - windowHalfX) * k;
        mouseY = (e.clientY - windowHalfY) * k;
    }
    
    
    function handleOrientation(event) {
        var k = 1.5;
  absolute = event.absolute;
  alpha    = event.alpha;
  beta     = event.beta * k;
  gamma    = event.gamma * k;

  // Do stuff with the new orientation data
}
    
    
    return [starField, hazars, camera];

};

var star_systems = init();
var starField = star_systems[0];
var hazars = star_systems[1];
var camera = star_systems[2];

/*
 hazars.material.color.setHex(0x30ccff);

 starField.material.color.setHex(0x30ccff);
 */
var x_array = [];
var y_array = [];
var z_array = [];

 for (var i in starField.geometry.vertices) {
        var x = starField.geometry.vertices[i].x;
        x_array.push(x);
         var y = starField.geometry.vertices[i].y;
        y_array.push(y);
         var z = starField.geometry.vertices[i].z;
        z_array.push(z);
     
 }

 for (var i in hazars.geometry.vertices) {
        var x = starField.geometry.vertices[i].x;
        x_array.push(x);
         var y = starField.geometry.vertices[i].y;
        y_array.push(y);
         var z = starField.geometry.vertices[i].z;
        z_array.push(z);
     
 }

var the_rule = 0;

$(window).resize(function() {
    if ( $(window).height() * 2 < $(window).width() ) {
        new TWEEN.Tween(camera.position).to({
            z: 100
        }, 1000).easing(TWEEN.Easing.Quadratic.InOut)
            .start();
    }
    else {
        if ( $(window).height() * 2 < $(window).width() ) {
            new TWEEN.Tween(camera.position).to({
                z: 190
            }, 1000).easing(TWEEN.Easing.Quadratic.InOut)
                .start();
        }
    }
    
});

