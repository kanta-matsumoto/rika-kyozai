:root {
  --bg0: #090d16;
  --bg1: #111827;
  --panel: rgba(17, 24, 39, 0.88);
  --panel-strong: rgba(10, 15, 28, 0.94);
  --ink: #edf4ff;
  --sub: #9aa8bd;
  --line: rgba(148, 163, 184, 0.25);
  --cyan: #38bdf8;
  --blue: #2563eb;
  --violet: #7c3aed;
  --red: #ef4444;
  --orange: #f59e0b;
  --green: #22c55e;
  --paper: #ffffff;
  --darkText: #172033;
  --radius: 22px;
  --shadow: 0 26px 80px rgba(0, 0, 0, 0.36);
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Hiragino Sans", "Yu Gothic", "Meiryo", system-ui, sans-serif;
  color: var(--ink);
  background:
    radial-gradient(circle at 16% 12%, rgba(56, 189, 248, 0.28), transparent 28rem),
    radial-gradient(circle at 84% 8%, rgba(124, 58, 237, 0.30), transparent 30rem),
    radial-gradient(circle at 50% 92%, rgba(245, 158, 11, 0.18), transparent 34rem),
    linear-gradient(135deg, var(--bg0), var(--bg1));
  overflow-x: hidden;
}

button, input, select, textarea { font: inherit; }
button { cursor: pointer; }

.arena-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: -1;
}

.ring {
  position: absolute;
  border: 1px solid rgba(56, 189, 248, 0.24);
  border-radius: 999px;
  filter: blur(0.2px);
}

.ring-a {
  width: 46rem;
  height: 46rem;
  right: -18rem;
  top: -14rem;
  box-shadow: 0 0 70px rgba(56, 189, 248, 0.15);
}

.ring-b {
  width: 36rem;
  height: 36rem;
  left: -16rem;
  bottom: -13rem;
  border-color: rgba(245, 158, 11, 0.18);
  box-shadow: 0 0 80px rgba(245, 158, 11, 0.10);
}

.grid-floor {
  position: absolute;
  left: -10%;
  right: -10%;
  bottom: -14%;
  height: 42%;
  background:
    linear-gradient(rgba(56, 189, 248, 0.18) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 189, 248, 0.18) 1px, transparent 1px);
  background-size: 46px 46px;
  transform: perspective(520px) rotateX(62deg);
  transform-origin: center bottom;
  opacity: 0.35;
}

.site-header {
  max-width: 1180px;
  margin: 0 auto;
  padding: 28px 20px 18px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 16px;
  font-weight: 900;
  letter-spacing: 0.04em;
  color: #07111f;
  background: linear-gradient(135deg, var(--cyan), #a7f3d0);
  box-shadow: 0 0 28px rgba(56, 189, 248, 0.35);
}

h1, h2, h3, p { margin-top: 0; }
h1 { font-size: clamp(1.35rem, 3vw, 2.3rem); margin-bottom: 0; letter-spacing: 0.03em; }
h2 { font-size: clamp(1.45rem, 3.4vw, 2.6rem); margin-bottom: 14px; line-height: 1.25; }
h3 { font-size: 1.08rem; margin-bottom: 10px; }

.eyebrow {
  color: var(--cyan);
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 6px;
}

.lead { color: var(--sub); line-height: 1.8; }
.muted { color: var(--sub); font-size: 0.9rem; }
.hidden { display: none !important; }

.top-nav {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nav-btn, .chip, .primary, .secondary, .danger {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 800;
  transition: transform 0.16s ease, border-color 0.16s ease, background 0.16s ease, box-shadow 0.16s ease;
}

.nav-btn, .chip, .secondary {
  color: var(--ink);
  background: rgba(15, 23, 42, 0.66);
  backdrop-filter: blur(10px);
}

.nav-btn:hover, .chip:hover, .secondary:hover, .primary:hover, .danger:hover {
  transform: translateY(-1px);
}

.nav-btn.active, .chip.active {
  color: #07111f;
  border-color: transparent;
  background: linear-gradient(135deg, var(--cyan), #a7f3d0);
  box-shadow: 0 0 24px rgba(56, 189, 248, 0.22);
}

.primary {
  color: #07111f;
  border-color: transparent;
  background: linear-gradient(135deg, var(--orange), #fef08a);
  box-shadow: 0 0 24px rgba(245, 158, 11, 0.28);
}

.secondary {
  color: var(--ink);
}

.danger {
  color: var(--ink);
  background: rgba(239, 68, 68, 0.20);
  border-color: rgba(239, 68, 68, 0.42);
}

.app-shell {
  max-width: 1180px;
  margin: 0 auto;
  padding: 10px 20px 46px;
}

.screen { display: none; }
.screen.active { display: block; animation: enter 0.25s ease both; }

@keyframes enter {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.arena-panel {
  position: relative;
  border: 1px solid var(--line);
  background:
    linear-gradient(145deg, rgba(30, 41, 59, 0.86), rgba(2, 6, 23, 0.90)),
    radial-gradient(circle at top left, rgba(56, 189, 248, 0.20), transparent 20rem);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.arena-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.12), transparent);
  opacity: 0.65;
  pointer-events: none;
}

.hero-card {
  min-height: 380px;
  padding: clamp(24px, 4vw, 44px);
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(260px, 0.9fr) minmax(220px, 0.55fr);
  gap: 24px;
  align-items: center;
}

.hero-copy, .rank-panel, .home-arena-visual { position: relative; z-index: 1; }

.hero-copy h2 {
  font-weight: 900;
  letter-spacing: 0.02em;
  text-shadow: 0 0 30px rgba(56, 189, 248, 0.18);
}

.hero-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.hero-actions.center { justify-content: center; }

.home-arena-visual {
  min-height: 280px;
  display: grid;
  place-items: center;
  isolation: isolate;
}

.home-arena-visual::before {
  content: "";
  position: absolute;
  width: 260px;
  height: 92px;
  bottom: 38px;
  border-radius: 50%;
  border: 2px solid rgba(56, 189, 248, 0.22);
  background: radial-gradient(ellipse, rgba(56, 189, 248, 0.18), transparent 68%);
  transform: perspective(420px) rotateX(62deg);
}

.arena-orb {
  position: absolute;
  display: grid;
  place-items: center;
  width: 96px;
  height: 96px;
  border-radius: 28px;
  font-weight: 900;
  letter-spacing: 0.08em;
}

.player-orb {
  left: 38px;
  bottom: 68px;
  color: #06221a;
  background: linear-gradient(135deg, #34d399, #d9f99d);
  box-shadow: 0 0 42px rgba(34, 197, 94, 0.30);
}

.enemy-orb {
  right: 34px;
  top: 42px;
  color: #fff7ed;
  background: linear-gradient(135deg, #dc2626, #7c3aed);
  box-shadow: 0 0 46px rgba(239, 68, 68, 0.34);
}

.slash {
  position: absolute;
  width: 170px;
  height: 12px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.92), transparent);
  box-shadow: 0 0 26px rgba(245, 158, 11, 0.35);
  transform: rotate(-30deg);
}

.slash-1 { top: 120px; left: 95px; }
.slash-2 { top: 155px; left: 118px; transform: rotate(-30deg) scaleX(0.72); }

.rank-panel {
  background: rgba(15, 23, 42, 0.74);
  border: 1px solid rgba(56, 189, 248, 0.32);
  border-radius: 20px;
  padding: 20px;
}

.rank-label, .stat-card span, .result-grid span {
  display: block;
  color: var(--sub);
  font-size: 0.76rem;
  letter-spacing: 0.12em;
  font-weight: 800;
  text-transform: uppercase;
}

.rank-panel strong {
  display: block;
  margin: 8px 0 4px;
  font-size: 1.22rem;
}

.rank-panel p { color: var(--cyan); margin-bottom: 0; font-weight: 800; }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-top: 16px;
}

.stat-card {
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px;
  background: rgba(15, 23, 42, 0.72);
}

.stat-card strong {
  display: block;
  margin-top: 8px;
  font-size: 1.9rem;
  color: var(--ink);
}

.section-head {
  display: flex;
  gap: 18px;
  justify-content: space-between;
  align-items: flex-end;
  margin: 12px 0 18px;
}

.filter-row { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }

.unit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 15px;
}

.unit-card {
  position: relative;
  border: 1px solid rgba(148, 163, 184, 0.26);
  border-radius: 20px;
  padding: 18px;
  background:
    linear-gradient(145deg, rgba(30, 41, 59, 0.90), rgba(15, 23, 42, 0.88));
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.22);
  overflow: hidden;
}

.unit-card::after {
  content: "";
  position: absolute;
  width: 110px;
  height: 110px;
  right: -24px;
  top: -24px;
  border-radius: 32px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.18), transparent 64%);
  transform: rotate(18deg);
}

.unit-card h3 { position: relative; font-size: 1.25rem; z-index: 1; }
.unit-card p { position: relative; z-index: 1; }

.unit-meta {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin: 14px 0;
}

.unit-meta span {
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 9px;
  color: var(--sub);
  background: rgba(2, 6, 23, 0.24);
  font-size: 0.82rem;
}

.unit-meta strong {
  display: block;
  color: var(--ink);
  font-size: 1rem;
  margin-top: 2px;
}

.unit-card button { position: relative; z-index: 1; width: 100%; }
.clear-badge {
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 2;
  border-radius: 999px;
  padding: 5px 9px;
  color: #052e16;
  background: #86efac;
  font-size: 0.72rem;
  font-weight: 900;
}

.battle-layout {
  padding: clamp(16px, 3vw, 26px);
}

.battle-hud {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 160px minmax(0, 1fr);
  gap: 14px;
  align-items: stretch;
}

.fighter-card {
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 16px;
  background: rgba(2, 6, 23, 0.36);
}

.fighter-label {
  display: block;
  color: var(--sub);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  font-weight: 900;
  margin-bottom: 5px;
}

.fighter-card strong { font-size: 1.05rem; }

.hp-bar {
  height: 14px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(148, 163, 184, 0.18);
  overflow: hidden;
  margin: 12px 0 6px;
}

.hp-bar div {
  height: 100%;
  width: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--green), #bef264);
  transition: width 0.28s ease;
}

.hp-bar.enemy div { background: linear-gradient(90deg, var(--red), var(--orange)); }
.fighter-card p { margin-bottom: 0; color: var(--sub); font-weight: 800; }

.versus-box {
  display: grid;
  place-items: center;
  text-align: center;
  border-radius: 18px;
  border: 1px solid rgba(245, 158, 11, 0.35);
  background: radial-gradient(circle, rgba(245, 158, 11, 0.18), rgba(15, 23, 42, 0.26));
}

.versus-box p { margin-bottom: 0; color: var(--sub); font-size: 0.82rem; font-weight: 800; }
.versus-box strong { font-size: 2rem; color: var(--orange); letter-spacing: 0.08em; }
.versus-box span { color: var(--cyan); font-size: 0.78rem; font-weight: 900; letter-spacing: 0.08em; }

.battle-stage {
  position: relative;
  z-index: 1;
  min-height: 230px;
  margin: 18px 0;
  display: grid;
  grid-template-columns: 1fr 220px 1fr;
  align-items: center;
  gap: 18px;
  border: 1px solid rgba(56, 189, 248, 0.18);
  border-radius: 24px;
  background:
    radial-gradient(ellipse at center, rgba(56, 189, 248, 0.14), transparent 55%),
    linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px),
    rgba(2, 6, 23, 0.34);
  background-size: auto, 34px 34px, 34px 34px, auto;
  overflow: hidden;
}

.battle-stage::before {
  content: "";
  position: absolute;
  left: 14%;
  right: 14%;
  bottom: 26px;
  height: 86px;
  border-radius: 50%;
  border: 2px solid rgba(56, 189, 248, 0.20);
  transform: perspective(500px) rotateX(64deg);
  background: radial-gradient(ellipse, rgba(56, 189, 248, 0.12), transparent 70%);
}

.combatant, .combo-core {
  position: relative;
  z-index: 1;
}

.combatant {
  width: min(148px, 42vw);
  height: min(148px, 42vw);
  margin: 0 auto;
  display: grid;
  place-items: center;
  border-radius: 36px;
  font-weight: 900;
  letter-spacing: 0.08em;
  border: 1px solid rgba(255, 255, 255, 0.16);
}

.player-avatar {
  color: #04130d;
  background: linear-gradient(135deg, #22c55e, #d9f99d);
  box-shadow: 0 0 48px rgba(34, 197, 94, 0.28);
}

.enemy-avatar {
  color: #fff7ed;
  background: linear-gradient(135deg, #ef4444, #7c3aed);
  box-shadow: 0 0 54px rgba(239, 68, 68, 0.34);
}

.combo-core {
  text-align: center;
  border: 1px solid rgba(245, 158, 11, 0.28);
  border-radius: 18px;
  padding: 16px 12px;
  background: rgba(15, 23, 42, 0.72);
}

.combo-core span {
  display: block;
  font-size: clamp(1.25rem, 3vw, 2rem);
  font-weight: 900;
  color: var(--orange);
}

.combo-core small { color: var(--sub); font-weight: 800; }

.question-card {
  position: relative;
  z-index: 1;
  padding: clamp(18px, 3vw, 28px);
  border: 1px solid var(--line);
  border-radius: 22px;
  background: rgba(248, 250, 252, 0.96);
  color: var(--darkText);
}

.question-meta { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
.question-meta span {
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.82rem;
  font-weight: 900;
  color: #0f172a;
  background: #e0f2fe;
}

.question-card h2 {
  font-size: clamp(1.1rem, 2.4vw, 1.65rem);
  color: #0f172a;
}

.choice-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.choice-btn {
  min-height: 60px;
  border: 1px solid #cbd5e1;
  background: #fff;
  border-radius: 16px;
  padding: 14px 16px;
  text-align: left;
  font-weight: 900;
  color: #0f172a;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.06);
}

.choice-btn:hover:not(:disabled) {
  border-color: #38bdf8;
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.14);
}

.choice-btn:disabled { cursor: default; opacity: 0.82; }
.choice-btn.correct { border-color: #22c55e; background: #dcfce7; }
.choice-btn.wrong { border-color: #ef4444; background: #fee2e2; }

.feedback {
  margin: 16px 0 0;
  border-radius: 16px;
  padding: 14px 16px;
  line-height: 1.7;
  font-weight: 700;
}

.feedback.good { background: #dcfce7; color: #14532d; }
.feedback.bad { background: #fee2e2; color: #7f1d1d; }

#nextQuestion { margin-top: 14px; }

.result-card {
  max-width: 760px;
  margin: 20px auto 0;
  padding: clamp(24px, 5vw, 42px);
  text-align: center;
}

.result-card > * { position: relative; z-index: 1; }
.result-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin: 22px 0;
}

.result-grid div {
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 14px;
  background: rgba(2, 6, 23, 0.32);
}

.result-grid strong { display: block; margin-top: 6px; font-size: 1.6rem; }
.title-earned {
  margin: 16px auto;
  padding: 12px 14px;
  max-width: 520px;
  border-radius: 16px;
  color: #422006;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  font-weight: 900;
}

.review-list {
  display: grid;
  gap: 12px;
}

.review-card {
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 16px;
  background: rgba(15, 23, 42, 0.78);
}

.review-card h3 { margin-bottom: 8px; }
.review-card p { color: var(--sub); line-height: 1.7; }
.review-actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
.empty-state {
  border: 1px dashed rgba(148, 163, 184, 0.34);
  border-radius: 20px;
  padding: 28px;
  text-align: center;
  color: var(--sub);
  background: rgba(15, 23, 42, 0.54);
}

.site-footer {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 20px 30px;
  color: var(--sub);
  font-size: 0.82rem;
  text-align: center;
}

.shake { animation: shake 0.32s ease; }
.flash { animation: flash 0.42s ease; }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  55% { transform: translateX(7px); }
  75% { transform: translateX(-4px); }
}

@keyframes flash {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.45); }
}

@media (max-width: 900px) {
  .site-header, .section-head { align-items: flex-start; flex-direction: column; }
  .hero-card { grid-template-columns: 1fr; }
  .home-arena-visual { min-height: 220px; }
  .battle-hud { grid-template-columns: 1fr; }
  .versus-box { padding: 12px; }
  .battle-stage { grid-template-columns: 1fr; padding: 20px 12px; }
  .combo-core { order: -1; width: min(420px, 92%); margin: 0 auto; }
  .stats-grid, .result-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 560px) {
  .brand-mark { width: 46px; height: 46px; }
  .top-nav, .filter-row, .hero-actions { width: 100%; }
  .nav-btn, .chip, .primary, .secondary, .danger { flex: 1; text-align: center; }
  .choice-grid { grid-template-columns: 1fr; }
  .stats-grid, .result-grid { grid-template-columns: 1fr; }
  .hero-card, .battle-layout, .result-card { border-radius: 18px; }
  .home-arena-visual { display: none; }
}
