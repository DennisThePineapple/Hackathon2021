
import Userscore from "../Types/Userscore";

const recyclable = ["paper", "metal", "cardboard", "glass"]
const waster = ["plastic", "organic", "waste"]

export function getWastePoints(userScore : Userscore) {
    let points = 0;
    if (userScore.materials.glass){
        points += userScore.materials.glass.points;
    }
    if (userScore.materials.metal){
        points += userScore.materials.metal.points;
    }
    if (userScore.materials.cardboard){
        points += userScore.materials.cardboard.points;
    }
    if (userScore.materials.paper){
        points += userScore.materials.paper.points;
    }
    return points;
}

export function getRecPoints(userScore : Userscore) {
    return userScore.total - getWastePoints(userScore);
}
