import { Button, FormControl, InputLabel, Menu, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import CalendarAtom from '../../recoil/calendar/calendarAtom';

const exYearList = [2020, 2021, 2022];

const YearCalendarButton = () => {
  const [year, setYear] = useRecoilState(CalendarAtom.year);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const setSelectedYear = (year: number) => {
    setYear(year);
    handleClose();
  };

  return (
    <>
      <Button
        sx={{
          font: 'normal normal bold Noto Sans CJK KR;',
          fontSize: 22,
          alignItems: 'center',
          width: 100,
        }}
        endIcon={
          <CalendarMonthIcon
            sx={{
              fontSize: 22,
            }}
          />
        }
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {year}
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {exYearList.map((year) => {
          return (
            <MenuItem
              sx={{
                width: 100,
              }}
              onClick={() => {
                setSelectedYear(year);
              }}
            >
              {year}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default YearCalendarButton;
