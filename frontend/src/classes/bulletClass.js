import bulletImage from '../assets/images/bullet/bullet.png';

export class BulletClass {
    constructor(x, y, gameWidth) {
        this.x = x
        this.y = y;
        this.image = bulletImage;
        this.speed = 10;
        this.originalWidth = 20
        this.width = this.originalWidth * (gameWidth || 1280) / 1280

    }

    moveBullet() {
        this.y -= this.speed;
    }
}