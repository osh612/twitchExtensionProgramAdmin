import { KeyboardArrowDown, Language } from '@mui/icons-material';
import { Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { t } from 'i18next';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import i18n from '../../../i18n';
import { MAP_LANGUAGE_WINDOW } from '../../../lib/mapping/map_setting_menu';
import { userLanguageAtom } from '../../../recoil/Auth/userAtom';
import { colors } from '../../../Styles/ui';

interface Lang {
  key: string;
  label: string;
}

const langList = [
  {
    key: 'ko',
    label: '한국어',
  },
  {
    key: 'en',
    label: 'English',
  },
];

const LocaleWindow = () => {
  // language atom
  const [language, setLanguage] = useRecoilState(userLanguageAtom);

  // UI 관련
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const findLabel = (key: string) => {
    let result = '';

    for (let i = 0; i < langList.length; i += 1) {
      if (langList[i].key === key) {
        result = langList[i].label;
        break;
      }
    }

    return result;
  };

  return (
    <>
      {/* <Tooltip placement='right'>
        
      </Tooltip> */}
      <Button
        aria-label='settting'
        onClick={handleClick}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        sx={{
          color: colors.num_ccc,
          width: 113,
        }}
        endIcon={<KeyboardArrowDown />}
        startIcon={<Language />}
      >
        {findLabel(language)}
      </Button>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            backgroundColor: '#3a3a49',
            color: 'white',
            padding: '2px 15px',
            mt: 1.5,
            borderRadius: '8px',
            width: 113,
          },
        }}
      >
        {langList.map((lang: Lang) => {
          return (
            <MenuItem
              onClick={() => changeLanguage(lang.key)}
              sx={{
                padding: '6px 10px',
                fontSize: 13,
                ':hover': {
                  backgroundColor: '#4e4e5c',
                },
              }}
            >
              {lang.label}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default LocaleWindow;
