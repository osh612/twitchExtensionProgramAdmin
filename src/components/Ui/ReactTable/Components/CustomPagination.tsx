import styled from '@emotion/styled';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, IconButton } from '@mui/material';
import { colors } from '../../../../Styles/ui';

const iconbuttonCss = {
  width: '24px',
  height: '24px',
  margin: '0 5px',
  borderRadius: '3px',
  font: 'normal normal normal 15px/61px Noto Sans CJK KR',
};

const iconCss = {
  width: '18px',
  height: '18px',
};

const CustomPagination = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: any, newPage: any) => void;
}) => {
  const pageLength = Math.ceil(count / rowsPerPage);
  const isMax = pageLength === page;
  const isMin = page === 0;

  // const handleFirstPageButtonClick = (event) => {
  //   onPageChange(event, 0);
  // };

  const handleBackButtonClick = (event: any) => {
    if (page > 0) {
      onPageChange(event, page - 1);
    }
  };

  const handleGoPageClick = (event: any) => {
    if (event.type === 'click') {
      onPageChange(event, +event.currentTarget.innerText - 1);
    }
  };

  const handleNextButtonClick = (event: any) => {
    if (page < pageLength) {
      onPageChange(event, page + 1);
    }
  };

  // const handleLastPageButtonClick = (event) => {
  //   onPageChange(event, Math.max(0, Math.ceil(count / pageSize) - 1));
  // };

  function getPageButton(curPage: number, pageLength: number, rowsPerPage: number) {
    if (pageLength < 10) {
      const firstPage = 1;
      return [...Array(pageLength)].map((_, i) => {
        const isPage = curPage + 1 === firstPage + i;
        return (
          <IconButton
            sx={{ ...iconbuttonCss, color: isPage ? colors.main : colors.num_ccc, paddingTop: '7px' }}
            onClick={handleGoPageClick}
          >
            {firstPage + i}
          </IconButton>
        );
      });
    }
    let firstPage = curPage < 5 ? 1 : curPage - 4;
    firstPage = pageLength - rowsPerPage + 1 > firstPage ? firstPage : pageLength - rowsPerPage + 1;
    return [...Array(10)].map((_, i) => {
      const isPage = curPage + 1 === firstPage + i;
      return (
        <IconButton
          onClick={handleGoPageClick}
          sx={{ ...iconbuttonCss, color: isPage ? colors.main : colors.num_ccc, paddingTop: '11px' }}
        >
          {firstPage + i}
        </IconButton>
      );
    });
  }

  return (
    <Warpper>
      <PaginationBox>
        <IconButton
          sx={{
            ...iconbuttonCss,
            backgroundColor: colors.num_888,
            ':hover': {
              backgroundColor: colors.main,
            },
          }}
          onClick={handleBackButtonClick}
        >
          <ArrowBackIosNewIcon sx={{ ...iconCss }} />
        </IconButton>
        {getPageButton(page, pageLength, rowsPerPage)}
        <IconButton
          sx={{
            ...iconbuttonCss,
            backgroundColor: colors.num_888,
            ':hover': {
              backgroundColor: colors.main,
            },
          }}
          onClick={handleNextButtonClick}
        >
          <ArrowForwardIosIcon sx={{ ...iconCss }} />
        </IconButton>
      </PaginationBox>
    </Warpper>
  );
};

export default CustomPagination;

const Warpper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
`;

const PaginationBox = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
