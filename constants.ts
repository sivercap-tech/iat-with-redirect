import { Category, Stimulus, StimulusType } from './types';

// Supabase Configuration
export const SUPABASE_URL = "https://gqulzoctsltwxmzvofwv.supabase.co"; 
export const SUPABASE_KEY = "sb_publishable_alcHOMdoEOvJmuSvwEeeoQ_HnbodgT3";

// URL for the next part (if any)
export const NEXT_TEST_URL = "https://example.com/finish";

// Configurable Labels (You can change these names here)
export const LABEL_NATURE_A = "Природа А";
export const LABEL_NATURE_B = "Природа Б";

// Bashkir Words
export const BASHKIR_WORDS = [
  "Юрта", "Сабантуй", "Тюбетейка", "Агидель", "Урал-Батыр", 
  "Бешмет", "Кумыс", "Курай", "Бешбармак"
];

// Russian Words
export const RUSSIAN_WORDS = [
  "Шапка-ушанка", "Квас", "Пельмени", "Балалайка", "Изба", 
  "Илья Муромец", "Волга", "Масленица", "Кокошник"
];

// Local Images
// Expects files like nature_a_1.jpg, nature_b_1.jpg
const natureAModules = import.meta.glob('./images/nature_a_*.jpg', { eager: true, import: 'default' });
const natureBModules = import.meta.glob('./images/nature_b_*.jpg', { eager: true, import: 'default' });

// Helper to sort images numerically
const getSortedImages = (modules: Record<string, unknown>) => {
  return Object.entries(modules)
    .sort(([keyA], [keyB]) => {
      // Extract the number from the filename
      const numA = parseInt(keyA.match(/_(\d+)\./)?.[1] || '0');
      const numB = parseInt(keyB.match(/_(\d+)\./)?.[1] || '0');
      return numA - numB;
    })
    .map(([_, url]) => url as string);
};

export const NATURE_A_IMAGES = getSortedImages(natureAModules);
export const NATURE_B_IMAGES = getSortedImages(natureBModules);

// Fallback / Debugging
if (NATURE_A_IMAGES.length === 0) {
  console.warn(`No images found for ${LABEL_NATURE_A}! Check that files exist in ./images/nature_a_*.jpg`);
}
if (NATURE_B_IMAGES.length === 0) {
  console.warn(`No images found for ${LABEL_NATURE_B}! Check that files exist in ./images/nature_b_*.jpg`);
}

// Generate Stimuli Pool
export const STIMULI_POOL: Stimulus[] = [
  ...BASHKIR_WORDS.map((w, i) => ({ id: `bash_${i}`, content: w, type: StimulusType.WORD, category: Category.BASHKIR })),
  ...RUSSIAN_WORDS.map((w, i) => ({ id: `rus_${i}`, content: w, type: StimulusType.WORD, category: Category.RUSSIAN })),
  ...NATURE_A_IMAGES.map((url, i) => ({ id: `natA_${i}`, content: url, type: StimulusType.IMAGE, category: Category.NATURE_A })),
  ...NATURE_B_IMAGES.map((url, i) => ({ id: `natB_${i}`, content: url, type: StimulusType.IMAGE, category: Category.NATURE_B })),
];
