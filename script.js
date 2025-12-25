/* ===============================
   ELEMENT REFERENCES
   =============================== */
const giftWrapper = document.getElementById('giftBox');
const modal = document.getElementById('giftModal');
const submitBtn = document.getElementById('submitGift');
const errorText = document.getElementById('errorText');

const nameInput = document.getElementById('nameInput');
const suggestionsBox = document.getElementById('nameSuggestions');
const passwordInput = document.getElementById('passwordInput');
const modalGreeting = document.getElementById('modalGreeting');

/* ===============================
   SOUND EFFECTS
   =============================== */

const giftClickSound = new Audio('assets/gift-click.mp3');
giftClickSound.volume = 0.6; // adjust if needed

/* ===============================
   ALLOWED NAMES
   =============================== */
const allowedNames = [
  "Iron", "Suzy", "Robert", "Bryan", "Cullen", "Teo", "Malas",
  "Vinny", "Ern", "Jalbert", "Ulrich", "Sketch", "Lilly",
  "Siffrin", "Lya", "Kaya", "Remuwel", "Val", "Azzy", "Axo", "Tiz",
  "Kaz", "Hal", "Akito"
];

/* ===============================
   PASSWORD DATABASE 
   (if you have gained access to this database, which yes, 
   i know it's easy to do and get access, 
   please keep it secret and have respect for others' privacy, 
   do not share it and do not open others' gift pages without permission)
   =============================== */
const giftPasswords = {
  Iron: "password1",
  Suzy: "password2",
  Robert: "password3",
  Bryan: "password4",
  Cullen: "password5",
  Teo: "password6",
  Malas: "password7",
  Vinny: "password8",
  Ern: "password9",
  Jalbert: "password10",
  Ulrich: "password11",
  Sketch: "password12",
  Lilly: "password13",
  Siffrin: "password14",
  Lya: "password15",
  Kaya: "password16",
  Remuwel: "password17",
  Azzy: "password18",
  Axo: "password19",
  Tiz: "password20",
  Kaz: "password21",
  Hal: "password22",
  Akito: "password23"
};

/* ===============================
   SETTINGS
   =============================== */
const MIN_LETTERS = 3; // Minimum letters before suggestions appear

/* ===============================
   OPEN MODAL
   =============================== */
   
giftWrapper.addEventListener('click', () => {
  // play sound
  giftClickSound.currentTime = 0;
  giftClickSound.play();

  // open modal
  modal.classList.remove('hidden');
  nameInput.focus();
});

/* ===============================
   AUTOCOMPLETE WITH MIN LETTERS
   =============================== */
nameInput.addEventListener('input', () => {
  const value = nameInput.value.toLowerCase();
  suggestionsBox.innerHTML = "";

  // Only show suggestions if the input length is >= MIN_LETTERS
  if (value.length < MIN_LETTERS) {
    suggestionsBox.classList.add('hidden');
    return;
  }

  const matches = allowedNames.filter(name =>
    name.toLowerCase().startsWith(value)
  );

  if (matches.length === 0) {
    suggestionsBox.classList.add('hidden');
    return;
  }

  matches.forEach(name => {
    const div = document.createElement('div');
    div.textContent = name;

    div.addEventListener('click', () => {
      nameInput.value = name;
      suggestionsBox.classList.add('hidden');
    });

    suggestionsBox.appendChild(div);
  });

  suggestionsBox.classList.remove('hidden');
});

/* ===============================
   SUBMIT / VALIDATION
   =============================== */
submitBtn.addEventListener('click', () => {
  const enteredName = nameInput.value;
  const enteredPassword = passwordInput.value;

  errorText.textContent = "";

  if (!enteredName || !enteredPassword) {
    errorText.textContent = "Please enter your details!";
    return;
  }

  if (!giftPasswords[enteredName]) {
    errorText.textContent = "Name not recognized.";
    return;
  }

  if (giftPasswords[enteredName] !== enteredPassword) {
    errorText.textContent = "Incorrect code. Try again!";
    return;
  }

  // Close modal
  modal.classList.add('hidden');

  // Redirect to personalized gift page
  const pageName = enteredName.toLowerCase();
  window.location.href = `gifts/${pageName}.html`;
});
