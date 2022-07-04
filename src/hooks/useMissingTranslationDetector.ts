import { useState, useEffect } from '../lib/teact/teact';
import type { ApiLangPack } from '../api/types';
import { copyTextToClipboard } from '../util/clipboard';
import { getActions } from '../global';

interface CustomWindow extends Window {
  translationMissing?: ApiLangPack;
}

declare const window: CustomWindow;

const useMissingTranslationDetector = () => {
  const [missingTranslations, setMissingTranslations] = useState<ApiLangPack | undefined>(window.translationMissing);

  useEffect(() => {
    const timer = window.setInterval(() => setMissingTranslations(window.translationMissing), 100);
    return () => window.clearInterval(timer);
  }, [setMissingTranslations]);

  const { showNotification, openChatByUsername } = getActions();

  const copyTranslations = () => {
    // eslint-disable-next-line no-null/no-null
    copyTextToClipboard(JSON.stringify(window.translationMissing, null, 2));
    showNotification({ message: '已复制到剪贴板，在新打开的聊天窗口中粘贴以反馈缺失的翻译' });
    openChatByUsername({ username: 'mashiro233' });
  };

  return { missingTranslations, copyTranslations };
};

export default useMissingTranslationDetector;
