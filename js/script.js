import Alphabet from './module/Alphabet.js';
import Keyboard from './module/Keyboard.js';
import BodyContent from './module/BodyContent.js';
import Textarea from './module/Textarea.js';

const enAlphabet = new Alphabet('./json/keys_en.json');
const dataEn = await enAlphabet.getAlphabetList();

const ruAlphabet = new Alphabet('./json/keys_ru.json');
const dataRu = await ruAlphabet.getAlphabetList();

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
const keyboardHtml = keyboard.createKeyboard(dataEn, dataRu);
const bodyContent = new BodyContent(keyboardHtml);
bodyContent.getHTML();

function changeLanguage() {
  const enElements = document.querySelectorAll('.en');
  enElements.forEach((elem) => {
    elem.classList.toggle('hidden');
  });
  const ruElements = document.querySelectorAll('.ru');
  ruElements.forEach((elem) => {
    elem.classList.toggle('hidden');
  });
}

function keyShow(lang, typeKey) {
  const elements = document.querySelectorAll(`.${lang} > .${typeKey}`);
  elements.forEach((elem) => {
    elem.classList.remove('hidden');
  });
}

function keyHide(lang, typeKey) {
  const elements = document.querySelectorAll(`.${lang} > .${typeKey}`);
  elements.forEach((elem) => {
    if (!elem.classList.contains('hidden')) {
      elem.classList.add('hidden');
    }
  });
}

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

document.addEventListener('keydown', (event) => {
  const eventCode = event.code;
  const key = document.querySelector(`.${eventCode}`);

  if (eventCode === 'CapsLock') {
    key.classList.toggle('active');
    capsDown = !capsDown;
  } else if (key !== null) {
    key.classList.add('active');
  }

  if (eventCode === 'AltLeft' || eventCode === 'AltRight') {
    altKeyDown = true;
    event.preventDefault();
  }

  if (eventCode === 'ControlLeft' || eventCode === 'ControlRight') {
    controlKeyDown = true;
  }

  if (eventCode === 'ShiftLeft' || eventCode === 'ShiftRight') {
    shiftKeyDown = true;
  }

  changeKeyEvent();
  const textarea = new Textarea(storageLang);
  textarea.addLetter(key, eventCode);
});

document.addEventListener('keyup', (event) => {
  const eventCode = event.code;
  const key = document.querySelector(`.${eventCode}`);
  if (eventCode !== 'CapsLock') {
    if (key !== null) {
      key.classList.remove('active');
    }
  }

  if (eventCode === 'AltLeft' || eventCode === 'AltRight') {
    altKeyDown = false;
  }
  if (eventCode === 'ControlLeft' || eventCode === 'ControlRight') {
    controlKeyDown = false;
  }
  if (eventCode === 'ShiftLeft' || eventCode === 'ShiftRight') {
    shiftKeyDown = false;
  }

  changeKeyEvent();
});

const keys = document.querySelectorAll('.key');
keys.forEach((elem) => {
  elem.addEventListener('mousedown', (event) => {
    const target = event.currentTarget;
    const eventCode = target.classList[1];
    target.classList.add('active');
    const textarea = new Textarea(storageLang);
    textarea.addLetter(target, eventCode);
  });
  elem.addEventListener('mouseup', (event) => {
    const target = event.currentTarget;
    target.classList.remove('active');
  });
});
