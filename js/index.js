document.addEventListener("DOMContentLoaded", () => {
    console.log("Site Version: v1.2\nMenu Hamburger: https://github.com/ceevdev/ceev-html/blob/main/js/index.js\nDev: https://github.com/slx10")

    const menuHamburger = document.getElementById("menu-hamburger");
    const controller = document.getElementById("controller");
    if (menuHamburger) {
        function hideElement(element) {
            element.style.display = "none";
        }
      
        function showElement(element) {
            element.style.display = "flex";
        }
      
        function fadeHideElement(element) {
            element.classList.remove("show");
            setTimeout(() => {
                element.style.display = "none";
            }, 500);
        }
      
        function fadeShowElement(element) {
            element.style.display = "flex";
            setTimeout(() => {
                element.classList.add("show");
            }, 10);
        }
    }

    let menuIsToggled = false;

    const preventScroll = (event) => {
        event.preventDefault();
        window.scrollTo(0, 0);
    };

    document.getElementById("menu-toggle").addEventListener("click", () => {
        if (!menuIsToggled) {
            document.querySelector("body").style.overflowY = "hidden";
            window.addEventListener('scroll', preventScroll);

            fadeShowElement(menuHamburger);
            menuIsToggled = true;
        } else {
            document.querySelector("body").style.overflowY = "visible";
            window.removeEventListener('scroll', preventScroll);
            
            fadeHideElement(menuHamburger);
            menuIsToggled = false;
        }
    })

    function menuCheck(width) {
        try {

            if (width <= 780) {
                menuHamburger.innerHTML = "";
                hideElement(document.getElementById("search"));
                hideElement(document.getElementById("social-medias"));
                hideElement(document.getElementById("sidebar"));
                showElement(document.getElementById("menu-toggle"));
                if (controller) {
                    showElement(document.getElementById("controller"))
                }
                
                const sidebarNew = document
                    .getElementById("sidebar")
                    .cloneNode(true);

                const socialMediasNew = document
                    .getElementById("social-medias")
                    .cloneNode(true);

                showElement(sidebarNew);
                showElement(socialMediasNew);
                menuHamburger.append(sidebarNew,socialMediasNew);
            } else {
                if (controller) {
                    hideElement(document.getElementById("controller"))
                }
                hideElement(document.getElementById("menu-toggle"));
                showElement(document.getElementById("search"));
                showElement(document.getElementById("social-medias"));
                showElement(document.getElementById("sidebar"));

                menuHamburger.innerHTML = "";
                menuIsToggled = false;
            }

        } catch(error) {
            console.error(error);
        }
    }

    window.addEventListener("resize", (event) => {
        menuCheck(event.currentTarget.innerWidth)
    })

    menuCheck(window.innerWidth)
});