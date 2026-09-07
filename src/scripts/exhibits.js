const sceneData = {
  bot: ["01", "題目圖片 → 可追問的解答", "數十名同學 · 約一年真實使用"],
  sift: ["02", "程式碼 → 可重跑的檢查", "Go · 靜態規則 · 可選 LLM · SARIF"],
  rl: ["03", "遊戲狀態 → 策略學習", "DQN · Replay buffer · Epsilon-greedy"],
};
function setScene(name) {
  document.querySelectorAll("[data-scene]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.scene === name));
  });
  document.querySelectorAll("[data-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.panel !== name;
    panel.classList.toggle("is-active", !panel.hidden);
  });
  document
    .querySelectorAll(".scene-counter")
    .forEach((el) => (el.textContent = sceneData[name][0]));
  document
    .querySelectorAll(".proof-title")
    .forEach((el) => (el.textContent = sceneData[name][1]));
  document
    .querySelectorAll(".proof-text")
    .forEach((el) => (el.textContent = sceneData[name][2]));
}
document
  .querySelectorAll("[data-scene]")
  .forEach((button) =>
    button.addEventListener("click", () => setScene(button.dataset.scene)),
  );
// A deterministic local board demonstration; this does not run or evaluate the trained agent.
document.querySelectorAll(".board-step").forEach((button) =>
  button.addEventListener("click", () => {
    const cells = [
      ...button.closest(".board-ui").querySelectorAll(".board-grid > span"),
    ];
    const values = cells.map((cell) => Number(cell.dataset.value));
    let next = [];
    for (let row = 0; row < 4; row++) {
      const input = values.slice(row * 4, row * 4 + 4).filter(Boolean);
      const merged = [];
      for (let i = 0; i < input.length; i++) {
        if (input[i] === input[i + 1]) {
          merged.push(input[i] * 2);
          i++;
        } else merged.push(input[i]);
      }
      next.push(...merged, ...Array(4 - merged.length).fill(0));
    }
    if (next.every((value, index) => value === values[index])) {
      next = [2, 0, 2, 4, 4, 4, 8, 0, 2, 8, 8, 16, 0, 2, 4, 4];
      button.textContent = "走一步 ←";
    } else {
      const empty = next.lastIndexOf(0);
      if (empty >= 0) next[empty] = 2;
      button.textContent = "再走一步 ←";
    }
    cells.forEach((cell, i) => {
      cell.dataset.value = next[i];
      cell.textContent = next[i] || "";
    });
  }),
);
const exhibitCopy = {
  bot: [
    "小系統。<br>真實的使用。",
    "從同學的一張題目圖片開始，<br>做出能解題、也能接續追問的工具。",
    "Discord 解題 Bot",
    "discord",
  ],
  sift: [
    "先有懷疑。<br>再用證據回答。",
    "靜態規則與套件驗證先行，<br>讓檢查結果可以重跑、可以核對。",
    "Sift",
    "sift",
  ],
  rl: [
    "從一次移動，<br>理解策略學習。",
    "手寫 DQN 與經驗回放，<br>探索遊戲狀態、動作與獎勵的關係。",
    "Simple 2048 RL",
    "rl",
  ],
};
document.querySelectorAll("[data-scene]").forEach((b) =>
  b.addEventListener("click", () => {
    const c = exhibitCopy[b.dataset.scene],
      intro = document.querySelector(".exhibit-intro");
    if (!intro) return;
    intro.querySelector("h2").innerHTML = c[0];
    intro.querySelector("p").innerHTML = c[1];
    intro.querySelector("a").textContent = c[2] + " ↗";
    intro.querySelector("a").href = "/projects#" + c[3];
  }),
);
