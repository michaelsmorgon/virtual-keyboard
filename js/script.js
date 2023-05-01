import Alphabet from './module/Alphabet.js';
import Keyboard from './module/Keyboard.js';
import BodyContent from './module/BodyContent.js';

const enAlphabet = await new Alphabet('../json/keys_en.json');
const dataEn = enAlphabet.getAlphabetList();

const ruAlphabet = await new Alphabet('../json/keys_ru.json');
const dataRu = ruAlphabet.getAlphabetList();

const keyboard = new Keyboard();
const keyboardHtml = keyboard.createKeyboard(dataEn, dataRu);

const bodyContent = new BodyContent(keyboardHtml);
bodyContent.getHTML();