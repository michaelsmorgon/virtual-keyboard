import Alphabet from './module/Alphabet.js';
import Keyboard from './module/Keyboard.js';
import BodyContent from './module/BodyContent.js';

const enAlphabet = await new Alphabet('../json/keys_en.json');
const dataEn = enAlphabet.getAlphabetList();

const ruAlphabet = await new Alphabet('../json/keys_ru.json');
const dataRu = ruAlphabet.getAlphabetList();

let storageLang = localStorage.getItem('lang');
let controlKeyDown = false;
let altKeyDown = false;
let shiftKeyDown = false;
let capsDown = false;

if (!storageLang) {
  storageLang = 'en';
  localStorage.setItem('lang', storageLang);
}

const keyboard = new Keyboard(storageLang);
let keyboardHtml = keyboard.createKeyboard(dataEn, dataRu);
const bodyContent = new BodyContent(keyboardHtml);
bodyContent.getHTML();

document.addEventListener('keydown', (event) => {
  const key = document.querySelector('.' + event.code);

  if (event.code === 'CapsLock') {
    key.classList.toggle('active');
    capsDown = !capsDown;
  } else {
    key.classList.add('active');
  }

  if (event.code === 'AltLeft' || event.code === 'AltRight') {
    altKeyDown = true;
    event.preventDefault();
  }

  if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
    controlKeyDown = true;
  }

  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    shiftKeyDown = true;
  }

  changeKeyEvent();
});

document.addEventListener('keyup', (event) => {
  const key = document.querySelector('.' + event.code);
  if (event.code !== 'CapsLock') {
    key.classList.remove('active');
  }

  if (event.code === 'AltLeft' || event.code === 'AltRight') {
    altKeyDown = false;
  }
  if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
    controlKeyDown = false;
  }
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    shiftKeyDown = false;
  }

  changeKeyEvent();
});

function changeKeyEvent() {
  if (controlKeyDown && altKeyDown) {
    if (storageLang === 'ru') {
      storageLang = 'en';
    } else {
      storageLang = 'ru';
    }
    localStorage.setItem('lang', storageLang);
    changeLanguage();
  }

  if (capsDown || shiftKeyDown || (!capsDown && !shiftKeyDown)) {
    keyHide(storageLang === 'en' ? 'ru' : storageLang, 'defaultKey');
    keyHide(storageLang === 'en' ? 'ru' : storageLang, 'shiftPressed');
    keyHide(storageLang === 'en' ? 'ru' : storageLang, 'caps');
    keyHide(storageLang === 'en' ? 'ru' : storageLang, 'capsShift');
    keyHide(storageLang, 'defaultKey');
    keyHide(storageLang, 'shiftPressed');
    keyHide(storageLang, 'caps');
    keyHide(storageLang, 'capsShift');
  }

  if (capsDown && shiftKeyDown) {
    keyShow(storageLang, 'capsShift');
  } else if (capsDown) {
    keyShow(storageLang, 'caps');
  } else if (shiftKeyDown) {
    keyShow(storageLang, 'shiftPressed');
  } else {
    keyShow(storageLang, 'defaultKey');
  }
}

function changeLanguage() {
  const enElements = document.querySelectorAll('.en');
  enElements.forEach(elem => {
    elem.classList.toggle('hidden');
  });
  const ruElements = document.querySelectorAll('.ru');
  ruElements.forEach(elem => {
    elem.classList.toggle('hidden');
  });
}

function keyShow(lang, typeKey) {
  const elements = document.querySelectorAll(`.${lang} > .${typeKey}`);
  elements.forEach(elem => {
    elem.classList.remove('hidden');
  });
}

function keyHide(lang, typeKey) {
  const elements = document.querySelectorAll(`.${lang} > .${typeKey}`);
  elements.forEach(elem => {
    if (!elem.classList.contains('hidden')) {
      elem.classList.add('hidden');
    }
  });
}