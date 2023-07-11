const paragraph = [
  "Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story. No matter which of these challenges is undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing.",
  "Sleep deprivation causes all sorts of challenges and problems. When one doesn’t get enough sleep one’s mind doesn’t work clearly. Studies have shown that after staying awake for 24 hours one’s ability to do simple math is greatly impaired. Driving tired has been shown to be as bad as driving drunk. Moods change, depression, anxiety, and mania can be induced by lack of sleep. As much as people try to do without enough sleep it is a wonder more crazy things don’t happen in this world.Sleep deprivation causes all sorts of challenges and problems. When one doesn’t it.",
  "No! All of the paragraphs in the generator are written by humans, not computers. When first building this generator we thought about using computers to generate the paragraphs, but they weren't very good and many times didn't make any sense at all. We therefore took the time to create paragraphs specifically for this generator to make it the best that we could. No! All of the paragraphs in the generator are written by humans, not computers. When first building this generator we thought about using computers to generate the paragraphs, but they weren't very good and many times didn't make any sense at all. We therefore took the time to create paragraphs specifically for this generator to make it the best that we could.",
  "If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough, the next logical step is to find a random paragraph. We created the Random Paragraph Generator with you in mind. The process is quite simple. Choose the number of random paragraphs you'd like to see and click the button. Your chosen number of paragraphs will instantly while it may not be obvious to everyone, there are a number of reasons creating random paragraphs can be useful. A few examples of how some people use this generator are listed in the following paragraphs.",
  "Above are a few examples of how the random paragraph generator can be beneficial. The best way to see if this random paragraph picker will be useful for your intended purposes is to give it a try. Generate a number of paragraphs to see if they are beneficial to your current project.If you do find this paragraph tool useful, please do us a favor and let us know how you're using it. It's greatly beneficial for us to know the different ways this tool is being used so we can improve it with updates. This is especially true since there are times when the generators we create get used in completely unanticipated ways from when we initially created them. If you have the time, please send us a quick note on what you'd like to see changed or added to make it better in the future.",
];

const words = document.querySelector(".words");
const input = document.getElementById("text");
const mistake = document.querySelector(".mistake");
const time = document.querySelector(".time");
const wpm = document.querySelector(".wpm");
const cpm = document.querySelector(".cpm");
const tryAgain = document.querySelector("button")

let charIndex = 0;
let mistakes = 0;
let timer;
let maxTime = 60;
let timeLeft = 60;

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraph.length);
  paragraph[randIndex].split("").forEach((item) => {
    let spanTag = `<span>${item}</span>`;
    words.innerHTML += spanTag;
  });

  document.addEventListener("keydown", () => {
    input.focus()
    startTimer()
  });
  words.addEventListener("click", () => {
    input.focus()
    startTimer()
  });
}

function startTimer(){
  if(!timer){
     timer = setInterval(initTimer, 1000);
  }
}

function initTyping() {
  const char = words.querySelectorAll("span")[charIndex];
  let typedChar = input.value.split("")[charIndex];

  //  if user's hasn't entered any character or pressed backspace
  if (typedChar == null) {
    if (char.classList.contains("incorrect")) {
      mistakes--;
    }
    charIndex--;
    char.classList.remove("correct", "incorrect");
  } else {
    if (char.innerHTML === typedChar) {
      char.classList.add("correct");
      char.classList.remove("incorrect");
    } else {
      char.classList.add("incorrect");
      char.classList.remove("correct");
      mistakes++;
    }
    charIndex++;
  }

  let wpmTag = Math.round(((charIndex - mistakes) / 5) * ((maxTime - timeLeft) / 60));
  if(cpm > 0){
    cpm = 0;
  }

  mistake.innerHTML = mistakes;
  cpm.innerHTML = charIndex - mistakes;
  wpmTag = wpmTag < 0 || !wpmTag || wpmTag === Infinity ? 0 : wpmTag;
  if(timeLeft >0){
    wpm.innerHTML = wpmTag;
  }
}

randomParagraph();
input.addEventListener("input", initTyping);

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    time.innerHTML = timeLeft;
  } else {
    clearInterval(timer);
  }
}

tryAgain.addEventListener("click", function(){
  location.reload()
})

window.addEventListener("DOMContentLoaded", function () {
  input.value = "";
});