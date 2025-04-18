let startTime = null;
let currentActivity = '';
const activityData = {};

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const activitySelect = document.getElementById('activity');
const summaryList = document.getElementById('summaryList');

startBtn.addEventListener('click', () => {
    currentActivity = activitySelect.value;
    startTime = Date.now();
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
    if (!startTime) return;

    const endTime = Date.now();
    const secondsSpent = Math.floor((endTime - startTime) / 1000);

    if (!activityData[currentActivity]) {
        activityData[currentActivity] = 0;
    }

    activityData[currentActivity] += secondsSpent;
    updateSummary();

    // Reset
    startTime = null;
    currentActivity = '';
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

function updateSummary() {
    summaryList.innerHTML = '';

    for (let activity in activityData) {
        const li = document.createElement('li');
        li.textContent = `${activity}: ${formatTime(activityData[activity])}`;
        summaryList.appendChild(li);
    }
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
}
