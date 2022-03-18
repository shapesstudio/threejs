import { useEffect, useRef } from "react";
import imagesLoaded from "imagesloaded";
import gsap from "gsap";
import FontFaceObserver from "fontfaceobserver";
import * as THREE from "three";
import fragment from "raw-loader!glslify-loader!./shaders/fragment.glsl";
import vertex from "raw-loader!glslify-loader!./shaders/vertex.glsl";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//import ocean from "../public/images/ocean.jpg";

const Canvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // INITIALIZE VARIABLES
    var time = 0;
    var scene = new THREE.Scene();
    var width = window.innerWidth;
    var height = window.innerHeight;

    var camera = new THREE.PerspectiveCamera(70, width / height, 100, 2000);
    camera.position.z = 600;
    camera.fov = 2 * Math.atan(height / 2 / 600) * (180 / Math.PI);
    camera.updateProjectionMatrix();

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);

    var images = [...document.querySelectorAll("img")];

    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);

    const fontHoves = new Promise((resolve) => {
      new FontFaceObserver("TT Hoves").load().then(() => {
        resolve();
      });
    });

    // PRELOAD IMAGES
    const preloadImages = new Promise((resolve, reject) => {
      imagesLoaded(
        document.querySelectorAll("img"),
        { background: true },
        resolve
      );
    });

    let allDone = [fontHoves, preloadImages];
    var currentScroll = 0;

    Promise.all(allDone).then(() => {
      addImages();
      mouseMovement();
      handleResize();
      setupResize();
      render();
    });

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    var mouseMovement = () => {
      window.addEventListener(
        "mousemove",
        (event) => {
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

          raycaster.setFromCamera(mouse, camera);

          const intersects = raycaster.intersectObjects(scene.children);

          if (intersects.length > 0) {
            //console.log(intersects[0]);
            let obj = intersects[0].object;
            obj.material.uniforms.hover.value = intersects[0].uv;
          }
        },
        false
      );
    };

    var addObjects = () => {
      var geometry = new THREE.PlaneBufferGeometry(width, height, 1, 5);
      var material = new THREE.MeshNormalMaterial();
      var material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          oceanTexture: {
            value: new THREE.TextureLoader().load(/*
              "https://images.pexels.com/photos/11044666/pexels-photo-11044666.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            */),
          },
        },
        side: THREE.DoubleSide,
        fragmentShader: fragment,
        vertexShader: vertex,
        //wireframe: true,
      });
      var cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
    };

    var handleResize = () => {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    var setupResize = () => {
      window.addEventListener("resize", handleResize, false);
    };
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
        //wireframe: true,
      });

      var imageStore = images.map((img) => {
        let bounds = img.getBoundingClientRect();
        let geometry = new THREE.PlaneBufferGeometry(
          bounds.width,
          bounds.height,
          10,
          10
        );
        let texture = new THREE.TextureLoader().load(img.src);
        texture.needsUpdate = true;

        material = material.clone();

        materials.push(material);
        material.uniforms.uImage.value = texture;

        let mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        img.addEventListener("mouseenter", () => {
          gsap.to(material.uniforms.hoverState, {
            duration: 1,
            value: 1,
            ease: "power3.out",
          });
        });
        img.addEventListener("mouseout", () => {
          gsap.to(material.uniforms.hoverState, {
            duration: 1,
            value: 0,
            ease: "power3.out",
          });
        });

        return {
          img: img,
          mesh: mesh,
          top: bounds.top,
          left: bounds.left,
          width: bounds.width,
          height: bounds.height,
        };
      });
      //console.log(imageStore);

      var setPosition = () => {
        imageStore.forEach((o) => {
          o.mesh.position.y = currentScroll - o.top + height / 2 - o.height / 2;
          o.mesh.position.x = o.left - width / 2 + o.width / 2;
        });
      };
      setPosition();

      window.addEventListener("scroll", () => {
        currentScroll = window.scrollY;
        setPosition();
      });
    };

    var render = function () {
      time += 0.05;

      materials.forEach((m) => {
        m.uniforms.time.value = time;
      });

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };

    return;
  }, []);

  return <div ref={mountRef}></div>;
};

export default Canvas;
