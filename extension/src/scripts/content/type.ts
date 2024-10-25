type trackdata = {
	title: string;
	artist: string;
	url: string;
	bpm: number;
	levelEasy: number;
	levelNormal: number;
	levelHard: number;
	id: string;
};
type playstatus = {
	difficulty: number;
	bestScore: number;
	isComplete: boolean;
	isPerfect: boolean;
	createdAt: string;
	updatedAt: string;
	track: trackdata;
};
export type track = {
	track: trackdata;
	playStatuses: playstatus[];
};

export type apires = { tracks: track[] };
