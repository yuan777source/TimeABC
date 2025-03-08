// 获取DOM元素
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const timerDisplay = document.querySelector('.timer-display');

// 计时器变量
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

// 格式化时间函数
function formatTime(time) {
    // 计算分钟、秒、毫秒
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    
    // 在个位数前补0
    return {
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
        milliseconds: milliseconds.toString().padStart(2, '0')
    };
}

// 更新计时器显示
function updateTimerDisplay() {
    const currentTime = Date.now();
    const totalElapsedTime = elapsedTime + (currentTime - startTime);
    const formattedTime = formatTime(totalElapsedTime);
    
    minutesElement.textContent = formattedTime.minutes;
    secondsElement.textContent = formattedTime.seconds;
    millisecondsElement.textContent = formattedTime.milliseconds;
}

// 开始计时器
function startTimer() {
    if (!isRunning) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimerDisplay, 10); // 每10毫秒更新一次
        isRunning = true;
        
        // 更新UI状态
        startButton.disabled = true;
        pauseButton.disabled = false;
        resetButton.disabled = false;
        timerDisplay.classList.add('timer-running');
    }
}

// 暂停计时器
function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        isRunning = false;
        
        // 更新UI状态
        startButton.disabled = false;
        pauseButton.disabled = true;
        timerDisplay.classList.remove('timer-running');
    }
}

// 重置计时器
function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    
    // 重置显示
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    millisecondsElement.textContent = '00';
    
    // 更新UI状态
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    timerDisplay.classList.remove('timer-running');
}

// 添加事件监听器
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// 添加键盘快捷键
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        // 空格键：开始/暂停
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    } else if (event.code === 'KeyR') {
        // R键：重置
        resetTimer();
    }
});

// 页面加载完成后，设置初始状态
window.addEventListener('load', () => {
    resetTimer();
    
    // 添加简单的启动动画
    setTimeout(() => {
        document.querySelector('.container').style.opacity = '1';
    }, 100);
}); 