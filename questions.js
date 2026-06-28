const STORAGE_KEYS = {
  player: "scienceBattleArena_player_v2",
  wrong: "scienceBattleArena_wrong_v2"
};

const UNITS = [
  { grade: 1, unit: "植物" },
  { grade: 1, unit: "動物" },
  { grade: 1, unit: "身のまわりの物質" },
  { grade: 1, unit: "光" },
  { grade: 1, unit: "音" },
  { grade: 1, unit: "力" },
  { grade: 1, unit: "大地の変化" },
  { grade: 2, unit: "化学変化" },
  { grade: 2, unit: "原子と分子" },
  { grade: 2, unit: "電流" },
  { grade: 2, unit: "磁界" },
  { grade: 2, unit: "動物の体" },
  { grade: 2, unit: "天気" },
  { grade: 3, unit: "運動とエネルギー" },
  { grade: 3, unit: "仕事とエネルギー" },
  { grade: 3, unit: "イオン" },
  { grade: 3, unit: "酸・アルカリ" },
  { grade: 3, unit: "遺伝" },
  { grade: 3, unit: "天体" },
  { grade: 3, unit: "自然と環境" }
];

const ENEMIES = {
  "植物": { normal: ["葉緑体スライム", "気孔バット", "根毛ワーム"], boss: "光合成ガーディアン", title: "光合成の理解者" },
  "動物": { normal: ["分類ビースト", "昆虫ナイト", "えらフィッシュ"], boss: "生命分類キメラ", title: "動物分類マスター" },
  "身のまわりの物質": { normal: ["密度ゴーレム", "溶質スライム", "ろ過クラブ"], boss: "物質判定タイタン", title: "物質の見極め人" },
  "光": { normal: ["反射ミラー", "屈折レイ", "焦点ゴースト"], boss: "レンズの支配者", title: "光の探究者" },
  "音": { normal: ["振動バット", "波形スライム", "こだまウルフ"], boss: "音波ドラゴン", title: "音の観測者" },
  "力": { normal: ["重力ウルフ", "圧力ゴーレム", "摩擦クラブ"], boss: "力の番人", title: "力学の入門者" },
  "大地の変化": { normal: ["地層クラブ", "P波ランナー", "マグマビースト"], boss: "大地変動ドラゴン", title: "大地の観察者" },
  "化学変化": { normal: ["酸化スライム", "還元ナイト", "分解ゴースト"], boss: "酸化還元ドラゴン", title: "化学変化の使い手" },
  "原子と分子": { normal: ["原子スライム", "分子ビースト", "化学式ナイト"], boss: "粒子世界の門番", title: "原子分子マスター" },
  "電流": { normal: ["オームナイト", "電圧ゴーレム", "抵抗スライム"], boss: "回路の支配者", title: "オームの理解者" },
  "磁界": { normal: ["磁力バット", "コイルワーム", "誘導ゴースト"], boss: "電磁界タイタン", title: "磁界の観測者" },
  "動物の体": { normal: ["消化ビースト", "血液スライム", "神経ランナー"], boss: "生命維持キメラ", title: "からだの理解者" },
  "天気": { normal: ["気圧ゴーレム", "前線ワイバーン", "露点スライム"], boss: "低気圧ドラゴン", title: "天気図の読解者" },
  "運動とエネルギー": { normal: ["慣性ウルフ", "速さランナー", "斜面ゴーレム"], boss: "運動エネルギーの番人", title: "運動の分析者" },
  "仕事とエネルギー": { normal: ["仕事率ナイト", "滑車クラブ", "ジュールスライム"], boss: "エネルギー保存タイタン", title: "仕事とエネルギーの達人" },
  "イオン": { normal: ["電離ゴーレム", "陽イオンナイト", "陰イオンバット"], boss: "電解質タイタン", title: "イオンの理解者" },
  "酸・アルカリ": { normal: ["リトマススライム", "BTBゴースト", "中和ナイト"], boss: "酸アルカリの裁定者", title: "中和の使い手" },
  "遺伝": { normal: ["メンデルビーンズ", "遺伝子ワーム", "染色体ナイト"], boss: "遺伝子の門番", title: "遺伝の探究者" },
  "天体": { normal: ["月食ファントム", "公転ランナー", "黒点スライム"], boss: "銀河の支配者", title: "宇宙の観測者" },
  "自然と環境": { normal: ["食物連鎖ワーム", "分解者スライム", "外来種ビースト"], boss: "生態系ガーディアン", title: "環境の守り手" }
};

const REVIEW_ENEMY = {
  normal: ["苦手モンスター"],
  boss: "復習アリーナの番人",
  title: "苦手克服ファイター"
};

const RANKS = [
  { min: 0, name: "D 理科見習い" },
  { min: 100, name: "C 観察者" },
  { min: 300, name: "B 実験助手" },
  { min: 700, name: "A 理科ファイター" },
  { min: 1500, name: "S 理科マスター" },
  { min: 3000, name: "SS アリーナ王者" }
];

let questions = [];
let player = null;
let wrongMap = {};
let currentGradeFilter = "all";
let battle = null;
let lastBattleUnit = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : clone(fallback);
  } catch (error) {
    console.warn(`${key} の読み込みに失敗しました。初期値を使います。`, error);
    return clone(fallback);
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function unitKey(grade, unit) {
  return `${grade}::${unit}`;
}

function loadAll() {
  questions = Array.isArray(window.DEFAULT_QUESTIONS) ? clone(window.DEFAULT_QUESTIONS) : [];
  player = loadJson(STORAGE_KEYS.player, {
    exp: 0,
    totalCorrect: 0,
    totalWrong: 0,
    maxCombo: 0,
    titles: [],
    clearedBosses: [],
    unitStats: {},
    battles: 0
  });
  wrongMap = loadJson(STORAGE_KEYS.wrong, {});
}

function persistPlayer() { saveJson(STORAGE_KEYS.player, player); }
function persistWrong() { saveJson(STORAGE_KEYS.wrong, wrongMap); }

function getRankName(exp = player.exp) {
  return RANKS.reduce((current, rank) => exp >= rank.min ? rank : current, RANKS[0]).name;
}

function difficultyLabel(value) {
  return { basic: "基礎", standard: "標準", challenge: "挑戦" }[value] || "基礎";
}

function showScreen(screenId) {
  $$(".screen").forEach(screen => screen.classList.remove("active"));
  const target = $(`#${screenId}`);
  if (target) target.classList.add("active");

  $$(".nav-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.screen === screenId));

  if (screenId === "home") renderHome();
  if (screenId === "units") renderUnits();
  if (screenId === "review") renderReview();
}

function renderHome() {
  $("#homeRank").textContent = getRankName();
  $("#homeExp").textContent = `EXP ${player.exp}`;
  $("#statCorrect").textContent = player.totalCorrect;
  $("#statWrong").textContent = player.totalWrong;
  $("#statCombo").textContent = player.maxCombo;
  $("#statReview").textContent = Object.keys(wrongMap).length;
}

function renderUnits() {
  const grid = $("#unitGrid");
  grid.innerHTML = "";
  const units = UNITS.filter(item => currentGradeFilter === "all" || String(item.grade) === currentGradeFilter);

  units.forEach(item => {
    const unitQuestions = getUnitQuestions(item.grade, item.unit);
    const stats = player.unitStats[unitKey(item.grade, item.unit)] || { correct: 0, wrong: 0, clears: 0 };
    const total = stats.correct + stats.wrong;
    const rate = total ? Math.round(stats.correct / total * 100) : 0;
    const weakCount = Object.values(wrongMap).filter(w => {
      const q = questions.find(question => question.id === w.questionId);
      return q && q.unit === item.unit && q.grade === item.grade;
    }).length;
    const cleared = player.clearedBosses.includes(unitKey(item.grade, item.unit));

    const card = document.createElement("article");
    card.className = "unit-card";
    card.innerHTML = `
      ${cleared ? `<span class="clear-badge">BOSS CLEAR</span>` : ""}
      <span class="eyebrow">中${item.grade} STAGE</span>
      <h3>${item.unit}</h3>
      <p class="muted">出現敵：${ENEMIES[item.unit]?.normal?.[0] || "理科モンスター"}</p>
      <div class="unit-meta">
        <span>問題<strong>${unitQuestions.length}問</strong></span>
        <span>正答率<strong>${rate}%</strong></span>
        <span>クリア<strong>${stats.clears || 0}回</strong></span>
        <span>苦手<strong>${weakCount}問</strong></span>
      </div>
      <button class="primary start-unit" data-grade="${item.grade}" data-unit="${item.unit}">${cleared ? "再挑戦" : "挑戦する"}</button>
    `;
    grid.appendChild(card);
  });

  $$(".start-unit").forEach(btn => {
    btn.addEventListener("click", () => startBattle(Number(btn.dataset.grade), btn.dataset.unit, "unit"));
  });
}

function getUnitQuestions(grade, unit) {
  return questions.filter(q => q.grade === grade && q.unit === unit && q.type === "choice");
}

function getQuestionById(id) {
  return questions.find(q => q.id === id);
}

function getWrongQuestions() {
  return Object.values(wrongMap)
    .map(w => getQuestionById(w.questionId))
    .filter(Boolean);
}

function startBattle(grade, unit, mode = "unit") {
  let pool = getUnitQuestions(grade, unit);
  let enemySet = ENEMIES[unit] || { normal: ["理科モンスター"], boss: "理科ボス", title: `${unit}クリア` };

  if (mode === "review") {
    pool = getWrongQuestions();
    enemySet = REVIEW_ENEMY;
  }

  if (pool.length === 0) {
    alert(mode === "review" ? "復習する問題はまだありません。" : "このステージの問題がありません。先生に確認してください。");
    return;
  }

  lastBattleUnit = { grade, unit, mode };
  battle = {
    grade,
    unit,
    mode,
    pool: shuffle(pool),
    index: 0,
    turn: 0,
    maxTurns: mode === "review" ? Math.min(12, Math.max(5, pool.length)) : null,
    playerHp: 100,
    playerMaxHp: 100,
    enemyHp: mode === "review" ? 180 : 70,
    enemyMaxHp: mode === "review" ? 180 : 70,
    enemyName: mode === "review" ? enemySet.boss : enemySet.normal[0],
    enemyNumber: 0,
    enemySet,
    isBoss: mode === "review",
    defeated: 0,
    combo: 0,
    maxCombo: 0,
    correct: 0,
    wrong: 0,
    earnedExp: 0,
    currentQuestion: null,
    answered: false,
    newTitles: []
  };

  showScreen("battle");
  nextTurn();
}

function nextTurn() {
  if (!battle) return;

  if (battle.playerHp <= 0) {
    finishBattle(false);
    return;
  }

  if (battle.enemyHp <= 0) {
    handleEnemyDefeated();
    if (!battle) return;
  }

  if (battle.mode === "review" && battle.turn >= battle.maxTurns) {
    finishBattle(battle.correct > battle.wrong);
    return;
  }

  battle.answered = false;
  if (battle.index >= battle.pool.length) {
    battle.pool = shuffle(battle.pool);
    battle.index = 0;
  }
  battle.currentQuestion = battle.pool[battle.index++];
  battle.turn += 1;
  renderBattle();
}

function handleEnemyDefeated() {
  if (battle.isBoss) {
    finishBattle(true);
    return;
  }

  battle.defeated += 1;
  if (battle.defeated >= 3 && battle.mode === "unit") {
    battle.isBoss = true;
    battle.enemyName = battle.enemySet.boss;
    battle.enemyHp = 160;
    battle.enemyMaxHp = 160;
  } else {
    battle.enemyNumber = (battle.enemyNumber + 1) % battle.enemySet.normal.length;
    battle.enemyName = battle.enemySet.normal[battle.enemyNumber];
    battle.enemyHp = 70 + battle.defeated * 12;
    battle.enemyMaxHp = battle.enemyHp;
  }
}

function renderBattle() {
  const q = battle.currentQuestion;
  $("#battleStage").textContent = battle.mode === "review" ? "苦手問題 再戦アリーナ" : `${battle.unit}ステージ`;
  $("#comboText").textContent = `${battle.combo} COMBO`;
  $("#comboBonus").textContent = getComboMessage();
  $("#battleProgress").textContent = battle.mode === "review" ? `${battle.turn}/${battle.maxTurns}問` : (battle.isBoss ? "BOSS BATTLE" : `通常戦 ${battle.defeated + 1}/3`);
  $("#enemyType").textContent = battle.isBoss ? "BOSS" : "ENEMY";
  $("#enemyName").textContent = battle.enemyName;
  $("#enemyInitial").textContent = battle.isBoss ? "BOSS" : "敵";

  updateHpBars();

  $("#questionUnit").textContent = `中${q.grade}・${q.unit}`;
  $("#questionDifficulty").textContent = difficultyLabel(q.difficulty);
  $("#questionText").textContent = q.question;
  $("#feedback").className = "feedback hidden";
  $("#feedback").textContent = "";
  $("#nextQuestion").classList.add("hidden");

  const choices = $("#choices");
  choices.innerHTML = "";
  shuffle(q.choices).forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.type = "button";
    btn.textContent = `${String.fromCharCode(65 + index)}. ${choice}`;
    btn.dataset.choice = choice;
    btn.addEventListener("click", () => answerQuestion(choice));
    choices.appendChild(btn);
  });
}

function getComboMessage() {
  if (!battle) return "連続正解で攻撃力アップ";
  if (battle.combo >= 10) return "必殺級コンボ：大ダメージ";
  if (battle.combo >= 5) return "5コンボ突破：攻撃力大幅アップ";
  if (battle.combo >= 3) return "3コンボ突破：攻撃力アップ";
  return "連続正解で攻撃力アップ";
}

function updateHpBars() {
  const playerRate = Math.max(0, battle.playerHp / battle.playerMaxHp * 100);
  const enemyRate = Math.max(0, battle.enemyHp / battle.enemyMaxHp * 100);
  $("#playerHpBar").style.width = `${playerRate}%`;
  $("#enemyHpBar").style.width = `${enemyRate}%`;
  $("#playerHpText").textContent = `HP ${Math.max(0, battle.playerHp)} / ${battle.playerMaxHp}`;
  $("#enemyHpText").textContent = `HP ${Math.max(0, battle.enemyHp)} / ${battle.enemyMaxHp}`;
}

function answerQuestion(choice) {
  if (!battle || battle.answered) return;
  battle.answered = true;

  const q = battle.currentQuestion;
  const correct = choice === q.answer;
  const feedback = $("#feedback");
  const buttons = $$(".choice-btn");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.choice === q.answer) btn.classList.add("correct");
    if (btn.dataset.choice === choice && !correct) btn.classList.add("wrong");
  });

  if (correct) {
    const damage = calculateDamage();
    battle.enemyHp = Math.max(0, battle.enemyHp - damage);
    battle.combo += 1;
    battle.maxCombo = Math.max(battle.maxCombo, battle.combo);
    battle.correct += 1;
    battle.earnedExp += expFor(q);
    player.totalCorrect += 1;
    addUnitStat(q, "correct");

    if (wrongMap[q.id]) {
      delete wrongMap[q.id];
      persistWrong();
    }

    feedback.className = "feedback good";
    feedback.innerHTML = `<strong>正解。</strong> ${battle.enemyName}に${damage}ダメージ。<br>${q.explanation}`;
    animateHit(".enemy-avatar");
  } else {
    const damage = battle.isBoss ? 20 : 15;
    battle.playerHp = Math.max(0, battle.playerHp - damage);
    battle.combo = 0;
    battle.wrong += 1;
    player.totalWrong += 1;
    addUnitStat(q, "wrong");
    recordWrong(q.id);

    feedback.className = "feedback bad";
    feedback.innerHTML = `<strong>不正解。</strong> 正解は「${q.answer}」。${battle.enemyName}から${damage}ダメージ。<br>${q.explanation}`;
    animateHit(".player-avatar");
  }

  player.maxCombo = Math.max(player.maxCombo, battle.maxCombo);
  checkComboTitles();
  updateHpBars();
  persistPlayer();

  $("#comboText").textContent = `${battle.combo} COMBO`;
  $("#comboBonus").textContent = getComboMessage();
  $("#nextQuestion").classList.remove("hidden");
}

function calculateDamage() {
  const base = battle.isBoss ? 28 : 32;
  const comboBonus = Math.min(battle.combo * 5, 35);
  const burst = battle.combo > 0 && (battle.combo + 1) % 5 === 0 ? 22 : 0;
  return base + comboBonus + burst;
}

function expFor(q) {
  return { basic: 10, standard: 15, challenge: 25 }[q.difficulty] || 10;
}

function addUnitStat(q, type) {
  const key = unitKey(q.grade, q.unit);
  if (!player.unitStats[key]) player.unitStats[key] = { correct: 0, wrong: 0, clears: 0 };
  player.unitStats[key][type] += 1;
}

function recordWrong(questionId) {
  const current = wrongMap[questionId] || { questionId, wrongCount: 0, lastWrongAt: "" };
  current.wrongCount += 1;
  current.lastWrongAt = new Date().toISOString().slice(0, 10);
  wrongMap[questionId] = current;
  persistWrong();
}

function animateHit(selector) {
  const target = $(selector);
  if (!target) return;
  target.classList.remove("shake", "flash");
  void target.offsetWidth;
  target.classList.add("shake", "flash");
}

function checkComboTitles() {
  if (battle.maxCombo >= 5) addTitle("連撃ファイター");
  if (battle.maxCombo >= 10) addTitle("10コンボマスター");
}

function addTitle(title) {
  if (!player.titles.includes(title)) {
    player.titles.push(title);
    if (battle && !battle.newTitles.includes(title)) battle.newTitles.push(title);
  }
}

function finishBattle(victory) {
  if (!battle) return;
  const oldRank = getRankName();
  player.exp += battle.earnedExp + (victory ? (battle.isBoss ? 80 : 30) : 0);
  player.battles += 1;
  player.maxCombo = Math.max(player.maxCombo, battle.maxCombo);

  let message = "";
  if (victory) {
    message = battle.mode === "review" ? "苦手問題アリーナを突破しました。" : `${battle.unit}ステージをクリアしました。`;
    if (battle.mode === "unit" && battle.isBoss) {
      const clearKey = unitKey(battle.grade, battle.unit);
      if (!player.clearedBosses.includes(clearKey)) player.clearedBosses.push(clearKey);
      if (!player.unitStats[clearKey]) player.unitStats[clearKey] = { correct: 0, wrong: 0, clears: 0 };
      player.unitStats[clearKey].clears += 1;
      addTitle(battle.enemySet.title);
    }
    if (player.totalCorrect >= 50) addTitle("50問突破ファイター");
    if (player.totalCorrect >= 100) addTitle("100問突破マスター");
  } else {
    message = "敗北しました。復習リストを確認して、もう一度挑戦できます。";
  }

  const newRank = getRankName();
  if (newRank !== oldRank) addTitle(`${newRank}到達`);

  persistPlayer();
  renderResult(victory, message);
  battle = null;
  showScreen("result");
}

function renderResult(victory, message) {
  $("#resultTitle").textContent = victory ? "勝利" : "敗北";
  $("#resultMessage").textContent = message;
  $("#resultCorrect").textContent = battle.correct;
  $("#resultWrong").textContent = battle.wrong;
  $("#resultCombo").textContent = battle.maxCombo;
  $("#resultExp").textContent = battle.earnedExp + (victory ? (battle.isBoss ? 80 : 30) : 0);

  const titleBox = $("#titleEarned");
  if (battle.newTitles.length > 0) {
    titleBox.classList.remove("hidden");
    titleBox.textContent = `新称号：${battle.newTitles.join("、")}`;
  } else {
    titleBox.classList.add("hidden");
    titleBox.textContent = "";
  }
}

function renderReview() {
  const list = $("#reviewList");
  const wrongs = Object.values(wrongMap)
    .map(w => ({ record: w, question: getQuestionById(w.questionId) }))
    .filter(item => item.question)
    .sort((a, b) => b.record.wrongCount - a.record.wrongCount);

  list.innerHTML = "";
  if (wrongs.length === 0) {
    list.innerHTML = `<div class="empty-state">苦手問題はまだありません。ステージに挑戦すると、不正解だった問題がここに残ります。</div>`;
    return;
  }

  wrongs.forEach(({ record, question }) => {
    const card = document.createElement("article");
    card.className = "review-card";
    card.innerHTML = `
      <p class="eyebrow">中${question.grade}・${question.unit} / ${difficultyLabel(question.difficulty)}</p>
      <h3>${question.question}</h3>
      <p><strong>正解：</strong>${question.answer}</p>
      <p>${question.explanation}</p>
      <p class="muted">間違えた回数：${record.wrongCount}回 / 最終記録：${record.lastWrongAt}</p>
      <div class="review-actions">
        <button class="secondary review-one" data-grade="${question.grade}" data-unit="${question.unit}">この単元に挑戦</button>
        <button class="danger remove-review" data-id="${question.id}">復習リストから外す</button>
      </div>
    `;
    list.appendChild(card);
  });

  $$(".review-one").forEach(btn => {
    btn.addEventListener("click", () => startBattle(Number(btn.dataset.grade), btn.dataset.unit, "unit"));
  });
  $$(".remove-review").forEach(btn => {
    btn.addEventListener("click", () => {
      delete wrongMap[btn.dataset.id];
      persistWrong();
      renderReview();
      renderHome();
    });
  });
}

function startReviewBattle() {
  const pool = getWrongQuestions();
  if (pool.length === 0) {
    alert("復習する問題はまだありません。");
    return;
  }
  const first = pool[0];
  startBattle(first.grade, first.unit, "review");
}

function bindEvents() {
  $$("[data-screen]").forEach(element => {
    element.addEventListener("click", () => showScreen(element.dataset.screen));
  });

  $("#startFromHome").addEventListener("click", () => showScreen("units"));
  $("#nextQuestion").addEventListener("click", nextTurn);
  $("#retryBattle").addEventListener("click", () => {
    if (lastBattleUnit) startBattle(lastBattleUnit.grade, lastBattleUnit.unit, lastBattleUnit.mode);
  });

  $$("[data-grade-filter]").forEach(button => {
    button.addEventListener("click", () => {
      currentGradeFilter = button.dataset.gradeFilter;
      $$("[data-grade-filter]").forEach(btn => btn.classList.toggle("active", btn === button));
      renderUnits();
    });
  });

  $("#startReviewBattle").addEventListener("click", startReviewBattle);
}

function init() {
  loadAll();
  bindEvents();
  renderHome();
}

document.addEventListener("DOMContentLoaded", init);
