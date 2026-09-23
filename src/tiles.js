export const SUITS = [
  { id: "m", label: "万", color: "red" },
  { id: "p", label: "筒", color: "blue" },
  { id: "s", label: "条", color: "green" },
];

export const HONORS = [
  { id: "E", label: "东" },
  { id: "S", label: "南" },
  { id: "W", label: "西" },
  { id: "N", label: "北" },
  { id: "C", label: "中", color: "red" },
  { id: "F", label: "发", color: "green" },
  { id: "P", label: "白" },
];

export const WINDS = ["E", "S", "W", "N"];
export const DRAGONS = ["C", "F", "P"];

export function tileId(suit, rank) {
  return `${suit}${rank}`;
}

export function allTiles() {
  const tiles = [];
  for (const suit of SUITS) {
    for (let rank = 1; rank <= 9; rank += 1) tiles.push(makeTile(suit.id, rank));
  }
  for (const honor of HONORS) tiles.push({ id: honor.id, label: honor.label, color: honor.color || "", suit: "z", rank: 0, honor: true });
  return tiles;
}

export function makeTile(suit, rank) {
  const meta = SUITS.find((item) => item.id === suit);
  return { id: tileId(suit, rank), label: `${rank}${meta.label}`, color: meta.color, suit, rank, honor: false };
}

export function parseTile(id) {
  if (HONORS.some((honor) => honor.id === id)) {
    const honor = HONORS.find((item) => item.id === id);
    return { id, label: honor.label, color: honor.color || "", suit: "z", rank: 0, honor: true };
  }
  return makeTile(id[0], Number(id.slice(1)));
}

export function isTerminal(tile) {
  return !tile.honor && (tile.rank === 1 || tile.rank === 9);
}

export function isSimple(tile) {
  return !tile.honor && tile.rank >= 2 && tile.rank <= 8;
}

export function sameTile(a, b) {
  return a.id === b.id;
}
