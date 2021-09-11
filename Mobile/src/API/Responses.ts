export interface Material {
	points: number;
	occurences: number;
}

export interface Materials {
	plastic: Material | null;
	paper: Material | null;
	metal: Material | null;
	cardboard: Material | null;
	organic: Material | null;
	glass: Material | null;
	waste: Material | null;
}

export interface Stat {
	total: number;
	materials: Materials;
}

export interface Stats {
	week: Stat;
	month: Stat;
	year: Stat;
	allTime: Stat;
}

export interface LeaderboardUser {
	name: string;
	totalPoints: number;
	materials: Materials;
}

export type MaterialType = keyof Materials;

export interface Boundings {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	conf: number;
	material: MaterialType;
}

export interface Submission {
	total: number;
	breakdown: Materials;
	boundings: Boundings[];
}
