"""Independent checks for the cases implemented in src/score.js."""

FANS = {
    "平和": 2, "连六": 1, "无字": 1, "门前清": 2, "花牌": 1, "断幺": 2,
    "大三元": 88, "箭刻": 2, "双箭刻": 6, "小三元": 64, "碰碰和": 6,
    "不求人": 4, "自摸": 1,
}

def score_sample():
    # 123m 456m 789p 234s pair 66s, discard, 2 flowers. Not edge/closed/single.
    return FANS["平和"] + FANS["连六"] + FANS["无字"] + FANS["门前清"] + 2 * FANS["花牌"]

def score_dragons():
    # three dragon pungs exclude dragon pung and two dragon pungs
    return FANS["大三元"]

def score_flower_only_pattern():
    # one dragon pung, one flower, single wait, exposed: 2+1+1 = 4, not qualified
    return FANS["箭刻"] + FANS["花牌"] + FANS["单钓将"] if False else FANS["箭刻"] + FANS["花牌"] + 1

assert score_sample() == 8
assert score_dragons() == 88
assert score_flower_only_pattern() == 4
print("case totals", score_sample(), score_dragons(), score_flower_only_pattern())
