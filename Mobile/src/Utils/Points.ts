
import Userscores from "../Types/Userscores";
import Materials from "../Types/Materials";
import Userscore from "../Types/Userscore";

const recyclable = ["paper", "metal", "cardboard", "glass"]
const waster = ["plastic", "organic", "waste"]

export function getWastePoints(materials : Materials) {
    let points = 0;
    if (materials.glass){
        points += materials.glass.points;
    }
    if (materials.metal){
        points += materials.metal.points;
    }
    if (materials.cardboard){
        points += materials.cardboard.points;
    }
    if (materials.paper){
        points += materials.paper.points;
    }
    return points;
}

export function getRecPoints(userScore : Userscore) {
    return userScore[1].total - getWastePoints(userScore[1].materials);
}
