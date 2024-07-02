// NASA API
const count = 10;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

const getNasaPictures = async () => {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    console.log(resultsArray);
  } catch (error) {
    console.log("Wooops, error here: ", error);
  }
};

// On load
getNasaPictures();
