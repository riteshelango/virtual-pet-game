// Custom select functionality
const customSelect = document.querySelector('.custom-select');
const selectButton = customSelect.querySelector('.select-button');
const selectDropdown = customSelect.querySelector('.select-dropdown');
const options = selectDropdown.querySelectorAll('li');
const selectedValue = customSelect.querySelector('.selected-value');
const hiddenSelect = document.getElementById('pet-type');

selectButton.addEventListener('click', (e) => {
  e.stopPropagation();
  selectDropdown.classList.toggle('hidden');

  const isExpanded = !selectDropdown.classList.contains('hidden');
  selectButton.setAttribute('aria-expanded', isExpanded);
});

options.forEach(option => {
  option.addEventListener('click', () => {
    // Remove selected class from all options
    options.forEach(opt => opt.classList.remove('selected'));

    // Add selected class to clicked option
    option.classList.add('selected');

    // Update display and hidden select
    selectedValue.textContent = option.textContent;
    hiddenSelect.value = option.getAttribute('data-value');

    // Close dropdown
    selectDropdown.classList.add('hidden');
    selectButton.setAttribute('aria-expanded', 'false');
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
  selectDropdown.classList.add('hidden');
  selectButton.setAttribute('aria-expanded', 'false');
});

// Start button functionality
/*
document.getElementById('start-btn').addEventListener('click', function () {
  const petName = document.getElementById('pet-name').value.trim();
  const petType = document.getElementById('pet-type').value;

  if (!petName) {
    alert('Please enter a name for your pet!');
    return;
  }

  if (!petType) {
    alert('Please choose a pet type!');
    return;
  }

  // Hide the setup screen with animation
  const setupScreen = document.getElementById('disappearing-setup-screen');
  setupScreen.style.animation = 'slideOut 0.5s ease-in';

  setTimeout(() => {
    setupScreen.style.display = 'none';
    // Here you would show your main game screen
    console.log(`Starting game with ${petName} the ${petType}!`);
  }, 500);
});
*/
// Add slide out animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOut {
    to {
      opacity: 0;
      transform: translateY(-30px);
    }
  }
`;
document.head.appendChild(style);



const startBtn = document.getElementById("start-btn");
const setupScreen = document.getElementById("disappearing-setup-screen");
const petNameInput = document.getElementById("pet-name");
const mainScreen = document.getElementById("main-screen");
const petImage = document.getElementById("pet-image");
const petTypeSelect = document.getElementById("pet-type");
const feedBtn = document.getElementById("feed-btn");
const earnBtn = document.getElementById("earn-btn");
const playBtn = document.getElementById("play-btn");
const restBtn = document.getElementById("rest-btn");
const cleanlinessBtn = document.getElementById("cleanliness-btn");
const cleanBtn = document.getElementById("clean-btn");
const healthCheckBtn = document.getElementById("health-btn");




let hunger = 60;
let happiness = 70;
let energy = 100;
let health = 75;
let money = 70;
let cleanliness = 85;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}


function updateStats() {
  hunger = clamp(hunger, 0, 100);
  happiness = clamp(happiness, 0, 100);
  energy = clamp(energy, 0, 100);
  health = clamp(health, 0, 100);
  cleanliness = clamp(cleanliness, 0, 100);
  money = Math.max(0, money);
  document.getElementById("hunger").textContent = `Hunger: ${hunger}`;
  document.getElementById("happiness").textContent = `Happiness: ${happiness}`;
  document.getElementById("energy").textContent = `Energy: ${energy}`;
  document.getElementById("health").textContent = `Health: ${health}`;
  document.getElementById("cleanliness").textContent = `Cleanliness: ${cleanliness}`;
  document.getElementById("money").textContent = `Money: ${money}`;
  

}

/*startBtn.addEventListener("click", function () {
   
    if (petNameInput.value.trim() === "") {
        alert("Please enter a name for your pet!");
        return
    }else if(petTypeSelect.value === "") {
        alert("Please choose a pet type!");
        return;
    }else{
        setupScreen.classList.add("hidden");
    mainScreen.classList.remove("hidden");};  
     updateStats();
  const petType = petTypeSelect.value;

        if (petType === "dog") {
            petImage.src = "assets/pets/dog.jpg";
            petImage.classList.add("dog-style");
        } else if (petType === "cat") {
            petImage.src = "assets/pets/cat.jpg";
            petImage.classList.add("cat-style");
        } else if (petType === "rabbit") {
            petImage.src = "assets/pets/rabbit.jpg";
            petImage.classList.add("rabbit-style");
        }
    
});
*/

// Remove both existing start button listeners and replace with this single one
startBtn.addEventListener("click", function () {
    const petName = petNameInput.value.trim();
    const petType = petTypeSelect.value;

    // Validation
    if (!petName) {
        alert("Please enter a name for your pet!");
        return;
    }
    if (!petType) {
        alert("Please choose a pet type!");
        return;
    }

    // Hide setup screen, show main screen
    setupScreen.classList.add("hidden");
    mainScreen.classList.remove("hidden");

    // Update stats
    updateStats();

    // Set pet image based on type
    if (petType === "dog") {
        petImage.src = "assets/pets/dog.jpg";
        petImage.className = "dog-style"; // replace any previous class
    } else if (petType === "cat") {
        petImage.src = "assets/pets/cat.jpg";
        petImage.className = "cat-style";
    } else if (petType === "rabbit") {
        petImage.src = "assets/pets/rabbit.jpg";
        petImage.className = "rabbit-style";
    }

    console.log(`Starting game with ${petName} the ${petType}!`);
});

setInterval(() => {
  hunger += 1;
  energy -= 1;
  happiness -= 1;
  health -= 1;
  cleanliness -= 0.5;
  updateStats();
}, 4000);

feedBtn.addEventListener("click", () => {
 
  if (money < 5) {
    alert("Not enough money to buy food! Click on the earn button to earn money!");
    return;
  }

  hunger -= 25;
  energy += 5;
  health += 2;
  happiness += 3;
  money -= 5;
  updateStats();



 
});

earnBtn.addEventListener("click", () => {
  const min=1;
  const max=10;
  const operators = ['+', '-',];
  const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b
  };
  while (true){
    let intOne = Math.floor(Math.random() * (max - min + 1)) + min;
    let intTwo = Math.floor(Math.random() * (intOne - min + 1)) + min;
    let randomOperator = operators[Math.floor(Math.random() * operators.length)]; 
   

   let userAnswer = prompt("Solve: " + intOne + " " + randomOperator + " " + intTwo + " = or click \"cancel\" to exit",);
   userAnswer = userAnswer.trim();
    
    let answer = operations[randomOperator](intOne, intTwo);

    if (userAnswer == null){
      break
    }else if (parseFloat(userAnswer) === answer) {
      money += 5;
      updateStats();
      alert("Correct! +5 money");
    } else {
      money -= 5;
   
      updateStats();
      
      alert(`Incorrect! -5 money. The correct answer was ${answer}`);
    }

 
}
});


playBtn.addEventListener("click", () => {

  if (energy < 20) {
    alert("Your pet is too tired to play. Click the Rest button!");
    return;
  }
  if (health <= 40) {
    alert("Your pet is not healthy enough to play. Click the Health Check button!");
    return;
  }
  hunger += 10;
  happiness += 15;
  energy -= 20;
  health -= 15;
  cleanliness -=15;
  updateStats();
  
  if (cleanliness <= 25) {
    alert("Your pet is very dirty. Click on the clean button!");
  } else if (hunger >= 85) {
    alert("Your pet is very hungry. Click the Feed button!");
  }

});

restBtn.addEventListener("click", () => {
  energy += 25;
  health +=2;
  hunger +=10;
  happiness -=5;
  updateStats();
  if (energy >=90) {
    alert("Your pet is fully rested. It's ready to play!");
  }
  if (hunger >= 90) {
    alert("Your pet is very hungry. Click the Feed button!");
  }
});

cleanBtn.addEventListener("click", () => {

  cleanliness += 25;
  money -= 5;
  happiness += 2;
  energy += 1;
  health += 5;
  updateStats();
  if (money <= 5) {
    alert("You don't have enough money to pay the cleaner to clean your pet. Click the Earn button!");
  } else if (cleanliness >= 95) {
    alert("Your pet is very clean. It's ready to play!");
  }
 
});


healthCheckBtn.addEventListener("click", () => {

  if (health === 100){
    alert("Your pet is very healthy!");
  }else if(money<10){
    alert("You don't have enough money to pay the vet. Click the Earn button!");
  }else{
    health += 15;
    money -= 20;
    happiness += 2;
    energy += 5;
    updateStats();
  };
});