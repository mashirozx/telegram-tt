import { getGlobal } from '../global';

import type { ApiLangPack, ApiLangString } from '../api/types';
import type { LangCode, TimeFormat } from '../types';

import {
  DEFAULT_LANG_CODE, DEFAULT_LANG_PACK, LANG_CACHE_NAME, LANG_PACKS,
} from '../config';
import * as cacheApi from './cacheApi';
import { callApi } from '../api/gramjs';
import { createCallbackManager } from './callbacks';
import { formatInteger } from './textFormat';
import langPackChinesePlus from './langPackChinesePlus';

interface CustomWindow extends Window {
  translationMissing?: ApiLangPack;
}

declare const window: CustomWindow;

interface LangFn {
  (key: string, value?: any, format?: 'i'): any;

  isRtl?: boolean;
  code?: LangCode;
  langName?: string;
  timeFormat?: TimeFormat;
}

const SUBSTITUTION_REGEX = /%\d?\$?[sdf@]/g;
const PLURAL_OPTIONS = ['value', 'zeroValue', 'oneValue', 'twoValue', 'fewValue', 'manyValue', 'otherValue'] as const;
const PLURAL_RULES = {
  /* eslint-disable max-len */
  en: (n: number) => (n !== 1 ? 6 : 2),
  ar: (n: number) => (n === 0 ? 1 : n === 1 ? 2 : n === 2 ? 3 : n % 100 >= 3 && n % 100 <= 10 ? 4 : n % 100 >= 11 ? 5 : 6),
  ca: (n: number) => (n !== 1 ? 6 : 2),
  de: (n: number) => (n !== 1 ? 6 : 2),
  es: (n: number) => (n !== 1 ? 6 : 2),
  fa: (n: number) => (n > 1 ? 6 : 2),
  fr: (n: number) => (n > 1 ? 6 : 2),
  id: () => 0,
  it: (n: number) => (n !== 1 ? 6 : 2),
  ko: () => 0,
  ms: () => 0,
  nl: (n: number) => (n !== 1 ? 6 : 2),
  pl: (n: number) => (n === 1 ? 2 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 4 : 5),
  pt_BR: (n: number) => (n > 1 ? 6 : 2),
  ru: (n: number) => (n % 10 === 1 && n % 100 !== 11 ? 2 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 4 : 5),
  tr: (n: number) => (n > 1 ? 6 : 2),
  uk: (n: number) => (n % 10 === 1 && n % 100 !== 11 ? 2 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 4 : 5),
  uz: (n: number) => (n > 1 ? 6 : 2),
  /* eslint-enable max-len */
};

const cache = new Map<string, string>();

let langPack: ApiLangPack | undefined;
let fallbackLangPack: ApiLangPack | undefined;

const {
  addCallback,
  removeCallback,
  runCallbacks,
} = createCallbackManager();

export { addCallback, removeCallback };

let currentLangCode: string | undefined;
let currentTimeFormat: TimeFormat | undefined;

export const getTranslation: LangFn = (key: string, value?: any, format?: 'i') => {
  if (value !== undefined) {
    const cacheValue = Array.isArray(value) ? JSON.stringify(value) : value;
    const cached = cache.get(`${key}_${cacheValue}_${format}`);
    if (cached) {
      return cached;
    }
  }

  if (!langPack && !fallbackLangPack) {
    return key;
  }

  let customLangString: ApiLangString | undefined;
  if (window.localStorage.getItem('custom-language') === 'zh-CN') {
    const chinese = langPackChinesePlus?.[key];
    if (chinese) {
      customLangString = chinese;
    } else {
      const langString = (langPack?.[key]) || (fallbackLangPack?.[key]) || { key, value: 'undefined' };
      const msg = `[🇨🇳] 没有 【${key}】 对应的中文翻译`;
      // eslint-disable-next-line no-null/no-null
      const defaultMsg = `[💡] 其对应的翻译包是 ${JSON.stringify(langString, null, 2)}`;
      const helper = '[🧲] 可在此通过 `window.translationMissing` 命令导出所有缺失的翻译';
      const help = '[🙌] 请打开首页左侧的菜单，点击翻译反馈，并将剪贴板上的内容发送给 @mashiro233 以提交缺失的翻译信息';
      // eslint-disable-next-line no-console
      console.warn(`${msg}\n${defaultMsg}\n${helper}\n${help}`);
      if (!window.translationMissing) {
        window.translationMissing = {};
      }
      if (!window.translationMissing.hasOwnProperty(key)) {
        window.translationMissing[key] = langString;
      }
    }
  }

  const langString = customLangString || (langPack?.[key]) || (fallbackLangPack?.[key]);
  if (!langString) {
    if (!fallbackLangPack) {
      void importFallbackLangPack();
    }

    return key;
  }

  return processTranslation(langString, key, value, format);
};

export async function getTranslationForLangString(langCode: string, key: string) {
  let translateString: ApiLangString | undefined = await cacheApi.fetch(
    LANG_CACHE_NAME,
    `${DEFAULT_LANG_PACK}_${langCode}_${key}`,
    cacheApi.Type.Json,
  );

  if (!translateString) {
    translateString = await fetchRemoteString(DEFAULT_LANG_PACK, langCode, key);
  }

  return processTranslation(translateString, key);
}

export async function setLanguage(langCode: LangCode, callback?: NoneToVoidFunction, withFallback = false) {
  if (langPack && langCode === currentLangCode) {
    if (callback) {
      callback();
    }

    return;
  }

  let newLangPack = await cacheApi.fetch(LANG_CACHE_NAME, langCode, cacheApi.Type.Json);
  if (!newLangPack) {
    if (withFallback) {
      await importFallbackLangPack();
    }

    newLangPack = await fetchRemote(langCode);
    if (!newLangPack) {
      return;
    }
  }

  cache.clear();

  currentLangCode = langCode;
  langPack = newLangPack;
  document.documentElement.lang = langCode;

  const { languages, timeFormat } = getGlobal().settings.byKey;
  const langInfo = languages?.find((l) => l.langCode === langCode);
  getTranslation.isRtl = Boolean(langInfo?.rtl);
  getTranslation.code = langCode;
  getTranslation.langName = langInfo?.nativeName;
  getTranslation.timeFormat = timeFormat;

  if (callback) {
    callback();
  }

  runCallbacks();
}

export function setTimeFormat(timeFormat: TimeFormat) {
  if (timeFormat && timeFormat === currentTimeFormat) {
    return;
  }

  currentTimeFormat = timeFormat;
  getTranslation.timeFormat = timeFormat;

  runCallbacks();
}

async function importFallbackLangPack() {
  if (fallbackLangPack) {
    return;
  }

  fallbackLangPack = (await import('./fallbackLangPack')).default;
  runCallbacks();
}

async function fetchRemote(langCode: string): Promise<ApiLangPack | undefined> {
  const remote = await callApi('fetchLangPack', { sourceLangPacks: LANG_PACKS, langCode });
  if (remote) {
    await cacheApi.save(LANG_CACHE_NAME, langCode, remote.langPack);
    return remote.langPack;
  }

  return undefined;
}

async function fetchRemoteString(
  remoteLangPack: typeof LANG_PACKS[number], langCode: string, key: string,
): Promise<ApiLangString | undefined> {
  const remote = await callApi('fetchLangStrings', {
    langPack: remoteLangPack,
    langCode,
    keys: [key],
  });

  if (remote?.length) {
    await cacheApi.save(LANG_CACHE_NAME, `${remoteLangPack}_${langCode}_${key}`, remote[0]);

    return remote[0];
  }

  return undefined;
}

function getPluralOption(amount: number) {
  const langCode = currentLangCode || DEFAULT_LANG_CODE;
  const optionIndex = PLURAL_RULES[langCode as keyof typeof PLURAL_RULES]
    ? PLURAL_RULES[langCode as keyof typeof PLURAL_RULES](amount)
    : 0;

  return PLURAL_OPTIONS[optionIndex];
}

function processTemplate(template: string, value: any) {
  value = Array.isArray(value) ? value : [value];
  const translationSlices = template.split(SUBSTITUTION_REGEX);
  const initialValue = translationSlices.shift();

  return translationSlices.reduce((result, str, index) => {
    return `${result}${String(value[index] || '')}${str}`;
  }, initialValue || '');
}

function processTranslation(langString: ApiLangString | undefined, key: string, value?: any, format?: 'i') {
  const template = langString ? langString[typeof value === 'number' ? getPluralOption(value) : 'value'] : undefined;
  if (!template || !template.trim()) {
    const parts = key.split('.');

    return parts[parts.length - 1];
  }

  if (value !== undefined) {
    const formattedValue = format === 'i' ? formatInteger(value) : value;
    const result = processTemplate(template, formattedValue);
    const cacheValue = Array.isArray(value) ? JSON.stringify(value) : value;
    cache.set(`${key}_${cacheValue}_${format}`, result);
    return result;
  }

  return template;
}
