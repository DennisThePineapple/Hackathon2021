import Material from "./Material";
import MaterialBox from "./MaterialBox";

type ImageSummaryData = {
    material_score_breakdown:{
        paper?: Material,
        metal?: Material,
        cardboard?: Material,
        glass?: Material,
        plastic?: Material,
        organic?: Material,
    },
    total_points: number,
    material_box_coordinates: MaterialBox[]
}

export default ImageSummaryData