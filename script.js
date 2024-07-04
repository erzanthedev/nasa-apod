const resultsNav = document.getElementById("resultsNav");
const favouritesNav = document.getElementById("favouritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

// NASA API
const count = 10;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favourites = {};

function updateDOM() {
  resultsArray.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const link = document.createElement("a");
    link.href = item.url;
    link.title = "View Full Image";
    link.target = "_blank";

    const image = document.createElement("img");
    image.src = item.hdurl;
    image.alt = "NASA Picture of the day";
    image.loading = "lazy";
    image.classList.add("card-img-top");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = item.title;

    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    saveText.textContent = "Add to Favourites";
    saveText.setAttribute("onclick", `saveFavourites('${item.url}')`);

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = item.explanation;

    const footer = document.createElement("small");
    footer.classList.add("text-muted");

    const date = document.createElement("strong");
    date.textContent = item.date;

    const copyrightResult = item.copyright === undefined ? "" : item.copyright;
    const copyright = document.createElement("span");
    copyright.textContent = ` ${copyrightResult}`;

    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

const getNasaPictures = async () => {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    updateDOM();
  } catch (error) {
    console.log("Wooops, error here: ", error);
  }
};

// Add results to favourites
function saveFavourites(itemUrl) {
  // Loop through resultsArray to select favourites
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favourites[itemUrl]) {
      favourites[itemUrl] = item;
      console.log(JSON.stringify(favourites));
      // Show save confirmation after 2 seconds
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
      localStorage.setItem("nasaFavourites", JSON.stringify(favourites));
    }
  });
}

// On load
getNasaPictures();
