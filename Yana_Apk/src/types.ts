// Types de langues pour le parcours initial (onboarding)
export type Language =
  | 'fr' | 'en' | 'de' | 'ar' | 'ja' | 'ko' | 'es' // Interface languages
  | 'wolof' | 'serer' | 'diola' | 'pulaar' | 'soninke'
  | 'manjak' | 'balante' | 'mankagne' | 'mandinka' | 'bainouk' | 'bassari' | 'hassaniya'
  | 'saafi_saafi' | 'menik'; // Langues africaines

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'native';

export enum ExerciseType {
  CHOOSE_IMAGE = 'CHOOSE_IMAGE',
  CHOOSE_TRANSLATION = 'CHOOSE_TRANSLATION',
  LISTEN_AND_ORDER = 'LISTEN_AND_ORDER',
  TRANSLATE_AND_ORDER = 'TRANSLATE_AND_ORDER',
  SPEAK = 'SPEAK',
  LISTEN_AND_CHOICE = 'LISTEN_AND_CHOICE',
  CULTURAL_NOTE = 'CULTURAL_NOTE',
  STORY_DIALOGUE = 'STORY_DIALOGUE',
  FLASHCARD = 'FLASHCARD',
  MATCH_PAIRS = 'MATCH_PAIRS',
  FILL_BLANKS = 'FILL_BLANKS',
  IDENTIFY_SOUND = 'IDENTIFY_SOUND'
}

export type AvatarType = 'bayo' | 'pere' | 'mere' | 'grand-pere' | 'grand-mere' | 'fille' | 'garcon' | 'fils' | 'sage' | 'mythic' | 'faux_lion' | 'hyene' | 'lievre' | 'ecureuil';

export type BayoEmotion =
  | 'happy' | 'excited' | 'thinking' | 'sad' | 'motivated'
  | 'greeting' | 'crying' | 'skeptical' | 'taking_note';

export type BayoSize = 'sm' | 'md' | 'lg' | 'xl';

export interface LessonStep {
  text: string;
  translation?: string;
  wolof?: string;
  audioUrl?: string;
  emotion: BayoEmotion;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  content: string;
  options?: string[];
  correctAnswer: string | string[];
  audioUrl?: string;
  image?: string;
  culturalNote?: string;
  translation?: string;
  images?: any[];
  avatar?: AvatarType;
  explanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  lessonKey?: string;
  isCompleted: boolean;
  exercises: Exercise[];
  lessonSteps?: LessonStep[];
  isStory?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface Unit {
  id: number;
  title: string;
  theme: string;
  themeName: string;
  themeSub: string;
  chapters: Chapter[];
}

export type PlanType = 'freemium' | 'student' | 'premium' | 'family';

export interface LanguageProgression {
  completedLessons: string[];
  completedUnits: number[];
  lessonScores: Record<string, number>;
}

export interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  xp: number;
  streak: number;
  hearts: number;
  level: number;
  levelLabel: string;
  completedLessons: string[];
  completedUnits: number[];
  completedStories: string[];
  currentLanguage: string; // Langue africaine apprise
  interfaceLanguage: 'fr' | 'en' | 'de' | 'ar' | 'ja' | 'ko' | 'es'; // Langue d'interface/traduction
  musicEnabled: boolean;
  musicVolume: number;
  soundEnabled: boolean;
  onboardingFinished: boolean;
  motivations: string[];
  dailyGoal: number;
  age: string;
  experienceLevel: string;
  user_plan: PlanType;
  studentCardVerified: boolean;
  lessonScores: Record<string, number>;
  offlineExercises: Record<string, Exercise[]>;
  tutorId?: string; // ID du tuteur sélectionné
  completedTutorSessions: number; // Compteur des cours terminés avec un tuteur
  avatar?: string;
  scheduledSessions: Array<{
    id: string;
    date: string;
    topic: string;
  }>;
  languageProgressions?: Record<string, LanguageProgression>;
  shells?: number;
  wisdomHonors?: number;
  treasures?: string[];
  dailyGoals?: {
    lastReset: string;
    objectives: Array<{
      id: string;
      label: string;
      current: number;
      target: number;
      reward: number;
      type: 'PERFECT_LESSON' | 'EXERCISES_COMPLETED' | 'XP_GAINED';
      isClaimed: boolean;
    }>;
  };
}

export interface LanguageInfo {
  id: string;
  name: string;
  flag: string;
  description: string;
  image: any;
  variants?: string[];
  isAvailable?: boolean;
}

export interface PostComment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  time: string;
}

export interface Post {
  id: string;
  user: string;
  avatar: string;
  level: string;
  time: string;
  content: string;
  likes: number;
  comments: PostComment[];
  hasAudio?: boolean;
}
