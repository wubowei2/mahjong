import { allTiles, parseTile } from "./tiles.js?v=13";
import { scoreHand } from "./score.js";

const state = {
  selected: [],
  concealed: [],
  loose: [],
};

const palette = document.querySelector("#palette");
const concealedList = document.querySelector("#concealedList");
const looseBox = document.querySelector("#looseBox");

function selectedTiles() {
  return state.selected.map(parseTile);
}

function clearSelection() {
  state.selected = [];
  paintPalette();
}

function paintPalette() {
  palette.innerHTML = "";
  for (const tile of allTiles()) {
    const count = state.selected.filter((id) => id === tile.id).length;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tile ${tile.color} ${count ? "selected" : ""}`;
    button.textContent = count ? `${tile.label}×${count}` : tile.label;
    button.addEventListener("click", () => {
      if (count >= 4) state.selected = state.selected.filter((id) => id !== tile.id);
      else state.selected.push(tile.id);
      paintPalette();
    });
    palette.appendChild(button);
  }
}

function classify(tiles) {
  const counts = new Map();
  for (const tile of tiles) counts.set(tile.id, (counts.get(tile.id) || 0) + 1);
  return bestPartition(counts);
}

function consume(counts, id, amount) {
  if ((counts.get(id) || 0) < amount) return null;
  const next = new Map(counts);
  const left = next.get(id) - amount;
  if (left === 0) next.delete(id);
  else next.set(id, left);
  return next;
}

function meldScore(melds) {
  const count = (type) => melds.filter((meld) => meld.type === type).length;
  return count("chow") * 1000 + count("pung") * 100 + count("kong") * 10 - count("pair");
}

function bestPartition(counts) {
  let best = null;
  const visit = (rest, acc) => {
    if (best && meldScore(acc) + Math.floor([...rest.values()].reduce((sum, n) => sum + n, 0) / 3) * 1000 < meldScore(best)) return;
    if (rest.size === 0) {
      if (!best || meldScore(acc) > meldScore(best)) best = acc;
      return;
    }
    const id = [...rest.keys()].sort()[0];
    const tile = parseTile(id);
    const count = rest.get(id);
    if (!tile.honor && tile.rank <= 7) {
      const first = consume(rest, id, 1);
      const second = first && consume(first, `${tile.suit}${tile.rank + 1}`, 1);
      const next = second && consume(second, `${tile.suit}${tile.rank + 2}`, 1);
      if (next) visit(next, [...acc, { type: "chow", tiles: [tile, parseTile(`${tile.suit}${tile.rank + 1}`), parseTile(`${tile.suit}${tile.rank + 2}`)] }]);
    }
    if (count >= 3) visit(consume(rest, id, 3), [...acc, { type: "pung", tiles: [tile, tile, tile] }]);
    if (count >= 4) visit(consume(rest, id, 4), [...acc, { type: "kong", tiles: [tile, tile, tile, tile] }]);
    if (count >= 2) visit(consume(rest, id, 2), [...acc, { type: "pair", tiles: [tile, tile] }]);
  };
  visit(counts, []);
  return best;
}

function renderGroup(list, items, bucket) {
  list.innerHTML = "";
  items.forEach((meld, index) => {
    const item = document.createElement("li");
    item.textContent = `${labelOf(meld)} `;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "tiny";
    remove.textContent = "移除";
    remove.addEventListener("click", () => {
      bucket.splice(index, 1);
      render();
    });
    item.appendChild(remove);
    list.appendChild(item);
  });
}

function labelOf(meld) {
  const names = { chow: "顺", pung: "刻", kong: "杠", pair: "对" };
  return `${names[meld.type]} ${meld.tiles.map((tile) => tile.label).join(" ")}`;
}

function render() {
  renderGroup(concealedList, state.concealed, state.concealed);
  looseBox.textContent = state.loose.length ? state.loose.map((tile) => tile.label).join(" ") : "十三幺、全不靠、组合龙时使用";
}

function addGroup() {
  const tiles = selectedTiles();
  if (!tiles.length) {
    showError("请先点选牌。");
    return;
  }
  if (tiles.length > 18) {
    showError("一次最多添加 18 张，请分批加入。");
    return;
  }
  const melds = classify(tiles);
  if (!melds) {
    showError("这些牌无法分成顺子、刻子、杠子或对子。");
    return;
  }
  state.concealed.push(...melds.map((meld) => ({ ...meld, concealed: true })));
  showError("");
  clearSelection();
  render();
}

function showError(message) {
  const error = document.querySelector("#error");
  error.hidden = !message;
  error.textContent = message || "";
}

function currentHand() {
  return {
    melds: state.concealed.map((meld) => ({ ...meld, concealed: true })),
    loose: state.loose,
    winningTile: null,
    flowers: Number(document.querySelector("#flowers").value || 0),
    winType: document.querySelector("#winType").value,
    seatWind: document.querySelector("#seatWind").value,
    roundWind: document.querySelector("#roundWind").value,
    lastTile: document.querySelector("#lastTile").checked,
    kongDraw: document.querySelector("#kongDraw").checked,
    edgeWait: document.querySelector("#edgeWait").checked,
    closedWait: document.querySelector("#closedWait").checked,
    singleWait: document.querySelector("#singleWait").checked,
    lastOfKind: document.querySelector("#lastOfKind").checked,
    special: document.querySelector("#specialShape").value,
  };
}

function calculate() {
  const result = scoreHand(currentHand());
  const body = document.querySelector("#resultBody");
  const excluded = document.querySelector("#excluded");
  const total = document.querySelector("#totalFan");
  const card = document.querySelector("#totalCard");
  const limit = document.querySelector("#limitLabel");
  if (result.errors.length) {
    showError(result.errors[0]);
    return;
  }
  showError("");
  total.textContent = String(result.total);
  card.classList.toggle("ready", result.qualified);
  limit.textContent = result.qualified ? "可和牌" : "未满 8 番";
  body.innerHTML = result.fans.map((item) => `<tr><td>${item.name}${item.times > 1 ? ` ×${item.times}` : ""}</td><td>${item.value}</td><td>${item.note}</td></tr>`).join("");
  excluded.innerHTML = result.excluded.map((item) => `<li>${item.name}（${item.value} 番）不计</li>`).join("") || "<li>无</li>";
}

function loadSample() {
  state.concealed = [
    classify([parseTile("m1"), parseTile("m2"), parseTile("m3")]),
    classify([parseTile("m4"), parseTile("m5"), parseTile("m6")]),
    classify([parseTile("p7"), parseTile("p8"), parseTile("p9")]),
    classify([parseTile("s2"), parseTile("s3"), parseTile("s4")]),
    classify([parseTile("s6"), parseTile("s6")]),
  ].map((meld) => ({ ...meld, concealed: true }));
  state.loose = [];
  document.querySelector("#flowers").value = "2";
  document.querySelector("#winType").value = "discard";
  document.querySelector("#specialShape").value = "auto";
  render();
  calculate();
}

document.querySelector("#addConcealed").addEventListener("click", addGroup);
document.querySelector("#addLoose").addEventListener("click", () => {
  state.loose.push(...selectedTiles());
  clearSelection();
  render();
});
document.querySelector("#clearBtn").addEventListener("click", () => {
  state.concealed = [];
  state.loose = [];
  state.selected = [];
  document.querySelector("#flowers").value = "0";
  document.querySelector("#winType").value = "discard";
  document.querySelector("#seatWind").value = "east";
  document.querySelector("#roundWind").value = "east";
  document.querySelector("#specialShape").value = "auto";
  for (const id of ["lastTile", "kongDraw", "singleWait", "edgeWait", "closedWait", "lastOfKind"]) {
    document.querySelector(`#${id}`).checked = false;
  }
  document.querySelector("#totalFan").textContent = "0";
  document.querySelector("#limitLabel").textContent = "未起和";
  document.querySelector("#totalCard").classList.remove("ready");
  document.querySelector("#resultBody").innerHTML = '<tr><td colspan="3" class="empty">尚未计算</td></tr>';
  document.querySelector("#excluded").innerHTML = "";
  showError("");
  paintPalette();
  render();
});
document.querySelector("#sampleBtn").addEventListener("click", loadSample);
document.querySelector("#calcBtn").addEventListener("click", calculate);
looseBox.addEventListener("click", () => {
  state.loose = [];
  render();
});

paintPalette();
render();
