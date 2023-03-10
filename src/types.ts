export interface anilistState {
  response: string;
}

export type AnilistQueryBody = {
  token: string;
  manga_id: string;
  manga_status: string;
  scoreRaw?: number; //raw score is 0-100, so multiply the MD score by 10 before submitting
};

export interface StatusDictionary {
  [mangadexStatus: string]: string;
}

export const anilistStatuses: StatusDictionary = {
  reading: "CURRENT",
  completed: "COMPLETED",
  plan_to_read: "PLANNING",
  dropped: "DROPPED",
  on_hold: "PAUSED",
};

export type mangadexState = {
  token: string;
  currentMangaId: string;
  response: string;
  follows: FollowsList;
  scores: ScoresList;
};

export type LoginBody = {
  username: string;
  password: string;
};

export type FollowsList = {
  result: string;
  statuses: {
    [id: string]: string;
  };
};

export type ScoreBody = {
  token: string,
  follows: string[],
}

export type ScoresList = {
  result: string;
  ratings: {
    [id: string]: {
      rating: number;
      createdAt?: Date;
    };
  };
};
