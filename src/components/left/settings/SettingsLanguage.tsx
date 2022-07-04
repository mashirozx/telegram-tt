import type { FC } from '../../../lib/teact/teact';
import React, {
  memo, useCallback, useEffect, useMemo, useState,
} from '../../../lib/teact/teact';
import { getActions, withGlobal } from '../../../global';

import type { ISettings, LangCode } from '../../../types';
import type { ApiLanguage } from '../../../api/types';

import { setLanguage } from '../../../util/langProvider';

import RadioGroup from '../../ui/RadioGroup';
import Loading from '../../ui/Loading';
import useFlag from '../../../hooks/useFlag';
import useHistoryBack from '../../../hooks/useHistoryBack';

const chinese: ApiLanguage = {
  beta: true,
  name: 'Chinese',
  nativeName: '中文',
  langCode: 'zh-CN',
  baseLangCode: 'zh',
  pluralCode: 'zh',
  stringsCount: 4793,
  translatedCount: 4793,
  translationsUrl: 'https://crwd.in/telegram-tt',
};

type OwnProps = {
  isActive?: boolean;
  onReset: () => void;
};

type StateProps = Pick<ISettings, 'languages' | 'language'>;

const SettingsLanguage: FC<OwnProps & StateProps> = ({
  isActive,
  onReset,
  languages,
  language,
}) => {
  const {
    loadLanguages,
    setSettingOption,
  } = getActions();

  const getCustomLanguage = window.localStorage.getItem('custom-language');
  const customLanguage = getCustomLanguage === 'official' ? undefined : getCustomLanguage;

  const [selectedLanguage, setSelectedLanguage] = useState<string>(customLanguage ?? language);
  const [isLoading, markIsLoading, unmarkIsLoading] = useFlag();

  // TODO Throttle
  useEffect(() => {
    loadLanguages();
  }, [loadLanguages]);

  const handleChange = useCallback((langCode: string) => {
    const displayLang = langCode;
    if (langCode === 'zh-CN') {
      window.localStorage.setItem('custom-language', 'zh-CN');
      window.localStorage.setItem('custom-language-name', '中文');
      langCode = 'en';
    } else {
      window.localStorage.setItem('custom-language', 'official');
      window.localStorage.removeItem('custom-language-name');
    }

    setSelectedLanguage(displayLang);
    markIsLoading();

    void setLanguage(langCode as LangCode, () => {
      unmarkIsLoading();

      setSettingOption({ language: langCode });
    });
  }, [markIsLoading, unmarkIsLoading, setSettingOption]);

  const options = useMemo(() => {
    return languages ? buildOptions([chinese, ...languages]) : undefined;
  }, [languages]);

  useHistoryBack({
    isActive,
    onBack: onReset,
  });

  return (
    <div className="settings-content settings-item settings-language custom-scroll settings-item--first">
      {options ? (
        <RadioGroup
          name="keyboard-send-settings"
          options={options}
          selected={selectedLanguage}
          loadingOption={isLoading ? selectedLanguage : undefined}
          onChange={handleChange}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

function buildOptions(languages: ApiLanguage[]) {
  const currentLangCode = (window.navigator.language || 'en').toLowerCase();
  const shortLangCode = currentLangCode.substr(0, 2);

  return languages.map(({ langCode, nativeName, name }) => ({
    value: langCode,
    label: nativeName,
    subLabel: name,
  })).sort((a) => {
    return currentLangCode && (a.value === currentLangCode || a.value === shortLangCode) ? -1 : 0;
  });
}

export default memo(withGlobal<OwnProps>(
  (global): StateProps => {
    return {
      languages: global.settings.byKey.languages,
      language: global.settings.byKey.language,
    };
  },
)(SettingsLanguage));
