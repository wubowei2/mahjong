import { parseTile } from "./tiles.js";
import { scoreHand } from "./score.js";

function chow(ids) {
  return { type: "chow", concealed: true, tiles: ids.map(parseTile) };
}
function pung(id, concealed = true) {
  const tile = parseTile(id);
  return { type: "pung", concealed, tiles: [tile, tile, tile] };
}
function pair(id, concealed = true) {
  const tile = parseTile(id);
  return { type: "pair", concealed, tiles: [tile, tile] };
}
function tile(id) {
  return parseTile(id);
}

function expect(name, hand, total, includes) {
  const result = scoreHand(hand);
  const names = result.fans.map((item) => item.name).join(",");
  const ok = result.errors.length === 0 && result.total === total && includes.every((item) => names.includes(item));
  if (!ok) {
    console.error("FAIL", name, result);
    process.exitCode = 1;
  } else {
    console.log("OK", name, result.total);
  }
}

expect("sample pinfu flowers", {
  melds: [chow(["m1", "m2", "m3"]), chow(["m4", "m5", "m6"]), chow(["p7", "p8", "p9"]), chow(["s2", "s3", "s4"]), pair("s6")],
  loose: [],
  winningTile: null,
  flowers: 2,
  winType: "discard",
  seatWind: "east",
  roundWind: "east",
  lastTile: false,
  kongDraw: false,
  edgeWait: false,
  closedWait: false,
  singleWait: false,
  lastOfKind: false,
  special: "auto",
}, 8, ["平和", "花牌", "门前清"]);

expect("big three dragons", {
  melds: [pung("C"), pung("F"), pung("P"), pung("m2"), pair("s5")],
  loose: [],
  winningTile: null,
  flowers: 0,
  winType: "self",
  seatWind: "south",
  roundWind: "east",
  lastTile: false,
  kongDraw: false,
  edgeWait: false,
  closedWait: false,
  singleWait: false,
  lastOfKind: false,
  special: "auto",
}, 99, ["大三元", "碰碰和", "不求人"]);

expect("chicken blocked by one flower", {
  melds: [pung("C", false), pung("m2", false), pung("p5", false), chow(["s7", "s8", "s9"]), pair("m5", false)],
  loose: [],
  winningTile: null,
  flowers: 1,
  winType: "discard",
  seatWind: "south",
  roundWind: "west",
  lastTile: false,
  kongDraw: false,
  edgeWait: false,
  closedWait: false,
  singleWait: true,
  lastOfKind: false,
  special: "auto",
}, 5, ["箭刻", "花牌", "幺九刻"]);
