import React from 'react';
import { useTranslation } from 'react-i18next';
import { lighten, makeStyles } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import GlobalFilter from './GlobalFilter';
import { colors } from '../../../../Styles/ui';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
}));

const TableToolbar = ({ preGlobalFilteredRows, setGlobalFilter, globalFilter, count }) => {
  const classes = useToolbarStyles();
  const { t } = useTranslation();
  return (
    <Toolbar className={clsx(classes.root)}>
      <Typography
        className={classes.title}
        sx={{
          font: 'normal normal normal 15px/21px Noto Sans CJK KR',
          color: colors.num_ccc,
        }}
        id='tableTitle'
      >
        {t('bank.table.title').replace('@', count)}
      </Typography>

      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </Toolbar>
  );
};

export default TableToolbar;
