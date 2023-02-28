import i18next from 'i18next';

export interface ICodeTrakerTableData {
  no: number;
  accountType: string;
  chennel: string;
  code: number;
  reissuance: boolean;
}

const newPerson = (data: ICodeTrakerTableData, idx: number): ICodeTrakerTableData => {
  return {
    no: idx + 1,
    accountType: data.accountType,
    chennel: data.chennel,
    code: data.code,
    reissuance: true,
  };
};

export default function makeLoadCodeTrakerData(dataList: ICodeTrakerTableData[]) {
  const makeDataLevel = (depth = 0) => {
    return dataList.map((data, idx) => {
      return {
        ...newPerson(data, idx),
        // subRows: dataList[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
