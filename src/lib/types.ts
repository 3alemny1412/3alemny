export type LessonPreview = {
  id: string;
  term: string;
  plain_def: string;
  prerequisites: string[];
};

export type LessonsFile = {
  unlock_order: string[];
  lessons: LessonPreview[];
};

export type PlacementBand = {
  id: string;
  min: number;
  max: number;
  label: string;
  unlock: string[] | "all";
  message: string;
};

export type PlacementQuestion = {
  id: string;
  track: "core" | "slang";
  q: string;
  choices: string[];
  answer_index: number;
};

export type PlacementQuizFile = {
  id: string;
  bands: PlacementBand[];
  questions: PlacementQuestion[];
};
