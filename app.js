// 日语50音图平假名与罗马音映射
const seionMap = {
    'あ': 'a',   'い': 'i',   'う': 'u',   'え': 'e',   'お': 'o',
    'か': 'ka',  'き': 'ki',  'く': 'ku',  'け': 'ke',  'こ': 'ko',
    'さ': 'sa',  'し': 'shi', 'す': 'su',  'せ': 'se',  'そ': 'so',
    'た': 'ta',  'ち': 'chi', 'つ': 'tsu', 'て': 'te',  'と': 'to',
    'な': 'na',  'に': 'ni',  'ぬ': 'nu',  'ね': 'ne',  'の': 'no',
    'は': 'ha',  'ひ': 'hi',  'ふ': 'fu',  'へ': 'he',  'ほ': 'ho',
    'ま': 'ma',  'み': 'mi',  'む': 'mu',  'め': 'me',  'も': 'mo',
    'や': 'ya',  'ゆ': 'yu',  'よ': 'yo',
    'ら': 'ra',  'り': 'ri',  'る': 'ru',  'れ': 're',  'ろ': 'ro',
    'わ': 'wa',  'を': 'o',   'ん': 'n',
};

const dakuonMap = {
    'が': 'ga',  'ぎ': 'gi',  'ぐ': 'gu',  'げ': 'ge',  'ご': 'go',
    'ざ': 'za',  'じ': 'ji',  'ず': 'zu',  'ぜ': 'ze',  'ぞ': 'zo',
    'だ': 'da',  'ぢ': 'ji',  'づ': 'zu',  'で': 'de',  'ど': 'do',
    'ば': 'ba',  'び': 'bi',  'ぶ': 'bu',  'べ': 'be',  'ぼ': 'bo',
};

const handakuonMap = {
    'ぱ': 'pa',  'ぴ': 'pi',  'ぷ': 'pu',  'ぺ': 'pe',  'ぽ': 'po',
};

const youonMap = {
    'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
    'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
    'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
    'じゃ': 'ja',  'じゅ': 'ju',  'じょ': 'jo',
    'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
    'ぢゃ': 'ja',  'ぢゅ': 'ju',  'ぢょ': 'jo',
    'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
    'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
    'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
    'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
    'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
    'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
};

const practiceRanges = {
    'seion': seionMap,
    'dakuon': dakuonMap,
    'handakuon': handakuonMap,
    'youon': youonMap,
    'all': { ...seionMap, ...dakuonMap, ...handakuonMap, ...youonMap }
};

// 自定义选择的数据结构 - 按行分组
const customSectionsData = [
    {
        title: '清音',
        groups: [
            { name: 'あ行', chars: ['あ', 'い', 'う', 'え', 'お'] },
            { name: 'か行', chars: ['か', 'き', 'く', 'け', 'こ'] },
            { name: 'さ行', chars: ['さ', 'し', 'す', 'せ', 'そ'] },
            { name: 'た行', chars: ['た', 'ち', 'つ', 'て', 'と'] },
            { name: 'な行', chars: ['な', 'に', 'ぬ', 'ね', 'の'] },
            { name: 'は行', chars: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
            { name: 'ま行', chars: ['ま', 'み', 'む', 'め', 'も'] },
            { name: 'や行', chars: ['や', 'ゆ', 'よ'] },
            { name: 'ら行', chars: ['ら', 'り', 'る', 'れ', 'ろ'] },
            { name: 'わ行', chars: ['わ', 'を', 'ん'] },
        ]
    },
    {
        title: '浊音',
        groups: [
            { name: 'が行', chars: ['が', 'ぎ', 'ぐ', 'げ', 'ご'] },
            { name: 'ざ行', chars: ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'] },
            { name: 'だ行', chars: ['だ', 'ぢ', 'づ', 'で', 'ど'] },
            { name: 'ば行', chars: ['ば', 'び', 'ぶ', 'べ', 'ぼ'] },
        ]
    },
    {
        title: '半浊音',
        groups: [
            { name: 'ぱ行', chars: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'] },
        ]
    },
    {
        title: '拗音',
        groups: [
            { name: 'か行拗音', chars: ['きゃ', 'きゅ', 'きょ'] },
            { name: 'が行拗音', chars: ['ぎゃ', 'ぎゅ', 'ぎょ'] },
            { name: 'さ行拗音', chars: ['しゃ', 'しゅ', 'しょ'] },
            { name: 'ざ行拗音', chars: ['じゃ', 'じゅ', 'じょ'] },
            { name: 'た行拗音', chars: ['ちゃ', 'ちゅ', 'ちょ'] },
            { name: 'だ行拗音', chars: ['ぢゃ', 'ぢゅ', 'ぢょ'] },
            { name: 'な行拗音', chars: ['にゃ', 'にゅ', 'にょ'] },
            { name: 'は行拗音', chars: ['ひゃ', 'ひゅ', 'ひょ'] },
            { name: 'ば行拗音', chars: ['びゃ', 'びゅ', 'びょ'] },
            { name: 'ぱ行拗音', chars: ['ぴゃ', 'ぴゅ', 'ぴょ'] },
            { name: 'ま行拗音', chars: ['みゃ', 'みゅ', 'みょ'] },
            { name: 'ら行拗音', chars: ['りゃ', 'りゅ', 'りょ'] },
        ]
    }
];

// DOM元素
const menu = document.getElementById('menu');
const practiceArea = document.getElementById('practiceArea');
const question = document.getElementById('question');
const answerInput = document.getElementById('answerInput');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const statsBtn = document.getElementById('statsBtn');
const resetBtn = document.getElementById('resetBtn');
const statsPanel = document.getElementById('statsPanel');
const statsGrid = document.getElementById('statsGrid');
const rangeSelect = document.getElementById('rangeSelect');
const backBtn = document.getElementById('backBtn');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const customSelector = document.getElementById('customSelector');
const customSectionsContainer = document.getElementById('customSections');
const selectedCount = document.getElementById('selectedCount');
const selectAllBtn = document.getElementById('selectAllBtn');
const selectNoneBtn = document.getElementById('selectNoneBtn');
const startCustomBtn = document.getElementById('startCustomBtn');

// 游戏状态
let currentRange = 'seion';
let currentMap = seionMap;
let currentQuestion = null;
let remainingChars = [];
let stats = loadStats();
let isAnswering = true;
let selectedCustomChars = new Set();

// 加载统计记录
function loadStats() {
    const saved = localStorage.getItem('hiraganaStats');
    return saved ? JSON.parse(saved) : {};
}

// 保存统计记录
function saveStats() {
    localStorage.setItem('hiraganaStats', JSON.stringify(stats));
}

// 初始化假名列表
function initCharList() {
    if (currentRange === 'custom') {
        currentMap = {};
        selectedCustomChars.forEach(char => {
            currentMap[char] = practiceRanges.all[char];
        });
        remainingChars = Array.from(selectedCustomChars);
    } else {
        currentMap = practiceRanges[currentRange];
        remainingChars = Object.keys(currentMap);
    }
    shuffleArray(remainingChars);
    updateProgress();
}

// 洗牌算法
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 更新进度
function updateProgress() {
    const total = Object.keys(currentMap).length;
    const remaining = remainingChars.length;
    const completed = total - remaining;
    const percent = (completed / total) * 100;
    progressFill.style.width = `${percent}%`;
    progressText.textContent = `进度: ${completed}/${total}`;
}

// 显示下一个问题
function nextQuestion() {
    if (remainingChars.length === 0) {
        initCharList();
    }
    currentQuestion = remainingChars.pop();
    question.textContent = currentQuestion;
    question.style.animation = 'none';
    question.offsetHeight; // 触发重绘
    question.style.animation = 'pulse 2s ease-in-out infinite';
    answerInput.value = '';
    answerInput.className = 'answer-input';
    feedback.textContent = '';
    feedback.className = 'feedback';
    answerInput.focus();
    isAnswering = true;
    updateProgress();
}

// 检查答案
function checkAnswer(userInput) {
    if (!isAnswering) return;
    
    const correctAnswer = currentMap[currentQuestion];
    const isCorrect = userInput.toLowerCase() === correctAnswer;
    
    // 初始化统计
    if (!stats[currentQuestion]) {
        stats[currentQuestion] = { total: 0, correct: 0 };
    }
    
    stats[currentQuestion].total++;
    
    if (isCorrect) {
        stats[currentQuestion].correct++;
        answerInput.classList.add('correct');
        feedback.innerHTML = '✓ 正确！';
        feedback.classList.add('correct');
        createParticles(window.innerWidth / 2, window.innerHeight / 2, '#10b981');
    } else {
        answerInput.classList.add('wrong');
        feedback.innerHTML = `✗ 错误！正确答案：<span class="correct-answer">${correctAnswer}</span>`;
        feedback.classList.add('wrong');
        createParticles(window.innerWidth / 2, window.innerHeight / 2, '#ef4444');
    }
    
    // 计算正确率
    stats[currentQuestion].rate = Math.round((stats[currentQuestion].correct / stats[currentQuestion].total) * 100);
    saveStats();
    updateStatsDisplay();
    
    isAnswering = false;

    // 正确后100ms自动下一个，错误后1500ms
    const delay = isCorrect ? 100 : 1500;
    setTimeout(() => {
        nextQuestion();
    }, delay);
}

// 键盘打击效果
function showKeyFeedback(e) {
    const key = e.key.toUpperCase();
    const feedback = document.createElement('div');
    feedback.className = 'key-feedback';
    feedback.textContent = key;
    feedback.style.left = `${e.clientX}px`;
    feedback.style.top = `${e.clientY - 50}px`;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 500);
}

// 粒子爆炸效果
function createParticles(x, y, color) {
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${Math.random() * 10 + 5}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = Math.random() * 100 + 50;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        
        particle.style.transform = `translate(${dx}px, ${dy}px)`;
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 600);
    }
}

// 显示统计面板
function showStats() {
    statsPanel.style.display = statsPanel.style.display === 'none' ? 'block' : 'none';
    updateStatsDisplay();
}

// 更新统计显示
function updateStatsDisplay() {
    const map = currentMap;
    const chars = Object.keys(map).sort((a, b) => {
        const rateA = stats[a]?.rate || 0;
        const rateB = stats[b]?.rate || 0;
        return rateB - rateA;
    });
    
    statsGrid.innerHTML = chars.map(char => {
        const stat = stats[char];
        const total = stat?.total || 0;
        const correct = stat?.correct || 0;
        const rate = stat?.rate || 0;
        
        let rateClass = 'low';
        if (rate >= 90) rateClass = 'high';
        else if (rate >= 70) rateClass = 'medium';
        
        return `
            <div class="stat-item" title="${char}: ${correct}/${total} = ${rate}%">
                <div class="stat-char">${char}</div>
                <div class="stat-rate ${rateClass}">${total > 0 ? rate : '-'}%</div>
            </div>
        `;
    }).join('');
}

// 重置当前范围的统计
function resetCurrentStats() {
    if (confirm('确定要重置当前范围的统计数据吗？')) {
        Object.keys(currentMap).forEach(char => {
            if (stats[char]) {
                delete stats[char];
            }
        });
        saveStats();
        updateStatsDisplay();
        initCharList();
        nextQuestion();
    }
}

// 切换练习范围
function switchRange(range) {
    currentRange = range;
    rangeSelect.value = range;
    initCharList();
    nextQuestion();
}

// 开始自定义练习
function startCustomPractice() {
    if (selectedCustomChars.size === 0) {
        alert('请至少选择一个假名！');
        return;
    }
    customSelector.classList.remove('active');
    practiceArea.classList.add('active');
    switchRange('custom');
}

// 显示练习区域
function showPractice(range) {
    if (range === 'custom') {
        menu.classList.add('hidden');
        customSelector.classList.add('active');
        renderCustomSelector();
    } else {
        menu.classList.add('hidden');
        practiceArea.classList.add('active');
        switchRange(range);
    }
}

// 渲染自定义选择器
function renderCustomSelector() {
    const allMap = { ...seionMap, ...dakuonMap, ...handakuonMap, ...youonMap };

    customSectionsContainer.innerHTML = customSectionsData.map(section => {
        return `
            <div class="custom-section">
                <div class="custom-section-title">${section.title}</div>
                ${section.groups.map(group => `
                    <div class="group-row">
                        <div class="group-header">
                            <input type="checkbox"
                                   class="group-checkbox"
                                   data-group="${group.name}"
                                   id="group-${group.name}"
                                   ${isAllSelectedInGroup(group.chars) ? 'checked' : ''}>
                            <label for="group-${group.name}" class="group-label">${group.name}</label>
                        </div>
                        <div class="group-chars">
                            ${group.chars.map(char => `
                                <div class="char-checkbox">
                                    <input type="checkbox"
                                           id="custom-${char}"
                                           value="${char}"
                                           class="char-checkbox-input"
                                           data-group="${group.name}"
                                           ${selectedCustomChars.has(char) ? 'checked' : ''}>
                                    <label for="custom-${char}">
                                        ${char}
                                        <span class="romaji">${allMap[char]}</span>
                                    </label>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }).join('');
    updateSelectedCount();
}

// 检查一个组是否全部选中
function isAllSelectedInGroup(chars) {
    return chars.every(char => selectedCustomChars.has(char));
}

// 选中一个组
function selectGroup(chars) {
    chars.forEach(char => selectedCustomChars.add(char));
    updateSelectedCount();
}

// 取消选中一个组
function deselectGroup(chars) {
    chars.forEach(char => selectedCustomChars.delete(char));
    updateSelectedCount();
}

// 更新已选择数量
function updateSelectedCount() {
    const total = Object.keys(practiceRanges.all).length;
    const selected = selectedCustomChars.size;
    selectedCount.textContent = `已选择: ${selected}/${total}`;
}

// 返回菜单
function backToMenu() {
    practiceArea.classList.remove('active');
    customSelector.classList.remove('active');
    menu.classList.remove('hidden');
    statsPanel.style.display = 'none';
}

// 事件监听
document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const range = btn.dataset.range;
        showPractice(range);
    });
});

backBtn.addEventListener('click', backToMenu);

// 自定义选择相关事件
customSectionsContainer.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
        if (e.target.classList.contains('group-checkbox')) {
            // 行复选框被点击
            const groupName = e.target.dataset.group;
            const group = findGroupByName(groupName);
            if (e.target.checked) {
                selectGroup(group.chars);
            } else {
                deselectGroup(group.chars);
            }
            // 更新该组内的单个复选框
            group.chars.forEach(char => {
                const checkbox = document.getElementById(`custom-${char}`);
                if (checkbox) {
                    checkbox.checked = e.target.checked;
                }
            });
        } else if (e.target.classList.contains('char-checkbox-input')) {
            // 单个假名复选框被点击
            const char = e.target.value;
            const groupName = e.target.dataset.group;
            if (e.target.checked) {
                selectedCustomChars.add(char);
            } else {
                selectedCustomChars.delete(char);
            }
            updateSelectedCount();

            // 更新对应的行复选框状态
            const group = findGroupByName(groupName);
            const groupCheckbox = document.getElementById(`group-${groupName}`);
            if (groupCheckbox) {
                groupCheckbox.checked = isAllSelectedInGroup(group.chars);
            }
        }
    }
});

// 根据组名查找组
function findGroupByName(groupName) {
    for (const section of customSectionsData) {
        const group = section.groups.find(g => g.name === groupName);
        if (group) return group;
    }
    return null;
}

selectAllBtn.addEventListener('click', () => {
    document.querySelectorAll('#customSectionsContainer input[type="checkbox"]').forEach(cb => {
        cb.checked = true;
        if (cb.classList.contains('char-checkbox-input')) {
            selectedCustomChars.add(cb.value);
        }
    });
    updateSelectedCount();
});

selectNoneBtn.addEventListener('click', () => {
    document.querySelectorAll('#customSectionsContainer input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    selectedCustomChars.clear();
    updateSelectedCount();
});

startCustomBtn.addEventListener('click', startCustomPractice);

rangeSelect.addEventListener('change', (e) => {
    switchRange(e.target.value);
});

answerInput.addEventListener('input', (e) => {
    const value = e.target.value;
    if (value.includes(' ') || value.includes('\t')) {
        checkAnswer(value.trim());
    }
});

answerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        checkAnswer(answerInput.value.trim());
    }
});

document.addEventListener('keydown', (e) => {
    if (practiceArea.classList.contains('active') && !e.ctrlKey && !e.altKey && !e.metaKey) {
        if (e.key.length === 1) {
            showKeyFeedback(e);
        }
    }
});

nextBtn.addEventListener('click', () => {
    nextQuestion();
});

statsBtn.addEventListener('click', showStats);

resetBtn.addEventListener('click', resetCurrentStats);

// 初始化
answerInput.focus();
