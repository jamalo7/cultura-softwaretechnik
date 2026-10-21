import type { QuizQuestion } from './QuizScreen';

export interface QuizData {
  id: string;
  title: string;
  icon: string;
  questions: QuizQuestion[];
}

export const quizzes: QuizData[] = [
  {
    id: '1',
    title: 'Spanisch Vokabel-Quiz',
    icon: '🇪🇸',
    questions: [
      {
        question: 'Was bedeutet „Gracias"?',
        options: ['Danke', 'Bitte', 'Hallo', 'Tschüss'],
        correctIndex: 0,
      },
      {
        question: 'Was bedeutet „Buenos días"?',
        options: ['Guten Morgen', 'Gute Nacht', 'Guten Abend', 'Entschuldigung'],
        correctIndex: 0,
      },
      {
        question: 'Was bedeutet „¿Cuánto cuesta?"',
        options: ['Wie viel kostet das?', 'Wo ist das?', 'Wie heißt du?', 'Wann beginnt es?'],
        correctIndex: 0,
      },
      {
        question: 'Was bedeutet „Agua"?',
        options: ['Wasser', 'Brot', 'Milch', 'Salz'],
        correctIndex: 0,
      },
      {
        question: 'Was bedeutet „Perdón"?',
        options: ['Entschuldigung', 'Willkommen', 'Vielleicht', 'Natürlich'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: '2',
    title: 'Kulturgeschichte: Italien',
    icon: '🇮🇹',
    questions: [
      {
        question: 'Welche Stadt gilt als Zentrum der Renaissance?',
        options: ['Florenz', 'Neapel', 'Turin', 'Palermo'],
        correctIndex: 0,
      },
      {
        question: 'Wer malte die Decke der Sixtinischen Kapelle?',
        options: ['Michelangelo', 'Raphael', 'Donatello', 'Botticelli'],
        correctIndex: 0,
      },
      {
        question: 'Das Kolosseum steht in…',
        options: ['Rom', 'Mailand', 'Pisa', 'Venedig'],
        correctIndex: 0,
      },
      {
        question: 'Welche Familie war in Florenz besonders einflussreich?',
        options: ['Medici', 'Borgia', 'Sforza', 'Savoyen'],
        correctIndex: 0,
      },
      {
        question: 'Welche Sprache wird in Italien gesprochen?',
        options: ['Italienisch', 'Spanisch', 'Portugiesisch', 'Französisch'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: '3',
    title: 'Weltküche Meisterschaft',
    icon: '🍽️',
    questions: [
      {
        question: 'Tajine ist ein Gericht aus…',
        options: ['Marokko', 'Japan', 'Mexiko', 'Schweden'],
        correctIndex: 0,
      },
      {
        question: 'Sushi stammt aus…',
        options: ['Japan', 'Italien', 'Türkei', 'Brasilien'],
        correctIndex: 0,
      },
      {
        question: 'Paella ist typisch für…',
        options: ['Spanien', 'Kanada', 'Ägypten', 'Indien'],
        correctIndex: 0,
      },
      {
        question: 'Pasta Carbonara enthält typischerweise…',
        options: ['Ei und Käse', 'Tomaten und Oliven', 'Fisch und Reis', 'Curry und Kokos'],
        correctIndex: 0,
      },
      {
        question: 'Falafel wird häufig aus … gemacht',
        options: ['Kichererbsen', 'Kartoffeln', 'Mais', 'Käse'],
        correctIndex: 0,
      },
    ],
  },
];

export function getQuizById(id: string): QuizData | undefined {
  return quizzes.find(quiz => quiz.id === id);
}
