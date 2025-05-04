// Select the subtitle container and listen button
const subtitle = document.createElement("div");
subtitle.classList.add("subtitle");
document.body.appendChild(subtitle);

// Function to display subtitles
function displaySubtitle(text) {
  subtitle.textContent = text;
  subtitle.classList.add("show");

  // Hide subtitle after 4 seconds
  setTimeout(() => {
    subtitle.classList.remove("show");
  }, 4000);
}

// Function to speak and display subtitle
function speakAndShowSubtitle(text) {
  speak(text);  // Speak the text
  displaySubtitle(text);  // Show subtitle
}

// Initial greeting when the page loads
window.addEventListener("load", () => {
  speakAndShowSubtitle("Good to meet you! I am your AI Assistant, ready to help with any command or have a chat.");
  speakAndShowSubtitle("Please press the button and provide your command!");
});

// Speech recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

// Select the listen button
const btn = document.querySelector(".listen-btn");

// Function to convert text to speech
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

// Attach click event listener to the button
btn.addEventListener("click", function () {
  speakAndShowSubtitle("How can I help you Sir?");
  
  setTimeout(() => {
    btn.innerHTML = "Listening...";
    btn.style.backgroundColor = "orange";
    recognition.start();
  }, 1500);

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    handleCommand(command);
  };

  recognition.onend = () => {
    btn.innerHTML = "Start Listening";
    btn.style.backgroundColor = "";
  };

  recognition.onerror = (event) => {
    speakAndShowSubtitle("Error: " + event.error);
    btn.innerHTML = "Start Listening";
    btn.style.backgroundColor = "";
  };
});

// Function to handle recognized commands and conversation
function handleCommand(command) {
  // Detecting the mood or tone of the conversation
  if (command.includes("not feeling well") || command.includes("sick") || command.includes("bad")) {
    speakAndShowSubtitle("I'm really sorry to hear that. Please make sure to take some medicine and rest well.");
  } else if (command.includes("bored") || command.includes("nothing to do")) {
    speakAndShowSubtitle("How about watching a movie or trying a new hobby? I can suggest some fun activities!");
  } else if (command.includes("tired") || command.includes("need rest")) {
    speakAndShowSubtitle("It sounds like you need a break. Rest is really important, take it easy!");
  } else if (command.includes("happy") || command.includes("good")) {
    speakAndShowSubtitle("That's awesome to hear! Keep those positive vibes!");
  }
  // Handling more natural conversation (general responses)
  else if (command.includes("hello") || command.includes("hi")) {
    speakAndShowSubtitle("Hello! How can I assist you today?");
  } else if (command.includes("how are you")) {
    speakAndShowSubtitle("I'm here and ready to assist! How are you?");
  } else if (command.includes("tell me a joke")) {
    speakAndShowSubtitle("Why don't skeletons fight each other? They don't have the guts!");
  } else if (command.includes("thank you")) {
    speakAndShowSubtitle("You're very welcome! Let me know if you need anything else.");
  } else if (command.includes("goodbye") || command.includes("bye")) {
    speakAndShowSubtitle("Goodbye! Take care and feel free to reach out anytime.");
  }
  // Fallback to a general chatbot behavior
  else {
    // If command is unclear, engage in a casual chat or provide a witty response
    const defaultResponses = [
      "Hmm, I'm not sure what you mean. Could you tell me more?",
      "I'm not quite sure about that. Let's talk about something else!",
      "Sorry, I didn't understand that. Maybe I can help with something else?"
    ];
    const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    speakAndShowSubtitle(randomResponse);
  }
}
