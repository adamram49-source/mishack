const startBtn = document.getElementById('start-btn');
const completeBtn = document.getElementById('complete-task');
const resetBtn = document.getElementById('reset-btn');
const profileSetup = document.getElementById('profile-setup');
const gameDiv = document.getElementById('game');
const welcome = document.getElementById('welcome');
const task = document.getElementById('task');
const pointsDisplay = document.getElementById('points');
const achievementDisplay = document.getElementById('achievement');

let user = {
    name: "",
    color: "red",
    type: "fast",
    points: 0,
    achievements: []
};

const tasks = [
    "לחץ על הכפתור 5 פעמים מהר!",
    "מצא את הצבע הנכון במסך הבא!",
    "ענה על שאלה קטנה: 2 + 3 = ?"
];

// Load profile if exists
if(localStorage.getItem('user')){
    user = JSON.parse(localStorage.getItem('user'));
    startGame();
}

startBtn.addEventListener('click', () => {
    user.name = document.getElementById('username').value || "שחקן";
    user.color = document.getElementById('color').value;
    user.type = document.getElementById('type').value;
    user.points = 0;
    user.achievements = [];
    localStorage.setItem('user', JSON.stringify(user));
    startGame();
});

completeBtn.addEventListener('click', () => {
    user.points += 10;
    pointsDisplay.textContent = user.points;
    checkAchievement();
    localStorage.setItem('user', JSON.stringify(user));
    nextTask();
});

resetBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
    location.reload();
});

function startGame(){
    profileSetup.style.display = 'none';
    gameDiv.style.display = 'block';
    document.body.style.backgroundColor = user.color;
    welcome.textContent = `שלום ${user.name}! אתה ${user.type}`;
    pointsDisplay.textContent = user.points;
    nextTask();
}

function nextTask(){
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    task.textContent = randomTask;
}

function checkAchievement(){
    if(user.points >= 50 && !user.achievements.includes("סיים 5 משימות")){
        user.achievements.push("סיים 5 משימות");
        achievementDisplay.textContent = "הישג חדש: סיים 5 משימות!";
    }
}
