import {cloudImages} from "../utils/images_clouds.js";
class CloudBase {
    constructor(x, y, word, image, width, height) {
        this.x = x;
        this.y = y;
        this.word = word;
        this.image = image;
        this.width = +width;
        this.height = +height;
        this.centerX = this.x + this.width / 2;
        this.centerY = this.y + this.height / 2;
        this.speed = 0.2

    }

    toObject() {
        return {
            x: this.x,
            y: this.y,
            word: this.word,
            image: this.image,
            width: this.width,
            height: this.height,
            centerX: this.centerX,
            centerY: this.centerY,
            speed: this.speed
        };

}}

export class TinyCloud extends CloudBase {
    constructor(x, y, word) {
        super(x, y, word, cloudImages('tiny'), 70, 30);
    }
}

export class SmallCloud extends CloudBase {
    constructor(x, y, word) {
        super(x, y, word, cloudImages('small'), 80, 35);
    }
}

export class MediumCloud extends CloudBase {
    constructor(x, y, word) {
        super(x, y, word, cloudImages('medium'), 95, 40);
    }
}
export class AverageCloud extends CloudBase {
    constructor(x, y, word) {
        super(x, y, word, cloudImages('average'), 120, 45);
    }
}

export class LargeCloud extends CloudBase {
    constructor(x, y, word) {
        super(x, y, word, cloudImages('large'), 140, 50);
    }
}

export class BigCloud extends CloudBase {
    constructor(x, y, word) {
        super(x, y, word, cloudImages('big'), 160, 55);
    }
}

export class HugeCloud extends CloudBase {
    constructor(x, y, word) {
        super(x, y, word, cloudImages('huge'), 180, 60);
    }
}
export class GiganticCloud extends CloudBase {
    constructor(x, y, word) {
        super(x, y, word, cloudImages('gigantic'), 200, 65);
    }
}
