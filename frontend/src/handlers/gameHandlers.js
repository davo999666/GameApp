import {BulletClass} from "../classes/bulletClass.js";

export const handleMouseMove = (event, gameRef, imgRef, marginPercent, setPositionX) => {
    if (!gameRef.current || !imgRef.current) return;
    const bounds = gameRef.current.getBoundingClientRect();
    const mouseX = event.clientX - bounds.left;

    const fighterWidth = imgRef.current.clientWidth;
    const margin = bounds.width * marginPercent;

    const clampedX = Math.max(
        margin + fighterWidth / 2,
        Math.min(mouseX, bounds.width - margin - fighterWidth / 2)
    );
    setPositionX(clampedX);
};

export const handleClick = (event, positionX, bulletY, gameWidth) => {
    event.preventDefault();
    return new BulletClass (positionX, bulletY, gameWidth);
};
