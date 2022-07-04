import { useState, useEffect } from '../lib/teact/teact';

const useCustomLangObserver = () => {
  const [customLang, setCustomLang] = useState<string>('');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCustomLang(window.localStorage.getItem('custom-language') ?? 'zh-CN');
    }, 100);
    return () => window.clearInterval(timer);
  }, [setCustomLang]);

  return customLang;
};

export default useCustomLangObserver;
