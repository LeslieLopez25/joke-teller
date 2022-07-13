const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// DISABLE/ENABLE BUTTON
function toggleButton() {
  button.disabled = !button.disabled;
}

// PASSING JOKE TO VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "17855d17857944178f00537cbd146d7c",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// GET JOKES FROM JOKE API
async function getJokes() {
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

  try {
    let joke = "";
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // TEXT-TO-SPEECH
    tellMe(joke);
    // DISABLE BUTTON
    toggleButton();
  } catch (error) {
    // CATCH ERRORS HERE
    console.log("whoops", error);
  }
}

// EVENT LISTENERS
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
