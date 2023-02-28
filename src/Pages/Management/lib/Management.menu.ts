export const ManagementMenu = [
  { key: '', value: 'management.menu.partner-management' },
  { key: 'addAccount', value: 'management.menu.partner-joinAccet' },
  { key: 'history', value: 'management.menu.history' },
];

export const getTitle = (key: string) => {
  if (key === '') {
    return ManagementMenu[0].value;
  }
  return ManagementMenu.filter((data) => `/${data.key}` === key)[0].value;
};

export const getManagementMenuKey = (key: string) => {
  if (key === '') {
    return ManagementMenu[0].key;
  }
  return ManagementMenu.filter((data) => `/${data.key}` === key)[0].key;
};

export const getManagementMenuIdx = (key: string) => {
  let idx = 0;
  const replaceKey = key.replace('/', '');
  ManagementMenu.map((data, i) => {
    if (data.key === replaceKey) {
      idx = i;
    }
    return '';
  });

  return idx;
};
