

    /* =====================================================
       PROFILE IMAGE LOADER
       =====================================================

       This checks several common filenames.

       Preferred:
       assets/profile.jpg

       Also supported:
       assets/profile.jpeg
       assets/profile.png
       assets/Profile.jpg
       assets/Profile.jpeg
       assets/Aradhya.jpg
       assets/Aradhya.jpeg
    ===================================================== */

    const profileImage =
      document.getElementById("profileImage");

    const possibleImages = [
      "./assets/profile.jpg",
      "./assets/profile.jpeg",
      "./assets/profile.png",
      "./assets/Profile.jpg",
      "./assets/Profile.jpeg",
      "./assets/Profile.png",
      "./assets/Aradhya.jpg",
      "./assets/Aradhya.jpeg",
      "./assets/Aradhya.png",
      "./profile.jpg",
      "./profile.jpeg",
      "./profile.png"
    ];

    let imageIndex = 0;

    function tryNextImage(){

      if(imageIndex >= possibleImages.length){

        console.error(
          "Profile image not found. Put your photo inside the assets folder and name it profile.jpg"
        );

        return;
      }

      profileImage.src =
        possibleImages[imageIndex];

      imageIndex++;

    }

    profileImage.addEventListener(
      "error",
      tryNextImage
    );

    profileImage.addEventListener(
      "load",
      () => {

        profileImage.style.visibility = "visible";

        console.log(
          "Profile image loaded:",
          profileImage.src
        );

      }
    );


    /* =====================================================
       BACKGROUND PARTICLES
    ===================================================== */

    if(window.tsParticles){

      tsParticles.load({

        id:"particles",

        options:{

          background:{
            color:{
              value:"transparent"
            }
          },

          fpsLimit:30,

          particles:{

            number:{
              value:35,

              density:{
                enable:true,
                area:1100
              }
            },

            color:{
              value:[
                "#52f6ff",
                "#9d7cff",
                "#ffffff"
              ]
            },

            links:{
              enable:true,

              distance:135,

              color:"#6d7d9b",

              opacity:.13,

              width:1
            },

            move:{
              enable:true,

              speed:.42,

              direction:"none",

              outModes:{
                default:"out"
              }
            },

            opacity:{
              value:.34,

              animation:{
                enable:true,

                speed:.6,

                minimumValue:.08
              }
            },

            size:{
              value:{
                min:1,
                max:2.5
              }
            }

          },

          interactivity:{

            events:{

              onHover:{
                enable:true,
                mode:"grab"
              },

              resize:true
            },

            modes:{

              grab:{
                distance:180,

                links:{
                  opacity:.35
                }
              }

            }

          },

          detectRetina:true

        }

      });

    }


    /* =====================================================
       PHOTO PARTICLES
    ===================================================== */

    if(window.tsParticles){

      tsParticles.load({

        id:"photoParticles",

        options:{

          fullScreen:{
            enable:false
          },

          fpsLimit:60,
          detectRetina:true,

          background:{
            color:{
              value:"transparent"
            }
          },

          particles:{

            number:{
              value:72,

              density:{
                enable:true,
                area:430
              }
            },

            color:{
              value:[
                "#52f6ff",
                "#9d7cff",
                "#ffffff"
              ]
            },

            shape:{
              type:"circle"
            },

            opacity:{
              value:{
                min:.38,
                max:.9
              },

              animation:{
                enable:true,
                speed:1.2,
                minimumValue:.18,
                sync:false
              }
            },

            size:{
              value:{
                min:1.1,
                max:3.1
              },

              animation:{
                enable:true,
                speed:1.8,
                minimumValue:.7,
                sync:false
              }
            },

            links:{
              enable:true,
              distance:72,
              color:"#52f6ff",
              opacity:.16,
              width:.8
            },

            move:{
              enable:true,
              speed:.75,
              direction:"none",
              random:true,
              straight:false,
              outModes:{
                default:"bounce"
              },
              attract:{
                enable:false
              }
            }
          },

          interactivity:{
            detectsOn:"canvas",

            events:{
              onHover:{
                enable:true,
                mode:["repulse","bubble"]
              },
              onClick:{
                enable:true,
                mode:"push"
              },
              resize:true
            },

            modes:{
              repulse:{
                distance:135,
                duration:.45,
                factor:2.8,
                speed:1.8,
                maxSpeed:7,
                easing:"ease-out-quad"
              },
              bubble:{
                distance:105,
                size:4.8,
                duration:.35,
                opacity:1
              },
              push:{
                quantity:5
              }
            }
          }
        }
      });

    }


    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    const words = [
      "Django.",
      "Python.",
      "Java.",
      "data systems.",
      "web interfaces."
    ];

    const typed =
      document.getElementById("typed");

    let wi = 0;
    let ci = 0;
    let deleting = false;

    function typeLoop(){

      const word = words[wi];

      typed.textContent =
        deleting
          ? word.slice(0,ci--)
          : word.slice(0,ci++);

      if(
        !deleting &&
        ci > word.length
      ){

        deleting = true;

        setTimeout(
          typeLoop,
          1150
        );

        return;
      }

      if(
        deleting &&
        ci < 0
      ){

        deleting = false;

        wi =
          (wi + 1) %
          words.length;

        ci = 0;
      }

      setTimeout(
        typeLoop,
        deleting ? 42 : 75
      );
    }

    typeLoop();


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    addEventListener(
      "scroll",
      () => {

        const h =
          document.documentElement;

        const denominator =
          h.scrollHeight -
          h.clientHeight;

        const p =
          denominator > 0
            ? h.scrollTop / denominator * 100
            : 0;

        document
          .getElementById("progress")
          .style.width =
          p + "%";

      },
      {
        passive:true
      }
    );


    /* =====================================================
       REVEAL OBSERVER
    ===================================================== */

    const observer =
      new IntersectionObserver(

        (entries) => {

          entries.forEach(
            entry => {

              if(entry.isIntersecting){

                entry.target
                  .classList
                  .add("show");

              }

            }
          );

        },

        {
          threshold:.08
        }

      );

    document
      .querySelectorAll(".reveal")
      .forEach(
        el => observer.observe(el)
      );


    /* =====================================================
       COUNTERS
    ===================================================== */

    const counters =
      document.querySelectorAll(
        ".counter"
      );

    const counterObserver =
      new IntersectionObserver(

        (entries,obs) => {

          entries.forEach(
            entry => {

              if(!entry.isIntersecting)
                return;

              const el =
                entry.target;

              const target =
                Number(
                  el.dataset.target
                );

              const decimals =
                target % 1
                  ? 2
                  : 0;

              let startTime = null;

              function tick(t){

                if(!startTime)
                  startTime = t;

                const progress =
                  Math.min(
                    (t-startTime)/1100,
                    1
                  );

                const eased =
                  1 -
                  Math.pow(
                    1-progress,
                    3
                  );

                el.textContent =
                  (
                    target *
                    eased
                  ).toFixed(
                    decimals
                  );

                if(progress < 1){

                  requestAnimationFrame(
                    tick
                  );

                }

              }

              requestAnimationFrame(
                tick
              );

              obs.unobserve(el);

            }
          );

        },

        {
          threshold:.8
        }

      );

    counters.forEach(
      c => counterObserver.observe(c)
    );


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    document
      .querySelectorAll(".magnetic")
      .forEach(el => {

        el.addEventListener(
          "mousemove",
          e => {

            const r =
              el.getBoundingClientRect();

            const x =
              (
                e.clientX -
                r.left -
                r.width/2
              ) * .13;

            const y =
              (
                e.clientY -
                r.top -
                r.height/2
              ) * .13;

            el.style.transform =
              `translate(${x}px,${y}px)`;

          }
        );

        el.addEventListener(
          "mouseleave",
          () => {

            el.style.transform = "";

          }
        );

      });


    /* =====================================================
       3D TILT
    ===================================================== */

    if(
      window.matchMedia(
        "(pointer:fine)"
      ).matches
    ){

      document
        .querySelectorAll(".tilt")
        .forEach(el => {

          el.addEventListener(
            "mousemove",
            e => {

              const r =
                el.getBoundingClientRect();

              const x =
                (e.clientX-r.left) /
                r.width -
                .5;

              const y =
                (e.clientY-r.top) /
                r.height -
                .5;

              /*
                Don't tilt the photo too aggressively.
              */

              if(
                el.classList.contains(
                  "photo-card"
                )
              ){

                el.style.transform =
                  `
                  perspective(900px)
                  rotateY(${x*3}deg)
                  rotateX(${-y*3}deg)
                  scale(1.015)
                  `;

              }else{

                el.style.transform =
                  `
                  perspective(900px)
                  rotateY(${x*7}deg)
                  rotateX(${-y*7}deg)
                  translateY(-4px)
                  `;

              }

            }
          );

          el.addEventListener(
            "mouseleave",
            () => {

              el.style.transform = "";

            }
          );

        });

    }


    /* =====================================================
       GSAP
    ===================================================== */

    if(window.gsap){

      gsap.from(
        ".navbar",
        {
          y:-30,
          opacity:0,
          duration:1,
          ease:"power3.out"
        }
      );

      gsap.from(
        ".hero h2",
        {
          y:40,
          opacity:0,
          duration:1.1,
          delay:.15,
          ease:"power4.out"
        }
      );

    }


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    if(
      window.matchMedia(
        "(pointer:fine)"
      ).matches
    ){

      const dot =
        document.getElementById(
          "cursorDot"
        );

      const ring =
        document.getElementById(
          "cursorRing"
        );

      let mx = 0;
      let my = 0;

      let rx = 0;
      let ry = 0;

      addEventListener(
        "mousemove",
        e => {

          mx = e.clientX;
          my = e.clientY;

          dot.style.left =
            mx + "px";

          dot.style.top =
            my + "px";

          document.body
            .classList
            .add("cursor-active");

        },
        {
          passive:true
        }
      );

      addEventListener(
        "mouseleave",
        () => {

          document.body
            .classList
            .remove(
              "cursor-active"
            );

        }
      );

      function cursorFrame(){

        rx +=
          (mx-rx)*.16;

        ry +=
          (my-ry)*.16;

        ring.style.left =
          rx + "px";

        ring.style.top =
          ry + "px";

        requestAnimationFrame(
          cursorFrame
        );

      }

      cursorFrame();


      document
        .querySelectorAll(
          "a,button,.magnetic,.tilt,.chip,.expertise-item"
        )
        .forEach(el => {

          el.addEventListener(
            "mouseenter",
            () => {

              document.body
                .classList
                .add("cursor-hover");

            }
          );

          el.addEventListener(
            "mouseleave",
            () => {

              document.body
                .classList
                .remove("cursor-hover");

            }
          );

        });

    }


    /* =====================================================
       YEAR
    ===================================================== */

    document
      .getElementById("year")
      .textContent =
      new Date().getFullYear();

  