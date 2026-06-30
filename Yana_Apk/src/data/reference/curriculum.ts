import { UNIT_1_STATIC_DATA } from './units/unit1';
import { UNIT_2_STATIC_DATA } from './units/unit2';
import { UNIT_3_STATIC_DATA } from './units/unit3';
import { UNIT_4_STATIC_DATA } from './units/unit4';
import { UNIT_5_STATIC_DATA } from './units/unit5';
import { UNIT_6_STATIC_DATA } from './units/unit6';
import { UNIT_7_STATIC_DATA } from './units/unit7';
import { Unit, Lesson, Chapter } from '../../types';
import { TranslationKey } from '../../translations';

const STATIC_DATA_MAP: Record<number, any> = {
  1: UNIT_1_STATIC_DATA,
  2: UNIT_2_STATIC_DATA,
  3: UNIT_3_STATIC_DATA,
  4: UNIT_4_STATIC_DATA,
  5: UNIT_5_STATIC_DATA,
  6: UNIT_6_STATIC_DATA,
  7: UNIT_7_STATIC_DATA,
};

// Helper to check backward compatibility for lesson completion
export const isLessonCompletedHelper = (
  completedLessons: string[],
  level: string,
  moduleNum: number,
  chapterNum: number,
  lessonNum: number,
  isStory: boolean = false
): boolean => {
  const newId = isStory 
    ? `${level}_m${moduleNum}_c${chapterNum}_story`
    : `${level}_m${moduleNum}_c${chapterNum}_l${lessonNum}`;

  if (completedLessons.includes(newId)) return true;

  // Backward compatibility: map u{X}-l{Y} to beginner_m1_c{X}_l{Y}
  if (level === 'beginner' && moduleNum === 1 && chapterNum <= 7) {
    const oldId = isStory ? `u${chapterNum}-story` : `u${chapterNum}-l${lessonNum}`;
    if (completedLessons.includes(oldId)) return true;
  }

  return false;
};

export const generateCurriculum = (
  level: 'beginner' | 'intermediate' | 'advanced',
  t: (key: TranslationKey) => string,
  currentLanguage: string,
  completedLessons: string[]
): Unit[] => {
  const lang = (currentLanguage || 'wolof').toLowerCase();

  // Definition of themes and titles for Level 1 (beginner) Module 1
  const beginnerM1ChapterTitles = [
    t('unit_1_name' as TranslationKey) || "Premiers Pas",
    t('unit_2_name' as TranslationKey) || "Les Personnes et La Famille",
    t('unit_3_name' as TranslationKey) || "Le Marché",
    t('unit_4_name' as TranslationKey) || "Les Objets",
    t('unit_5_name' as TranslationKey) || "Les Lieux et Directions",
    t('unit_6_name' as TranslationKey) || "Les Actions Simples",
    t('unit_7_name' as TranslationKey) || "Les Aliments et Repas",
    t('unit_8_name' as TranslationKey) || "Au Travail",
    t('unit_9_name' as TranslationKey) || "Littérature Orale",
    t('unit_10_name' as TranslationKey) || "Maîtrise",
  ];

  const beginnerM1ChapterSubs = [
    t('unit_1_sub' as TranslationKey) || "Salutations et Présentations",
    t('unit_2_sub' as TranslationKey) || "Membres et Relations",
    t('unit_3_sub' as TranslationKey) || "Nombres, le Temps et Négociation",
    t('unit_4_sub' as TranslationKey) || "Le Quotidien",
    t('unit_5_sub' as TranslationKey) || "Orientation",
    t('unit_6_sub' as TranslationKey) || "Verbes Usuels",
    t('unit_7_sub' as TranslationKey) || "Manger et Boire",
    t('unit_8_sub' as TranslationKey) || "Métiers et Commerce",
    t('unit_9_sub' as TranslationKey) || "Contes et Mythes",
    t('unit_10_sub' as TranslationKey) || "Éloquence et Proverbes",
  ];

  // We generate 10 Modules (Units)
  return Array.from({ length: 10 }).map((_, mi) => {
    const moduleNum = mi + 1;

    const moduleTitle = `Module ${moduleNum}`;
    let moduleTheme = "";

    if (level === 'beginner') {
      if (moduleNum === 1) {
        moduleTheme = "Bases et vie quotidienne";
      } else {
        moduleTheme = `Thème Approfondi ${moduleNum}`;
      }
    } else if (level === 'intermediate') {
      moduleTheme = `Communication Fluide ${moduleNum}`;
    } else {
      moduleTheme = `Maîtrise Oratoire ${moduleNum}`;
    }

    // Each module has 10 chapters
    const chapters: Chapter[] = Array.from({ length: 10 }).map((_, ci) => {
      const chapterNum = ci + 1;
      const chapterId = `${level}_m${moduleNum}_c${chapterNum}`;

      let chapterTitle = `Chapitre ${chapterNum}`;
      let chapterDesc = `Exercices pratiques et expressions du quotidien.`;

      if (level === 'beginner' && moduleNum === 1) {
        chapterTitle = `Chapitre ${chapterNum} : ${beginnerM1ChapterTitles[ci]}`;
        chapterDesc = beginnerM1ChapterSubs[ci];
      } else {
        chapterTitle = `Chapitre ${chapterNum} : Thème ${chapterNum}`;
      }

      // Inside each chapter we have 10 lessons
      const lessons: Lesson[] = Array.from({ length: 10 }).map((_, li) => {
        const lessonNum = li + 1;
        const lessonId = `${chapterId}_l${lessonNum}`;

        let lessonTitle = `Leçon ${lessonNum}`;

        // Inject static titles if available (Level 1, Module 1, Chapters 1-7)
        if (level === 'beginner' && moduleNum === 1 && chapterNum <= 7) {
          const staticData = STATIC_DATA_MAP[chapterNum];
          const langData = staticData ? staticData[lang] : null;
          const lessonKeys = langData ? Object.keys(langData) : [];
          if (lessonKeys[li]) {
            lessonTitle = lessonKeys[li];
          } else {
            // fallback translation key
            lessonTitle = t(`unit_${chapterNum}_lesson_${lessonNum}` as TranslationKey) || lessonTitle;
          }
        }

        return {
          id: lessonId,
          title: lessonTitle,
          lessonKey: `${chapterId}_lesson_${lessonNum}`,
          isCompleted: isLessonCompletedHelper(completedLessons, level, moduleNum, chapterNum, lessonNum, false),
          exercises: []
        };
      });

      // Append evaluation/story lesson to the chapter
      lessons.push({
        id: `${chapterId}_story`,
        title: t('unit_evaluation') || "Évaluation",
        lessonKey: `${chapterId}_evaluation`,
        isCompleted: isLessonCompletedHelper(completedLessons, level, moduleNum, chapterNum, 11, true),
        exercises: [],
        isStory: true
      });

      return {
        id: chapterId,
        title: chapterTitle,
        description: chapterDesc,
        lessons
      };
    });

    return {
      id: moduleNum,
      title: moduleTitle,
      theme: moduleTheme,
      themeName: moduleTitle,
      themeSub: moduleTheme,
      chapters
    };
  });
};
