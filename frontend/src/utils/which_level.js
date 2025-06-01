import {sentencesA1} from "../server/sentencesA1.js";
import {sentencesA2} from "../server/sentencesA2.js";
import {sentencesB1} from "../server/sentencesB1.js";
import {sentencesB2} from "../server/sentencesB2.js";


export const getLevelWord = (value) => {
    if (value === "A1") return getRandomSentence(sentencesA1);
    if (value === "A2") return getRandomSentence(sentencesA2);
    if (value === "B1") return getRandomSentence(sentencesB1);
    if (value === "B2") return getRandomSentence(sentencesB2);
    return null;
};

function getRandomSentence(sentenceObject) {
    const entries = Object.entries(sentenceObject);
    if (entries.length === 0) return { key: null, value: "" };

    const randomEntry = entries[Math.floor(Math.random() * entries.length)];
    return { key: randomEntry[0], value: randomEntry[1] };
}