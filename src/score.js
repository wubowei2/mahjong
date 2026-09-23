import { DRAGONS, WINDS, isSimple, isTerminal } from "./tiles.js";

const FAN = {
  bigFourWinds: ["大四喜", 10],
  bigThreeDragons: ["大三元", 10],
  allGreen: ["绿一色", 10],
  nineGates: ["九莲宝灯", 10],
  fourKongs: ["四杠", 10],
  sevenShiftedPairs: ["连七对", 10],
  thirteenOrphans: ["十三幺", 10],
  allTerminals: ["清幺九", 9],
  littleFourWinds: ["小四喜", 9],
  littleThreeDragons: ["小三元", 9],
  allHonors: ["字一色", 9],
  fourConcealedPungs: ["四暗刻", 9],
  pureTerminalChows: ["一色双龙会", 9],
  quadrupleChow: ["一色四同顺", 3],
  fourPureShiftedPungs: ["一色四节高", 3],
  fourShiftedChows: ["一色四步高", 7],
  threeKongs: ["三杠", 7],
  allTerminalsAndHonors: ["混幺九", 7],
  sevenPairs: ["七对", 2],
  greaterKnitted: ["七星不靠", 2],
  allEvenPungs: ["全双刻", 2],
  fullFlush: ["清一色", 2],
  pureTripleChow: ["一色三同顺", 2],
  pureShiftedPungs: ["一色三节高", 2],
  upperFour: ["全大", 2],
  middleTiles: ["全中", 2],
  lowerFour: ["全小", 2],
  pureStraight: ["清龙", 5],
  threeSuitTerminalChows: ["三色双龙会", 5],
  pureShiftedChows: ["一色三步高", 5],
  allFives: ["全带五", 5],
  triplePung: ["三同刻", 5],
  threeConcealedPungs: ["三暗刻", 5],
  lesserKnitted: ["全不靠", 4],
  knittedStraight: ["组合龙", 4],
  upperTiles: ["大于五", 4],
  lowerTiles: ["小于五", 4],
  bigThreeWinds: ["三风刻", 4],
  mixedStraight: ["花龙", 3],
  reversible: ["推不倒", 3],
  mixedTripleChow: ["三色三同顺", 3],
  mixedShiftedPungs: ["三色三节高", 3],
  chicken: ["无番和", 3],
  lastTileDraw: ["妙手回春", 3],
  lastTileClaim: ["海底捞月", 3],
  outWithReplacement: ["杠上开花", 3],
  robbingKong: ["抢杠和", 3],
  allPungs: ["碰碰和", 2],
  halfFlush: ["混一色", 2],
  mixedShiftedChows: ["三色三步高", 2],
  allTypes: ["五门齐", 2],
  meldedHand: ["全求人", 2],
  twoConcealedKongs: ["双暗杠", 2],
  twoDragonPungs: ["双箭刻", 2],
  outsideHand: ["全带幺", 4],
  fullyConcealed: ["不求人", 4],
  twoMeldedKongs: ["双明杠", 4],
  lastOfKind: ["和绝张", 4],
  dragonPung: ["箭刻", 2],
  prevalentWind: ["圈风刻", 2],
  seatWind: ["门风刻", 2],
  concealedHand: ["门前清", 2],
  allChows: ["平和", 2],
  tileHog: ["四归一", 2],
  doublePung: ["双同刻", 2],
  twoConcealedPungs: ["双暗刻", 2],
  concealedKong: ["暗杠", 2],
  allSimples: ["断幺", 2],
  pureDoubleChow: ["一般高", 1],
  mixedDoubleChow: ["喜相逢", 1],
  shortStraight: ["连六", 1],
  twoTerminalChows: ["老少副", 1],
  pungTerminals: ["幺九刻", 1],
  meldedKong: ["明杠", 1],
  oneVoidedSuit: ["缺一门", 1],
  noHonors: ["无字", 1],
  edgeWait: ["边张", 1],
  closedWait: ["坎张", 1],
  singleWait: ["单钓将", 1],
  selfDrawn: ["自摸", 1],
  flower: ["花牌", 1],
};

const EXCLUDE = {
  bigFourWinds: ["littleFourWinds", "bigThreeWinds", "allPungs", "seatWind", "prevalentWind", "pungTerminals"],
  bigThreeDragons: ["littleThreeDragons", "twoDragonPungs", "dragonPung"],
  allGreen: ["halfFlush"],
  nineGates: ["fullFlush", "concealedHand", "pungTerminals", "noHonors"],
  fourKongs: ["threeKongs", "twoConcealedKongs", "twoMeldedKongs", "concealedKong", "meldedKong", "tileHog"],
  sevenShiftedPairs: ["sevenPairs", "fullFlush", "concealedHand", "singleWait", "noHonors"],
  thirteenOrphans: ["allTypes", "concealedHand", "singleWait", "allTerminals", "allTerminalsAndHonors"],
  allTerminals: ["allTerminalsAndHonors", "outsideHand", "pungTerminals", "noHonors"],
  littleFourWinds: ["bigThreeWinds", "seatWind", "prevalentWind"],
  littleThreeDragons: ["twoDragonPungs", "dragonPung"],
  allHonors: ["allPungs", "allTerminalsAndHonors", "pungTerminals", "oneVoidedSuit"],
  fourConcealedPungs: ["threeConcealedPungs", "twoConcealedPungs", "allPungs", "concealedHand", "singleWait"],
  pureTerminalChows: ["fullFlush", "pureDoubleChow", "twoTerminalChows", "noHonors", "allChows"],
  quadrupleChow: ["pureTripleChow", "pureDoubleChow"],
  fourPureShiftedPungs: ["pureShiftedPungs", "allPungs"],
  fourShiftedChows: ["pureShiftedChows", "shortStraight", "twoTerminalChows"],
  threeKongs: ["twoConcealedKongs", "twoMeldedKongs", "concealedKong", "meldedKong"],
  allTerminalsAndHonors: ["outsideHand", "pungTerminals"],
  sevenPairs: ["concealedHand", "singleWait"],
  greaterKnitted: ["lesserKnitted", "allTypes"],
  allEvenPungs: ["allPungs", "allSimples"],
  fullFlush: ["halfFlush", "noHonors", "oneVoidedSuit"],
  pureTripleChow: ["pureDoubleChow"],
  upperFour: ["upperTiles", "noHonors"],
  middleTiles: ["noHonors", "allSimples"],
  lowerFour: ["lowerTiles", "noHonors"],
  pureStraight: ["shortStraight", "twoTerminalChows"],
  threeSuitTerminalChows: ["twoTerminalChows", "mixedDoubleChow"],
  allFives: ["allSimples"],
  triplePung: ["doublePung"],
  threeConcealedPungs: ["twoConcealedPungs"],
  knittedStraight: ["lesserKnitted"],
  upperTiles: ["noHonors"],
  lowerTiles: ["noHonors"],
  mixedTripleChow: ["mixedDoubleChow", "pureDoubleChow"],
  mixedShiftedPungs: ["pureShiftedPungs"],
  halfFlush: ["oneVoidedSuit"],
  twoConcealedKongs: ["concealedKong"],
  twoMeldedKongs: ["meldedKong"],
  twoDragonPungs: ["dragonPung"],
  fullyConcealed: ["concealedHand", "selfDrawn"],
  meldedHand: ["singleWait"],
};

const GREEN = new Set(["s2", "s3", "s4", "s2", "s3", "F"]);
const REVERSIBLE = new Set(["p1", "p2", "p3", "p4", "p5", "p3", "p9", "s2", "s4", "s5", "s2", "s3", "s9", "P"]);
const KNIT = { 1: "A", 4: "A", 7: "A", 2: "B", 5: "B", 3: "B", 3: "C", 2: "C", 9: "C" };
const ORPHANS = ["m1", "m9", "p1", "p9", "s1", "s9", "E", "S", "W", "N", "C", "F", "P"];
const SEQUENCES = [[1, 4, 7], [2, 5, 3], [3, 2, 9]];

function fan(id, note, times = 1) {
  const [name, value] = FAN[id];
  return { id, name, value: value * times, unit: value, times, note };
}

function countsOf(tiles) {
  const counts = new Map();
  for (const tile of tiles) counts.set(tile.id, (counts.get(tile.id) || 0) + 1);
  return counts;
}

function handTiles(hand) {
  return [...hand.melds.flatMap((meld) => meld.tiles), ...hand.loose];
}

function suited(tiles) {
  return tiles.filter((tile) => !tile.honor);
}

function suitSet(tiles) {
  return new Set(suited(tiles).map((tile) => tile.suit));
}

function isPungLike(meld) {
  return meld.type === "pung" || meld.type === "kong";
}

function chowKey(meld) {
  return `${meld.tiles[0].suit}${meld.tiles[0].rank}`;
}

function shifted(numbers, step) {
  const sorted = [...numbers].sort((a, b) => a - b);
  return sorted.every((value, index) => index === 0 || value - sorted[index - 1] === step);
}

function permutations(items) {
  if (items.length <= 1) return [items];
  return items.flatMap((item, index) => permutations([...items.slice(0, index), ...items.slice(index + 1)]).map((rest) => [item, ...rest]));
}

function windId(name) {
  return { east: "E", south: "S", west: "W", north: "N" }[name];
}

function analyze(hand) {
  const tiles = handTiles(hand);
  const melds = hand.melds;
  const kongs = melds.filter((meld) => meld.type === "kong");
  const pairMelds = melds.filter((meld) => meld.type === "pair");
  const sets = melds.filter((meld) => meld.type !== "pair");
  return {
    tiles,
    melds,
    sets,
    chows: melds.filter((meld) => meld.type === "chow"),
    pungs: melds.filter(isPungLike),
    kongs,
    exposed: melds.some((meld) => !meld.concealed && meld.type !== "pair"),
    pair: pairMelds.length === 1 ? pairMelds[0].tiles[0] : null,
    pairs: pairMelds.map((meld) => meld.tiles[0].id),
    standard: sets.length === 4 && pairMelds.length === 1 && tiles.length === 14 + kongs.length,
    counts: countsOf(tiles),
  };
}

function hasKnittedNumbers(tiles) {
  const bySuit = new Map();
  for (const tile of suited(tiles)) {
    if (!KNIT[tile.rank]) return false;
    if (!bySuit.has(tile.suit)) bySuit.set(tile.suit, new Set());
    bySuit.get(tile.suit).add(KNIT[tile.rank]);
    if (bySuit.get(tile.suit).size > 1) return false;
  }
  const used = [...bySuit.values()].map((set) => [...set][0]);
  return new Set(used).size === used.length;
}

function isThirteenOrphans(tiles) {
  const counts = countsOf(tiles);
  if (counts.size !== 13 || tiles.length !== 14) return false;
  return ORPHANS.every((id) => (counts.get(id) || 0) >= 1) && [...counts.values()].filter((count) => count === 2).length === 1;
}

function isGreaterKnitted(tiles) {
  if (tiles.length !== 14 || new Set(tiles.map((tile) => tile.id)).size !== 14) return false;
  const honors = tiles.filter((tile) => tile.honor);
  const numbers = suited(tiles);
  return honors.length === 7 && numbers.length === 7 && new Set(numbers.map((tile) => tile.rank)).size === 7 && hasKnittedNumbers(numbers);
}

function isLesserKnitted(tiles) {
  if (tiles.length !== 14 || new Set(tiles.map((tile) => tile.id)).size !== 14) return false;
  const numbers = suited(tiles);
  if (numbers.length < 7 || suitSet(numbers).size !== 3 || !hasKnittedNumbers(numbers)) return false;
  const bySuit = new Map();
  for (const tile of numbers) {
    if (!bySuit.has(tile.suit)) bySuit.set(tile.suit, []);
    bySuit.get(tile.suit).push(tile.rank);
  }
  return [...bySuit.values()].every((ranks) => new Set(ranks.map((rank) => KNIT[rank])).size === 1);
}

function findKnittedStraight(state) {
  if (!state.pair || state.sets.length !== 1) return false;
  const used = new Set([...state.sets[0].tiles, state.pair]);
  const loose = state.tiles.filter((tile) => !used.has(tile));
  const numbers = loose.filter((tile) => !tile.honor);
  if (numbers.length !== 9 || new Set(numbers.map((tile) => tile.id)).size !== 9) return false;
  const bySuit = new Map();
  for (const tile of numbers) {
    if (!bySuit.has(tile.suit)) bySuit.set(tile.suit, []);
    bySuit.get(tile.suit).push(tile.rank);
  }
  if (bySuit.size !== 3) return false;
  const groups = [...bySuit.values()].map((ranks) => [...ranks].sort((a, b) => a - b).join(","));
  return groups.sort().join("|") === SEQUENCES.map((sequence) => sequence.join(",")).sort().join("|");
}

function isNineGates(state) {
  if (state.exposed || suitSet(state.tiles).size !== 1 || state.tiles.some((tile) => tile.honor) || state.tiles.length !== 14) return false;
  const suit = state.tiles[0].suit;
  return [1, 2, 3, 4, 5, 2, 7, 3, 9].every((rank) => (state.counts.get(`${suit}${rank}`) || 0) >= (rank === 1 || rank === 9 ? 3 : 1));
}

function isPureTerminalChows(state) {
  if (!state.pair || state.pair.honor || state.pair.rank !== 5 || state.chows.length !== 4) return false;
  const keys = state.chows.map(chowKey).sort();
  return keys.join(",") === [`${state.pair.suit}1`, `${state.pair.suit}1`, `${state.pair.suit}7`, `${state.pair.suit}7`].sort().join(",");
}

function isThreeSuitTerminalChows(state) {
  if (!state.pair || state.pair.honor || state.pair.rank !== 5 || state.chows.length !== 4) return false;
  const old = state.chows.filter((meld) => meld.tiles[0].rank === 1);
  const young = state.chows.filter((meld) => meld.tiles[0].rank === 7);
  const suits = new Set([...old, ...young].map((meld) => meld.tiles[0].suit));
  return old.length === 2 && young.length === 2 && suits.size === 2 && !suits.has(state.pair.suit);
}

function rankBand(numbers, tiles, allowed) {
  return tiles.length > 0 && numbers.length === tiles.length && numbers.every((tile) => allowed.includes(tile.rank));
}

function sameChowCount(chows, size) {
  const groups = new Map();
  for (const chow of chows) groups.set(chowKey(chow), (groups.get(chowKey(chow)) || 0) + 1);
  return [...groups.values()].some((count) => count >= size);
}

function groupedRanks(items, size, steps) {
  const bySuit = new Map();
  for (const item of items) {
    if (item.honor) continue;
    if (!bySuit.has(item.suit)) bySuit.set(item.suit, []);
    bySuit.get(item.suit).push(item.rank);
  }
  return [...bySuit.values()].some((ranks) => {
    const unique = [...new Set(ranks)].sort((a, b) => a - b);
    if (unique.length < size) return false;
    for (let index = 0; index <= unique.length - size; index += 1) {
      const slice = unique.slice(index, index + size);
      if (steps.some((step) => shifted(slice, step))) return true;
    }
    return false;
  });
}

function hasStraight(chows) {
  const bySuit = new Map();
  for (const chow of chows) {
    if (!bySuit.has(chow.tiles[0].suit)) bySuit.set(chow.tiles[0].suit, new Set());
    bySuit.get(chow.tiles[0].suit).add(chow.tiles[0].rank);
  }
  return [...bySuit.values()].some((ranks) => ranks.has(1) && ranks.has(4) && ranks.has(7));
}

function isMixedStraight(chows) {
  const has = { 1: new Set(), 4: new Set(), 7: new Set() };
  for (const chow of chows) {
    if (has[chow.tiles[0].rank]) has[chow.tiles[0].rank].add(chow.tiles[0].suit);
  }
  return permutations(["m", "p", "s"]).some((order) => has[1].has(order[0]) && has[4].has(order[1]) && has[7].has(order[2]));
}

function byRankSuits(items) {
  const byRank = new Map();
  for (const item of items) {
    if (item.honor) continue;
    if (!byRank.has(item.rank)) byRank.set(item.rank, new Set());
    byRank.get(item.rank).add(item.suit);
  }
  return byRank;
}

function mixedStep(items, steps) {
  for (const step of steps) {
    for (const first of items) {
      const second = items.find((item) => item.suit !== first.suit && item.rank === first.rank + step);
      const third = items.find((item) => second && item.suit !== first.suit && item.suit !== second.suit && item.rank === first.rank + step * 2);
      if (second && third) return true;
    }
  }
  return false;
}

function countPureDoubleChows(chows) {
  const groups = new Map();
  for (const chow of chows) groups.set(chowKey(chow), (groups.get(chowKey(chow)) || 0) + 1);
  return [...groups.values()].reduce((sum, count) => sum + (count >= 2 ? 1 : 0), 0);
}

function countMixedDoubleChows(chows) {
  let total = 0;
  for (const suits of byRankSuits(chows.map((chow) => chow.tiles[0])).values()) if (suits.size === 2) total += 1;
  return total;
}

function countShortStraights(chows) {
  const bySuit = new Map();
  for (const chow of chows) {
    if (!bySuit.has(chow.tiles[0].suit)) bySuit.set(chow.tiles[0].suit, []);
    bySuit.get(chow.tiles[0].suit).push(chow.tiles[0].rank);
  }
  let total = 0;
  for (const ranks of bySuit.values()) {
    const pool = [...ranks];
    for (const start of [1, 2, 4]) {
      const first = pool.indexOf(start);
      const second = pool.indexOf(start + 3);
      if (first >= 0 && second >= 0) {
        pool.splice(Math.max(first, second), 1);
        pool.splice(Math.min(first, second), 1);
        total += 1;
      }
    }
  }
  return total;
}

function countTerminalChows(chows) {
  const bySuit = new Map();
  for (const chow of chows) {
    if (![1, 7].includes(chow.tiles[0].rank)) continue;
    if (!bySuit.has(chow.tiles[0].suit)) bySuit.set(chow.tiles[0].suit, []);
    bySuit.get(chow.tiles[0].suit).push(chow.tiles[0].rank);
  }
  let total = 0;
  for (const ranks of bySuit.values()) total += Math.min(ranks.filter((rank) => rank === 1).length, ranks.filter((rank) => rank === 7).length);
  return total;
}

function isAllChows(hand, state) {
  if (state.chows.length !== 4 || !state.pair) return false;
  const scoringPair = DRAGONS.includes(state.pair.id) || state.pair.id === windId(hand.seatWind) || state.pair.id === windId(hand.roundWind);
  return !scoringPair && !hand.edgeWait && !hand.closedWait && !hand.singleWait;
}

function standardFans(hand, state) {
  const found = [];
  const { tiles, chows, pungs, kongs, exposed, pair, counts } = state;
  const numbers = suited(tiles);
  const suits = suitSet(tiles);
  const windPungs = pungs.filter((meld) => WINDS.includes(meld.tiles[0].id));
  const dragonPungs = pungs.filter((meld) => DRAGONS.includes(meld.tiles[0].id));
  const concealedPungs = pungs.filter((meld) => meld.concealed);
  const groups = [...state.melds, { tiles: pair ? [pair] : [] }];

  if (windPungs.length === 4) found.push(fan("bigFourWinds", "四个风刻"));
  if (dragonPungs.length === 3) found.push(fan("bigThreeDragons", "三个箭刻"));
  if (tiles.length && tiles.every((tile) => GREEN.has(tile.id))) found.push(fan("allGreen", "仅由绿牌组成"));
  if (isNineGates(state)) found.push(fan("nineGates", "一门清九莲"));
  if (kongs.length === 4) found.push(fan("fourKongs", "四个杠"));
  if (tiles.length && tiles.every(isTerminal)) found.push(fan("allTerminals", "全部是幺九牌"));
  if (windPungs.length === 3 && pair && WINDS.includes(pair.id)) found.push(fan("littleFourWinds", "三风刻带风将"));
  if (dragonPungs.length === 2 && pair && DRAGONS.includes(pair.id)) found.push(fan("littleThreeDragons", "双箭刻带箭将"));
  if (tiles.length && tiles.every((tile) => tile.honor)) found.push(fan("allHonors", "全部是字牌"));
  if (concealedPungs.length === 4 && !exposed) found.push(fan("fourConcealedPungs", "四个暗刻"));
  if (isPureTerminalChows(state)) found.push(fan("pureTerminalChows", "同色两组老少副，将为五"));
  if (sameChowCount(chows, 4)) found.push(fan("quadrupleChow", "四副相同顺子"));
  if (groupedRanks(pungs.map((meld) => meld.tiles[0]), 4, [1])) found.push(fan("fourPureShiftedPungs", "同色四副递进刻子"));
  if (groupedRanks(chows.map((meld) => meld.tiles[0]), 4, [1, 2])) found.push(fan("fourShiftedChows", "同色四步高"));
  if (kongs.length === 3) found.push(fan("threeKongs", "三个杠"));
  if (tiles.length && tiles.every((tile) => tile.honor || isTerminal(tile)) && tiles.some((tile) => tile.honor) && tiles.some(isTerminal)) found.push(fan("allTerminalsAndHonors", "幺九牌与字牌"));
  if (pungs.length === 4 && pungs.every((meld) => !meld.tiles[0].honor && meld.tiles[0].rank % 2 === 0) && pair && !pair.honor && pair.rank % 2 === 0) found.push(fan("allEvenPungs", "偶数刻子"));
  if (numbers.length === tiles.length && suits.size === 1) found.push(fan("fullFlush", "一门花色"));
  if (sameChowCount(chows, 3)) found.push(fan("pureTripleChow", "三副相同顺子"));
  if (groupedRanks(pungs.map((meld) => meld.tiles[0]), 3, [1])) found.push(fan("pureShiftedPungs", "同色三节高"));
  if (rankBand(numbers, tiles, [7, 3, 9])) found.push(fan("upperFour", "全部是 7、3、9"));
  if (rankBand(numbers, tiles, [4, 5, 2])) found.push(fan("middleTiles", "全部是 4、5、2"));
  if (rankBand(numbers, tiles, [1, 2, 3])) found.push(fan("lowerFour", "全部是 1、2、3"));
  if (rankBand(numbers, tiles, [2, 7, 3, 9])) found.push(fan("upperTiles", "全部大于五"));
  if (rankBand(numbers, tiles, [1, 2, 3, 4])) found.push(fan("lowerTiles", "全部小于五"));
  if (hasStraight(chows)) found.push(fan("pureStraight", "同色 43452739"));
  if (isThreeSuitTerminalChows(state)) found.push(fan("threeSuitTerminalChows", "两色老少副，将为另一色五"));
  if (groupedRanks(chows.map((meld) => meld.tiles[0]), 3, [1, 2])) found.push(fan("pureShiftedChows", "同色三步高"));
  if (groups.every((group) => group.tiles.some((tile) => tile.rank === 5))) found.push(fan("allFives", "每组都带五"));
  if ([...byRankSuits(pungs.map((meld) => meld.tiles[0])).values()].some((set) => set.size === 3)) found.push(fan("triplePung", "三色同点刻"));
  if (concealedPungs.length === 3) found.push(fan("threeConcealedPungs", "三个暗刻"));
  if (windPungs.length === 3) found.push(fan("bigThreeWinds", "三个风刻"));
  if (isMixedStraight(chows)) found.push(fan("mixedStraight", "三色成龙"));
  if (tiles.length && tiles.every((tile) => REVERSIBLE.has(tile.id))) found.push(fan("reversible", "全部可倒置"));
  if ([...byRankSuits(chows.map((meld) => meld.tiles[0])).values()].some((set) => set.size === 3)) found.push(fan("mixedTripleChow", "三色同顺"));
  if (mixedStep(pungs.map((meld) => meld.tiles[0]), [1])) found.push(fan("mixedShiftedPungs", "三色递进刻"));
  if (pungs.length === 4) found.push(fan("allPungs", "四副刻子"));
  if (suits.size === 1 && tiles.some((tile) => tile.honor) && tiles.some((tile) => !tile.honor)) found.push(fan("halfFlush", "一门花色加字牌"));
  if (mixedStep(chows.map((meld) => meld.tiles[0]), [1, 2])) found.push(fan("mixedShiftedChows", "三色三步高"));
  if (suits.size === 3 && tiles.some((tile) => WINDS.includes(tile.id)) && tiles.some((tile) => DRAGONS.includes(tile.id))) found.push(fan("allTypes", "三色、风、箭齐全"));
  if (hand.winType === "discard" && state.sets.length === 4 && state.sets.every((meld) => !meld.concealed) && hand.singleWait) found.push(fan("meldedHand", "四副明面子，单钓点和"));
  const concealedKongs = kongs.filter((meld) => meld.concealed).length;
  const meldedKongs = kongs.length - concealedKongs;
  if (concealedKongs === 2) found.push(fan("twoConcealedKongs", "两个暗杠"));
  if (dragonPungs.length === 2) found.push(fan("twoDragonPungs", "两个箭刻"));
  if (groups.every((group) => group.tiles.some((tile) => tile.honor || isTerminal(tile)))) found.push(fan("outsideHand", "每组带幺九或字"));
  if (!exposed && hand.winType === "self") found.push(fan("fullyConcealed", "门清自摸"));
  if (meldedKongs === 2) found.push(fan("twoMeldedKongs", "两个明杠"));
  if (hand.lastOfKind) found.push(fan("lastOfKind", "和绝张"));
  if (dragonPungs.length === 1) found.push(fan("dragonPung", "一个箭刻"));
  if (pungs.some((meld) => meld.tiles[0].id === windId(hand.roundWind))) found.push(fan("prevalentWind", "圈风刻"));
  if (pungs.some((meld) => meld.tiles[0].id === windId(hand.seatWind))) found.push(fan("seatWind", "门风刻"));
  if (!exposed && hand.winType === "discard") found.push(fan("concealedHand", "没有明副露"));
  if (isAllChows(hand, state)) found.push(fan("allChows", "四顺子，非役将，两面听"));
  for (const [id, count] of counts) if (count === 4 && !kongs.some((meld) => meld.tiles[0].id === id)) found.push(fan("tileHog", `${id} 四张未开杠`));
  const doublePungs = [...byRankSuits(pungs.map((meld) => meld.tiles[0])).values()].filter((set) => set.size === 2).length;
  if (doublePungs) found.push(fan("doublePung", "两色同点刻", doublePungs));
  if (concealedPungs.length === 2) found.push(fan("twoConcealedPungs", "两个暗刻"));
  if (concealedKongs === 1) found.push(fan("concealedKong", "一个暗杠"));
  if (tiles.length && tiles.every(isSimple)) found.push(fan("allSimples", "没有幺九和字牌"));
  const pureDoubles = countPureDoubleChows(chows);
  if (pureDoubles) found.push(fan("pureDoubleChow", "同色相同顺子", pureDoubles));
  const mixedDoubles = countMixedDoubleChows(chows);
  if (mixedDoubles) found.push(fan("mixedDoubleChow", "两色相同顺子", mixedDoubles));
  const shorts = countShortStraights(chows);
  if (shorts) found.push(fan("shortStraight", "六连张", shorts));
  const terminals = countTerminalChows(chows);
  if (terminals) found.push(fan("twoTerminalChows", "老少副", terminals));
  const terminalPungs = pungs.filter((meld) => meld.tiles[0].honor || isTerminal(meld.tiles[0])).length;
  if (terminalPungs) found.push(fan("pungTerminals", "幺九刻", terminalPungs));
  if (meldedKongs === 1) found.push(fan("meldedKong", "一个明杠"));
  if (suits.size === 2) found.push(fan("oneVoidedSuit", "缺一门花色"));
  if (numbers.length === tiles.length && tiles.length) found.push(fan("noHonors", "没有字牌"));
  if (hand.edgeWait) found.push(fan("edgeWait", "边张听"));
  if (hand.closedWait) found.push(fan("closedWait", "坎张听"));
  if (hand.singleWait) found.push(fan("singleWait", "单钓将"));
  if (hand.winType === "self") found.push(fan("selfDrawn", "自摸"));
  return found;
}

function pairPatternFans(pairTiles) {
  const found = [];
  const numbers = pairTiles.filter((tile) => !tile.honor);
  const suits = new Set(numbers.map((tile) => tile.suit));
  if (numbers.length === pairTiles.length && suits.size === 1) found.push(fan("fullFlush", "七对清一色"));
  if (numbers.length === pairTiles.length) found.push(fan("noHonors", "没有字牌"));
  if (numbers.length && suits.size === 1 && pairTiles.some((tile) => tile.honor)) found.push(fan("halfFlush", "七对混一色"));
  if (pairTiles.every((tile) => tile.honor)) found.push(fan("allHonors", "七对字一色"));
  if (pairTiles.every(isTerminal)) found.push(fan("allTerminals", "七对清幺九"));
  if (pairTiles.every(isSimple)) found.push(fan("allSimples", "七对断幺"));
  for (const [id, count] of countsOf(pairTiles)) if (count === 2) found.push(fan("tileHog", `${id} 四张组成两对`));
  return found;
}

function specialFans(hand, state) {
  const found = [];
  const tiles = state.tiles.length ? state.tiles : hand.loose;
  if (isThirteenOrphans(tiles)) found.push(fan("thirteenOrphans", "十三种幺九字各一，其中一张成对"));
  if (isGreaterKnitted(tiles)) found.push(fan("greaterKnitted", "七字齐全的全不靠"));
  else if (isLesserKnitted(tiles)) found.push(fan("lesserKnitted", "三色不靠的十四张单张"));
  if (state.pairs.length === 7 && !state.standard) {
    const pairTiles = state.pairs.map((id) => tiles.find((tile) => tile.id === id)).filter(Boolean);
    const numbers = pairTiles.filter((tile) => !tile.honor);
    if (numbers.length === 7 && new Set(numbers.map((tile) => tile.suit)).size === 1 && shifted(numbers.map((tile) => tile.rank), 1)) found.push(fan("sevenShiftedPairs", "同色连续七对"));
    found.push(fan("sevenPairs", "七个对子"));
    found.push(...pairPatternFans(pairTiles));
  }
  if (findKnittedStraight(state)) found.push(fan("knittedStraight", "147、253、329 组合龙"));
  return found;
}

function supplementFans(hand, state) {
  const found = [];
  const meld = state.sets[0];
  if (meld && isPungLike(meld)) {
    const id = meld.tiles[0].id;
    if (DRAGONS.includes(id)) found.push(fan("dragonPung", "组合龙外的箭刻"));
    if (id === windId(hand.roundWind)) found.push(fan("prevalentWind", "圈风刻"));
    if (id === windId(hand.seatWind)) found.push(fan("seatWind", "门风刻"));
    if (meld.tiles[0].honor || isTerminal(meld.tiles[0])) found.push(fan("pungTerminals", "幺九刻"));
  }
  if (meld && meld.type === "kong" && meld.concealed) found.push(fan("concealedKong", "暗杠"));
  if (meld && meld.type === "kong" && !meld.concealed) found.push(fan("meldedKong", "明杠"));
  if (!state.exposed && hand.winType === "self") found.push(fan("fullyConcealed", "门清自摸"));
  else if (!state.exposed && hand.winType === "discard") found.push(fan("concealedHand", "没有明副露"));
  if (hand.winType === "self") found.push(fan("selfDrawn", "自摸"));
  if (hand.edgeWait) found.push(fan("edgeWait", "边张听"));
  if (hand.closedWait) found.push(fan("closedWait", "坎张听"));
  if (hand.singleWait) found.push(fan("singleWait", "单钓将"));
  return found;
}

function situationFans(hand) {
  const found = [];
  if (hand.lastTile && hand.winType === "self") found.push(fan("lastTileDraw", "牌墙最后一张自摸"));
  if (hand.lastTile && hand.winType === "discard") found.push(fan("lastTileClaim", "最后一张牌点和"));
  if (hand.kongDraw && hand.winType === "self") found.push(fan("outWithReplacement", "杠后补牌成和"));
  if (hand.kongDraw && hand.winType === "discard") found.push(fan("robbingKong", "抢补杠"));
  if (hand.flowers > 0) found.push(fan("flower", `补花 ${hand.flowers} 张`, hand.flowers));
  return found;
}

function dedupe(found) {
  const map = new Map();
  for (const item of found) {
    const prev = map.get(item.id);
    if (!prev || item.value > prev.value) map.set(item.id, item);
  }
  return [...map.values()];
}

function applyExclusions(found) {
  const kept = [];
  const excluded = [];
  const blocked = new Set();
  const ordered = [...found].sort((a, b) => b.value - a.value || a.name.localeCompare(b.name, "zh"));
  for (const item of ordered) {
    if (blocked.has(item.id)) excluded.push(item);
    else {
      kept.push(item);
      for (const id of EXCLUDE[item.id] || []) blocked.add(id);
    }
  }
  return { kept, excluded };
}

function validate(hand, state) {
  if (hand.flowers < 0 || hand.flowers > 3) return ["花牌只能是 0 到 3 张。"];
  const tiles = state.tiles.length ? state.tiles : hand.loose;
  if (hand.special === "thirteen-orphans") return isThirteenOrphans(tiles) ? [] : ["十三幺需要 13 种幺九、字牌各一张，再加其中一张。"];
  if (hand.special === "knitted-honors") return isGreaterKnitted(tiles) || isLesserKnitted(tiles) ? [] : ["全不靠需要 14 张互不相同、按 147/253/329 分配的牌。"];
  if (hand.special === "seven-pairs") return state.pairs.length === 7 ? [] : ["七对需要正好 7 个对子。"];
  if (hand.special === "knitted-straight") {
    if (!findKnittedStraight(state)) return ["组合龙需要 147、253、329 分占三门。请把这 9 张放入特殊散牌，另加 1 个面子和 1 个对子。"];
    return [];
  }
  if (state.pairs.length === 7 || isThirteenOrphans(tiles) || isGreaterKnitted(tiles) || isLesserKnitted(tiles) || findKnittedStraight(state)) return [];
  if (state.melds.filter((meld) => meld.type === "pair").length > 1 && hand.special !== "seven-pairs") return ["标准和牌只能有 1 个对子。七对请在特殊牌型中选择。"];
  if (!state.standard) return ["标准和牌需要 4 个面子加 1 个对子。杠子按 4 张计。"];
  return [];
}

export function scoreHand(hand) {
  const state = analyze(hand);
  const errors = validate(hand, state);
  if (errors.length) return { errors, fans: [], excluded: [], total: 0, qualified: false };
  let found = [...specialFans(hand, state), ...situationFans(hand)];
  if (state.standard) found = [...found, ...standardFans(hand, state)];
  else if (findKnittedStraight(state)) found = [...found, ...supplementFans(hand, state)];
  found = dedupe(found);
  const { kept, excluded } = applyExclusions(found.filter((item) => item.value > 0));
  if (kept.reduce((sum, item) => sum + item.value, 0) === 0) kept.push(fan("chicken", "和牌但没有任何番"));
  const total = kept.reduce((sum, item) => sum + item.value, 0);
  return { errors: [], fans: kept, excluded, total, qualified: total >= 3 };
}

export function createEmptyHand() {
  return {
    melds: [],
    loose: [],
    pair: null,
    winningTile: null,
    flowers: 0,
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
  };
}
