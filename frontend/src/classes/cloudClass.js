import {cloudImages} from "../utils/images_clouds.js";
class CloudBase {
    constructor(x, y, word, image, width, height) {
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.word = word;
        this.image = image;
        this.originalWidth = width;
        this.originalHeight = height;
        this.width = width;
        this.height = height;
        this.centerX = this.x + this.width / 2;
        this.centerY = this.y + this.height / 2;
        this.speed = 0.2

    };
    moveCloud(gameWidth){
        this.y += this.speed
        if(this.x + this.width > gameWidth){
            this.x -= 1
        }else if(this.x <= -5){
            this.x += 1
        }
    };
    collision(target) {
        if(this === target) return;
        const overlapX = this.x < target.x + target.width && this.x + this.width > target.x;
        const overlapY = this.y < target.y + target.height && this.y + this.height > target.y;
                const isColliding = overlapX && overlapY;
                if (isColliding) {
                    const cloudCenterX = this.centerX;
                    const cloudCenterY = this.centerY;
                    const targetCenterX = target.centerX;
                    const targetCenterY = target.centerY;
                    if (cloudCenterX < targetCenterX) {
                        this.x -= 3;
                    } else {
                        this.x += 3;
                    }
                    if (cloudCenterY < targetCenterY) {
                        this.y += 1;
                    } else {
                        this.y -= 1;
                    }
                }
            };
    changeSize(gameWidth, gameHeight) {
        const x = this.originalWidth * (gameWidth || 1280) / 1280;
        const y = this.originalHeight  * (gameHeight || 720) / 720;
        this.width = Math.floor(x);
        this.height = Math.floor(y);
    }
}

export class TinyCloud extends CloudBase {
    constructor(x, y, word) {
        super(x, y, word, cloudImages('tiny'), 70, 30);
        this.type = 'tiny';
    }

}

export class SmallCloud extends CloudBase {
    constructor(x, y, word) {
        super(x, y, word, cloudImages('small'), 80, 35);
        this.type = 'small';
    }
}

export class MediumCloud extends CloudBase {
    constructor(x, y, word) {
        super(x, y, word, cloudImages('medium'), 95, 40);
        this.type = 'medium';
    }
}
export class AverageCloud extends CloudBase {
    constructor(x, y, word) {
        super(x, y, word, cloudImages('average'), 130, 45);
        this.type = 'average';
    }
}

export class LargeCloud extends CloudBase {
    constructor(x, y, word) {
        super(x, y, word, cloudImages('large'), 150, 50);
        this.type = 'large';
    }
}

export class BigCloud extends CloudBase {
    constructor(x, y, word) {
        super(x, y, word, cloudImages('big'), 175, 55);
        this.type = 'big';
    }
}

export class HugeCloud extends CloudBase {
    constructor(x, y, word) {
        super(x, y, word, cloudImages('huge'), 200, 60);
        this.type = 'huge';
    }
}
export class GiganticCloud extends CloudBase {
    constructor(x, y, word) {
        super(x, y, word, cloudImages('gigantic'), 220, 65);
        this.type = 'gigantic';
    }
}
