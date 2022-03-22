import { useEffect, useRef } from "react";

// IMPORT NECESSARY PACKAGES
import * as THREE from "three";
import imagesLoaded from "imagesloaded";
import FontFaceObserver from "fontfaceobserver";
import gsap from "gsap";

// IMPORT SHADERS
import fragment from "raw-loader!glslify-loader!./shaders/fragment.glsl";
import vertex from "raw-loader!glslify-loader!./shaders/vertex.glsl";
import noise from "raw-loader!glslify-loader!./shaders/noise.glsl";

// IMPORT THREE.JS EXAMPLE PACKAGES
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";



const Canvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    var scene = new THREE.Scene();
    var width = window.innerWidth;
    var height = window.innerHeight;
    var camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      100,
      2000
    );
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    var controls = new OrbitControls(camera, renderer.domElement);
    var images = [...document.querySelectorAll("main .grid img")];
    var currentTime = 0;
    var currentScroll = 0;
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    // CANVAS INIT
    camera.position.z = 600;
    camera.fov = 2 * Math.atan(window.innerHeight / 2 / 600) * (180 / Math.PI);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // OPTIMIZE PERFORMANCE
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // PRELOAD FONTS
    var fontHoves = new Promise((resolve) => {
      new FontFaceObserver("TT Hoves").load().then(() => {
        resolve();
      });
    });

    // PRELOAD IMAGES
    var preloadImages = new Promise((resolve, reject) => {
      imagesLoaded(
        document.querySelectorAll("img"),
        { background: true },
        resolve
      );
    });

    // FUNCTION LOADING TREE
    let allDone = [fontHoves, preloadImages];

    Promise.all(allDone).then(() => {
      addImages();
      mouseMovement();
      composerPass();
      render();
    });

    // FULLSCREEN EFFECTS (ON SCROLL)
    var composer = new EffectComposer(renderer);
    var renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    var myEffect = {
      uniforms: {
        tDiffuse: { value: null },
        scrollSpeed: { value: 1 },
        time: { value: 1 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix
            * modelViewMatrix
            * vec4( position, 1.0 );
        }
        `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        varying vec2 vUv;
        uniform float scrollSpeed;
        uniform float time;
        ${noise}
        void main(){
          vec2 newUV = vUv;
          float area = smoothstep(1.,0.8,vUv.y)*2. - 1.;
          float area1 = smoothstep(0.3,0.,vUv.y);
          area1 = pow(area1,4.);
          float noise = 0.5*(cnoise(vec3(vUv*10.,time/5.)) + 1.);
          float n = smoothstep(0.5,0.52, noise + area);
          newUV.x -= (vUv.x - 0.5)*0.2*area1;
          //gl_FragColor = texture2D( tDiffuse, newUV);
          //gl_FragColor = vec4(area1,0.,0.,1.);
          gl_FragColor = mix(vec4(1.),texture2D( tDiffuse, newUV),n);
        }
        `,
    };

    var customPass = new ShaderPass(myEffect);

    var composerPass = () => {
      customPass.renderToScreen = true;
      composer.addPass(customPass);
    };

    // UPDATE THE IMG HOVER VALUE ON MOUSE HOVER
    var mouseMovement = () => {
      window.addEventListener(
        "mousemove",
        (event) => {
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(scene.children);

          if (intersects.length > 0) {
            let obj = intersects[0].object;
            obj.material.uniforms.hover.value = intersects[0].uv;
          }
        },
        false
      );
    };

    // CREATE THE IMAGES, SET THE SIZE & THE POSITION
    var materials = [];

    var addImages = () => {
      let material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          uImage: { value: 0 },
          hover: { value: new THREE.Vector2(0.5, 0.5) },
          hoverState: { value: 0 },
        },
        side: THREE.DoubleSide,
        fragmentShader: fragment,
        vertexShader: vertex,
      });

      var imageStore = images.map((img) => {
        let bounds = img.getBoundingClientRect();
        let geometry = new THREE.PlaneBufferGeometry(1, 1, 10, 10);
        let texture = new THREE.TextureLoader().load(img.src);

        material = material.clone();
        materials.push(material);
        material.uniforms.uImage.value = texture;

        let mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(bounds.width, bounds.height, 1);
        scene.add(mesh);

        return {
          img: img,
          mesh: mesh,
          top: bounds.top,
          left: bounds.left,
          width: bounds.width,
          height: bounds.height,
        };
      });

      // SET THE G-SAP ANIMATIONS
      imageStore.forEach((o) => {
        let value = o.mesh.material.uniforms.hoverState;

        o.img.addEventListener("mouseenter", () => {
          gsap.to(value, {
            duration: 1.5,
            value: 1,
            ease: "power3.out",
          });
        });
        o.img.addEventListener("mouseout", () => {
          gsap.to(value, {
            duration: 1.5,
            value: 0,
            ease: "power3.out",
          });
        });
      });

      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      }

      // WINDOW SCROLL EVENT
      window.addEventListener('scroll',function(event){
        currentScroll = window.scrollY;
        sizes.width=window.innerWidth;
        sizes.height=window.innerHeight;

        imageStore.forEach((o) => {
          // SET IMAGE SCALE
          o.mesh.scale.set(o.img.clientWidth, o.img.clientHeight, 1);

          // SET IMAGE POSITION
          o.mesh.position.y =
            currentScroll -
            o.img.offsetTop -
            320 +
            sizes.height / 2 -
            o.img.clientHeight / 2;
          o.mesh.position.x =
            o.img.offsetLeft - sizes.width / 2 + o.img.clientWidth / 2;
        });

        // CHANGE THE CAMERA SCALE
        camera.aspect=sizes.width/sizes.height;
        // UPDATE CAMERA PROPERTIES
        camera.updateProjectionMatrix()
        // SET CANVAS SIZE
        renderer.setSize(sizes.width,sizes.height)
      });

      // WINDOW RESIZE EVENT
      window.addEventListener('resize',function(event){
        window.dispatchEvent(scrollEvent);
      });

      var scrollEvent = new CustomEvent("scroll");
      var resizeEvent = new CustomEvent("resize");

      // SET THE POSITION ON PAGE-LOAD
      window.dispatchEvent(scrollEvent);
    };


    // RENDER SETTINGS
    var render = function () {
      currentTime += 0.05;

      {/*
      if (Math.round(currentScroll) == Math.round(window.scrollY)) {
        //console.log("should render");
      }
      */}

      materials.forEach((m) => {
        m.uniforms.time.value = currentTime;
      });
      customPass.uniforms.time.value = currentTime;

      renderer.render(scene, camera);
      composer.render();

      requestAnimationFrame(render);
    };

    return;
  }, []);

  return <div ref={mountRef}></div>;
};

export default Canvas;
