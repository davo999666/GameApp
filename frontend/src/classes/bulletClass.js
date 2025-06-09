import bulletImage from '../assets/images/bullet/bullet.png';

export class BulletClass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = bulletImage;
        this.speed = 10;
        this.width = 10
        this.height = 20
    }

    moveBullet() {
        this.y -= this.speed;
    }
}