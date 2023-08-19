
import React, { useEffect, useMemo, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import api from '../../../api/api';
import { AxiosError } from 'axios';

const Styles = styled.div`
  input{
    width: 2rem;
    text-align: center;
  }
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button {  
    -webkit-appearance: "Always Show Up/Down Arrows";
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
    opacity: 1;
    text-align: center;
  }

  padding: 1rem 0;
  overflow : scroll;
  @media screen and (min-width: 600px){
    table{
      width: 100%;
    }
  input{
    width: 3rem;
    text-align: center;
  }
  }
  table {
    width: 100%;
    text-align: center;
    border-spacing: 0;
    border-right: 2px solid #D5E4F0;
    border-left: 2px solid #D5E4F0;
    border-bottom: 2px solid #D5E4F0;
    border-radius : 12px;
    tr {
      :last-child {
        tr{
          border-bottom: 0;
        }
        td {
          border-bottom: 0;
        }
      }
    }
    thead{
      color : white;
      background-color : #036BB0;
    }
    th{
      text-align: center;
      margin: 0;
      padding: 0.5rem;
      border-bottom: 2px solid #D5E4F0;
      border-right: 2px solid #D5E4F0;
      border-left: 2px solid #D5E4F0;
    }
    td {
      text-align: center;
      margin: 0;
      padding: 0.3rem;
      border-bottom: 2px solid #D5E4F0;
      border-right: 2px solid #D5E4F0;
      border-left: 2px solid #D5E4F0;
      z-index: -1;

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

interface TableData {
  stage_0: {
    series_1: number[];
    series_2: number[];
    series_3: number[];
    series_4: number[];
    series_5: number[];
    checkmarks: boolean[];
  };
}
interface ApiData {
  series_1: number[];
  series_2: number[];
  series_3: number[];
  series_4: number[];
  series_5: number[];
  checkmarks: boolean[];
}
interface Percobaan1Props {
  kualifikasiData?: ApiData; // Assuming TableData is imported and defined here
}


const Percobaan1: React.FC<Percobaan1Props> = ({ kualifikasiData }) => {
  if (!kualifikasiData) {
    return <div className='pt-4 sm:pt-4'>Mengambil Data...</div>;
  }
  const seriesNames = ["1", "2", "3", "4", "5"];
  const [tableData, setTableData] = useState<TableData | any>({
    stage_0: {
      series_1: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      series_2: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      series_3: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      series_4: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      series_5: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      checkmarks: [false, false, false, false, false],
    },
  });
  const [isTimeoutCleared, setIsTimeoutCleared] = useState(true);

  const { examid, scorerid, shooterid } = useParams()
  // USE DATA FROM API
  useEffect(() => {
    if (kualifikasiData) {
      const formattedData: TableData = {
        stage_0: {
          series_1: kualifikasiData.series_1,
          series_2: kualifikasiData.series_2,
          series_3: kualifikasiData.series_3,
          series_4: kualifikasiData.series_4,
          series_5: kualifikasiData.series_5,
          checkmarks: kualifikasiData.checkmarks,
        },
      };
      setTableData(formattedData);
    }
  }, [kualifikasiData]);



  const updateNilaiPerkeneaanBE = async (
    updatedData: ApiData | any
  ) => {
    console.log(updatedData.stage_0)
    try {
      const response = await api.put(
        `/super/exam/${examid}/scorer/${scorerid}/shooter/${shooterid}/result/stage0`,
        { ...updatedData.stage_0, "status": "6", }
      );
      // const response2 = await api.patch(
      //   `/super/exam/${examid}/scorer/${scorerid}/shooter/${shooterid}/result/stage0`
      // );

      console.log(response.data);
      return {
        message: response.data.message,
        error: false,
        response: [response],
      };
    } catch (error) {
      const err = error as AxiosError<any>;
      console.error(err);
      return {
        message:
          "Error: " + err.response?.status + ": " + err.response?.data.message,
        error: true,
      };
    }
  };


  // INPUT HANDLE
  const handleUpdateValues = (e : any) => {
    e.preventDefault();
    setTableData((prevData: TableData | any) => {
      const updatedData: TableData | any = { ...prevData };

      // Loop through series 1 to 5 and update their values
      for (let i = 1; i <= 5; i++) {
        const seriesKey = `series_${i}`;
        updatedData.stage_0[seriesKey] = tableData.stage_0[seriesKey].map(
          (value: number) => value
        ).slice(0, 11);
      }

      // Update the checkmarks based on the current values in the table
      updatedData.stage_0.checkmarks = updatedData.stage_0.checkmarks.map(
        (_: boolean, index: number) => {
          const checkboxId = `stage_0-seri-${index}`;
          const checkboxElement = document.getElementById(checkboxId) as HTMLInputElement;
          return checkboxElement.checked;
        }
      );

      // console.log(updatedData);
      // Now you can send updatedData to the API
      updateNilaiPerkeneaanBE(updatedData);
      return updatedData;
    });
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    stageKey: string,
    seriesKey: string,
    index: number
  ) => {
    const { value } = e.target;
    setTableData((prevData: ApiData) => {
      const updatedData: ApiData | any = { ...prevData };
      const scoresData: number[] | undefined = updatedData?.[stageKey]?.[seriesKey];

      if (!scoresData) {
        console.error("Invalid data format");
        return updatedData;
      }

      scoresData[index] = parseInt(value, 10);
      const total = calculateTotal(scoresData.slice(0, 11));
      scoresData[11] = total;


      return updatedData;
    });
  };
  const handleCheckbox = (
    e: ChangeEvent<HTMLInputElement>,
    stageKey: string,
    index: number
  ) => {
    const { checked } = e.target;
    setTableData((prevData: any) => {
      const updatedData: any = { ...prevData };
      updatedData[stageKey].checkmarks[index] = checked;
      return updatedData;
    });
  };
  const calculateTotal = (seriesValues: number[]) => {
    return seriesValues
      .slice(0, 11)
      .reduce((acc, cur, index) => acc + cur * index, 0);
  };
  // RENDER DATA
  const renderSeries = (stageKey: string | any) => {
    const stageData = tableData[stageKey];
    return Object.entries(stageData)
      .filter(([key]) => key !== "checkmarks")
      .map(([seriesKey, seriesValues], index) => {
        const total = calculateTotal(seriesValues as number[]);
        const isDisabled = total < 0;

        return (
          <React.Fragment key={seriesKey}>
            <tr>
              <td rowSpan={2}>{seriesNames[index]}</td>
              {(seriesValues as number[]).slice(0, 11).map((nilai: number, nilaiIndex: number) => (
                <td key={nilaiIndex}>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={nilai}
                    onChange={(e) =>
                      handleInputChange(e, stageKey, seriesKey, nilaiIndex)
                    }
                  />
                </td>
              ))}
              <td rowSpan={2}>{total}</td>
              <td rowSpan={2}>
                <input
                  type="checkbox"
                  id={`${stageKey}-seri-${index}`}
                  name={`${stageKey}-seri-${index}`}
                  value="benar"
                  checked={stageData.checkmarks[index]}
                  disabled={isDisabled}
                  onChange={(e) => handleCheckbox(e, stageKey, index)}
                />
              </td>
              {/* <td rowSpan={2}>
                <button className='text-sm w-[60px] sm:w-[80px] border border-solid p-2 rounded-xl border-blue-400' onClick={() => handleNextNo(index + 1)}>Next No</button>
              </td> */}
            </tr>
            <tr>
              {(seriesValues as number[]).slice(0, 11).map((nilai: number, nilaiIndex: number) => (
                <td key={nilaiIndex}>{nilai}</td>
              ))}
            </tr>

          </React.Fragment>
        );
      });
  };

  return (
    <section className='flex flex-col gap-8'>
      <Styles>
        <table>
          <thead>
            <tr>
              <th colSpan={1}>Seri</th>
              <th colSpan={11}>Nilai Perkenaan</th>
              <th rowSpan={2}>Jumlah </th>
              <th rowSpan={2}>Hasil </th>
            </tr>
            <tr>
              <th>No Seri</th>
              <th>0</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
              <th>10</th>
            </tr>
          </thead>
          <tbody>{renderSeries("stage_0")}</tbody>
        </table>
      </Styles>
      <form onSubmit={handleUpdateValues}>
        <button className='w-full py-5 text-[#1B79B8] border text-center bg-[#fff] border-[#036BB0] rounded-lg' type='submit' >
          Simpan
        </button>
      </form>
    </section>
  );
};

const Kualifikasi = () => {
  const { examid, scorerid, shooterid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [kualifikasiData, setKualifikasiData] = useState<TableData | any>();
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await api.get(`/super/exam/${examid}/scorer/${scorerid}/shooter/${shooterid}/result/stage0`);
        const apiData = response.data;
        const stage0Data = apiData.data.stage_0;
        console.log(stage0Data)
        setKualifikasiData(stage0Data);
        setIsLoading(false); // Set isLoading to false after data is fetched and set to state
      } catch (error) {
        console.error(error);
        setIsLoading(false); // If there is an error while fetching data, set isLoading to false to show an error message
      }
    };

    fetchTableData();
  }, []);
  return (
    <>
      <Percobaan1 kualifikasiData={kualifikasiData} />
    </>
  )
}

export default Kualifikasi