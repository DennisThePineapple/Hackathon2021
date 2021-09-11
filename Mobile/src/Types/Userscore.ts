import Material from "./Material";

type Userscore = {
    [id : string] : {
        materials: {
            paper?: Material,
            metal?: Material,
            cardboard?: Material,
            glass?: Material,
            plastic?: Material,
            organic?: Material,
        },
        total: number
    }
};

export default Userscore;