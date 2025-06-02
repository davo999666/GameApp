import {
    AverageCloud, BigCloud,
    GiganticCloud,
    HugeCloud,
    LargeCloud,
    MediumCloud,
    SmallCloud,
    TinyCloud
} from "../classes/cloudClass.js";

export function createCloud(x, y, word) {
    const len = word.length;
    if(len <= 2) return  new TinyCloud(x,y,word);
    if (len <= 4) return new SmallCloud(x, y, word);
    if (len <= 6) return new MediumCloud(x, y, word);
    if (len <= 8) return new AverageCloud(x, y, word);
    if (len <= 10) return new LargeCloud(x, y, word);
    if(len <= 12) return new BigCloud(x, y, word);
    if (len <= 14) return new HugeCloud(x, y, word);
    return new GiganticCloud(x, y, word);
}

export function rectCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}
export function createChangeChecker() {
    let lastValue = null;

    return function (newValue) {
        const changed = newValue !== lastValue;
        lastValue = newValue;
        return changed;
    };
}
