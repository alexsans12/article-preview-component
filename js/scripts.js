const cardFooter = document.querySelector(".card__footer");
const cardMainFooter = document.querySelector(".card__footer-main");
const shareButton = document.querySelector(".card__footer-share");
const shareTag = document.createElement("div");
let fragment;

shareButton.addEventListener('click', changeCardFooter);

window.addEventListener("resize", () => {
    if(window.innerWidth < 900 && shareButton.classList.contains("card__footer-share--active")) {
        createFooterShare();
    } else if(window.innerWidth > 900 && !cardFooter.querySelector(".card__footer-description")) {
        createFooterMain();
        emptyFooter();
        createFooterShare();
    }
});

function changeCardFooter() {
    if(!shareButton.classList.contains("card__footer-share--active")) {
        shareButton.classList.add("card__footer-share--active");
        cardFooter.classList.add("card__footer--active");
        createFooterShare();
    } else  {
        shareButton.classList.remove("card__footer-share--active");
        cardFooter.classList.remove("card__footer--active");
        createFooterMain();
    }
}

function createFooterMain() {
    const imgAvatar = document.createElement("img");
    imgAvatar.src ="./images/avatar-michelle.jpg";
        imgAvatar.alt = "avatar michelle";
        imgAvatar.classList.add("card__footer-avatar");

        const div = document.createElement("div");
        div.classList.add("card__footer-description");
        div.appendChild(createParagraph("Michelle Appleton", "name"));
        div.appendChild(createParagraph("28 Jun 2020", "date"));
        
        fragment = document.createDocumentFragment();
        fragment.appendChild(imgAvatar);
        fragment.appendChild(div);
        
        
        if(window.innerWidth < 900 || !cardFooter.querySelector(".card__footer-description")) {
            emptyFooter();
            cardMainFooter.appendChild(fragment);
        } else {
            emptyFooter();
            cardFooter.removeChild(shareTag);
        }
}

function createFooterShare() {
    const paragraph = document.createElement("p");
    paragraph.innerHTML = "Share";
    paragraph.classList.add("card__footer-main-text");

    fragment = document.createDocumentFragment();
    fragment.appendChild(paragraph);
    fragment.appendChild(createImg("facebook"));
    fragment.appendChild(createImg("twitter"));
    fragment.appendChild(createImg("pinterest"));

    if(window.innerWidth < 900) {
        emptyFooter();
        cardMainFooter.appendChild(fragment);
        if(cardFooter.contains(shareTag))
            cardFooter.removeChild(shareTag);
    } else {
        shareTag.classList.add("card__footer-share-tag");
        shareTag.appendChild(fragment);
        cardFooter.appendChild(shareTag);
    }
}

function createParagraph(text, type) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    paragraph.classList.add(`card__footer-description-${type}`);

    return paragraph
}

function createImg(name) {
    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", `./images/icon-${name}.svg`);
    imgElement.setAttribute("alt", `icon ${name}`);
    imgElement.classList.add("card__footer-icon");

    return imgElement;
}

function emptyFooter() {
    if(window.innerWidth < 900 || !cardFooter.querySelector(".card__footer-description"))
        cardMainFooter.innerHTML = ""
    else
        shareTag.innerHTML = "";
}
