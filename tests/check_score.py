from pathlib import Path

text = Path("src/score.js").read_text(encoding="utf-8")
assert "function scoreHand" in text
assert "大四喜" in text and "花牌" in text
assert text.count("function ") > 20

fans = Path("src/fans.js").read_text(encoding="utf-8")
names = [line.split('"')[3] for line in fans.splitlines() if line.strip().startswith("[")]
assert len(names) == 81, len(names)
assert len(set(names)) == 81

html = Path("index.html").read_text(encoding="utf-8")
for token in ["flowers", "calcBtn", "src/main.js"]:
    assert token in html
print("static checks ok", len(names))
