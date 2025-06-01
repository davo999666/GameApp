import cloudImage11 from "../assets/images/cloud/clouds11.png";
import cloudImage12 from "../assets/images/cloud/clouds12.png";
import cloudImage13 from "../assets/images/cloud/clouds13.png";
import cloudImage21 from "../assets/images/cloud/clouds21.png";
import cloudImage22 from "../assets/images/cloud/clouds22.png";
import cloudImage23 from "../assets/images/cloud/clouds23.png";
import cloudImage31 from "../assets/images/cloud/clouds31.png";
import cloudImage32 from "../assets/images/cloud/clouds32.png";
import cloudImage33 from "../assets/images/cloud/clouds33.png";
import cloudImage34 from "../assets/images/cloud/clouds34.png";
import cloudImage41 from "../assets/images/cloud/clouds41.png";
import cloudImage42 from "../assets/images/cloud/clouds42.png";
import cloudImage43 from "../assets/images/cloud/clouds43.png";
import cloudImage51 from "../assets/images/cloud/clouds51.png";
import cloudImage52 from "../assets/images/cloud/clouds52.png";
import cloudImage53 from "../assets/images/cloud/clouds53.png";
const small = [cloudImage11, cloudImage12, cloudImage13]
const medium = [cloudImage21, cloudImage22, cloudImage23]
const large = [cloudImage31, cloudImage32, cloudImage33, cloudImage34]
const big = [cloudImage41,cloudImage42,cloudImage43,]
const huge = [cloudImage51, cloudImage52, cloudImage53]



export const cloudImages = (type) => {
    if (type === 'small') {
        const index = Math.floor(Math.random() * small.length);
        return small[index];
    } else if (type === 'medium') {
        const index = Math.floor(Math.random() * medium.length);
        return medium[index];
    } else if (type === 'large') {
        const index = Math.floor(Math.random() * large.length);
        return large[index];
    } else if (type === 'big') {
        const index = Math.floor(Math.random() * big.length);
        return big[index];
    } else if (type === 'huge') {
        const index = Math.floor(Math.random() * huge.length);
        return huge[index];
    }
};