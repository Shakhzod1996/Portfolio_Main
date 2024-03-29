window.addEventListener("load", function () {
    document.querySelector(".preloader").classList.add("opacity-0");

    setTimeout(function () {
        document.querySelector(".preloader").style.display = "none";
    }, 1000);
});

// ? Portfolio sending Data Message to bot

const inputName = document.querySelector(".inputName");
const inputEmail = document.querySelector(".inputEmail");
const inputSabject = document.querySelector(".inputSabject");
const inputMessage = document.querySelector(".inputMessage");
const submitButton = document.querySelector(".send-btn");

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (!alertify.myAlert) {
        //define a new dialog
        alertify.dialog("myAlert", function factory() {
            return {
                main: function (message) {
                    this.message = message;
                },
                setup: function () {
                    return {
                        buttons: [{ text: "cancel!", key: 27 /*Esc*/ }],
                        focus: { element: 0 },
                    };
                },
                prepare: function () {
                    this.setContent(this.message);
                },
            };
        });
    }
    alertify.set("notifier", "position", "top-right");

    if (
        inputMessage.value &&
        inputEmail.value &&
        inputName.value &&
        inputSabject.value
    ) {
        fetch("https://shakhzod.roundedteam.uz/message", {
            method: "POST",
            headers: {
                Accept: "application.json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: inputName.value,
                phoneNumber: inputEmail.value,
                subject: inputSabject.value,
                message: inputMessage.value,
            }),
            cache: "default",
        })
            .then(() => {
                alertify.success("Message successfully sent!");
                inputMessage.value = "";
                inputEmail.value = "";
                inputName.value = "";
                inputSabject.value = "";
            })
            .then(() => {})
            .catch((err) => {
                alertify.error(err.message);
            });
    } else {
        alertify.error("Please fill out fields");
    }
});

//Portfolio Item Filter
const filterContainer = document.querySelector(".portfolio-filter"),
    filterBtns = filterContainer.children,
    totalFilterBtn = filterBtns.length;
(portfolioItems = document.querySelectorAll(".portfolio-item")),
    (totalPortfolioItem = portfolioItems.length);

for (let i = 0; i < totalFilterBtn; i++) {
    filterBtns[i].addEventListener("click", function () {
        filterContainer.querySelector(".active").classList.remove("active");
        this.classList.add("active");

        const filterValue = this.getAttribute("date-filter");
        for (let k = 0; k < totalPortfolioItem; k++) {
            if (
                filterValue === portfolioItems[k].getAttribute("data-category")
            ) {
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            } else {
                portfolioItems[k].classList.remove("show");
                portfolioItems[k].classList.add("hide");
            }
            if (filterValue === "all") {
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            }
        }
    });
}

//Portfolio Lightbox
const lightbox = document.querySelector(".lightbox"),
    lightboxImg = lightbox.querySelector(".lightbox-img"),
    lightboxClose = lightbox.querySelector(".lightbox-close"),
    lightboxText = lightbox.querySelector(".caption-text"),
    lightboxCounter = lightbox.querySelector(".caption-counter");
let itemIndex = 0;

for (let i = 0; i < totalPortfolioItem; i++) {
    portfolioItems[i].addEventListener("click", function () {
        itemIndex = i;
        changeItem();
        toggleLightbox();
    });
}

function nextItem() {
    if (itemIndex === totalPortfolioItem - 1) {
        itemIndex = 0;
    } else {
        itemIndex++;
    }
    changeItem();
}

function prevItem() {
    if (itemIndex === 0) {
        itemIndex = totalPortfolioItem - 1;
    } else {
        itemIndex--;
    }
    changeItem();
}

function toggleLightbox() {
    lightbox.classList.toggle("open");
}

function changeItem() {
    imgSrc = portfolioItems[itemIndex]
        .querySelector(".portfolio-img img")
        .getAttribute("src");
    lightboxImg.src = imgSrc;
    lightboxText.innerHTML =
        portfolioItems[itemIndex].querySelector("h4").innerHTML;
    lightboxCounter.innerHTML = itemIndex + 1 + " of " + totalPortfolioItem;
}

//Close Lightbox
lightbox.addEventListener("click", function (event) {
    if (event.target === lightboxClose || event.target === lightbox) {
        toggleLightbox();
    }
});

// Aside Navbar
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        //remove back section Class
        for (let i = 0; i < totalSection; i++) {
            allSection[i].classList.remove("back-section");
        }

        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                //add back section Class
                allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }

        this.classList.add("active");
        showSection(this);

        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    });
}

function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active");
}

function updateNave(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (
            target ===
            navList[i].querySelector("a").getAttribute("href").split("#")[1]
        ) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

document.querySelector(".hire-me").addEventListener("click", function () {
    const sectionIndex = this.getAttribute("data-section-index");

    showSection(this);
    updateNave(this);
});

const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", asideSectionTogglerBtn);

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}

const currentYear = new Date().getFullYear();
const myYearEl = document.querySelector(".my-year");

myYearEl.innerHTML = currentYear - 1996;

window.replainSettings = { id: "62fe0c12-67cb-43ea-9adc-f695be55aa89" };
(function (u) {
    var s = document.createElement("script");
    s.async = true;
    s.src = u;
    var x = document.getElementsByTagName("script")[0];
    x.parentNode.insertBefore(s, x);
})("https://widget.replain.cc/dist/client.js");
