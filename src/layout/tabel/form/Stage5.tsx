import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components';

const Styles = styled.div`
input[type='number']{
    text-align: center;
    width: 3rem;
    height: 2rem;
} 
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 0;
  overflow : scroll;
@media (min-width : 600px) {
    table {
      width: 800px !important;
    }
  }
  table {
    width: 500px;
    text-align: center;
    border-spacing: 0;
    border-right: 2px solid #D5E4F0;
    border-left: 2px solid #D5E4F0;
    border-bottom: 2px solid #D5E4F0;
    border-radius : 12px;
    tr {
      :last-child {
        tr{
            text-align: center;
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
      margin: 0;
      padding: 0.5rem;
      border-bottom: 2px solid #D5E4F0;
      border-right: 2px solid #D5E4F0;
      border-left: 2px solid #D5E4F0;
    }
    td {
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


interface DataItem {
    no: string;
    nilaiPerkenaanA: number;
    nilaiPerkenaanC: number;
    nilaiPerkenaanD: number;
    waktu: {
        minutes: string;
        seconds: string;
        milliseconds: string;
    };
    hasil: boolean;
}

const Percobaan1 = () => {
    const [data, setData] = useState([
        {
            no: "1A",
            nilaiPerkenaanA: 0,
            nilaiPerkenaanC: 0,
            nilaiPerkenaanD: 0,
            waktu: {
                minutes: "00",
                seconds: "00",
                milliseconds: "00"
            },
            hasil: false
        },
        {
            no: "1B",
            nilaiPerkenaanA: 0,
            nilaiPerkenaanC: 0,
            nilaiPerkenaanD: 0,
            waktu: {
                minutes: "00",
                seconds: "00",
                milliseconds: "00"
            },
            hasil: false
        },
        {
            no: "1C",
            nilaiPerkenaanA: 0,
            nilaiPerkenaanC: 0,
            nilaiPerkenaanD: 0,
            waktu: {
                minutes: "00",
                seconds: "00",
                milliseconds: "00"
            },
            hasil: false
        },
        {
            no: "2A",
            nilaiPerkenaanA: 0,
            nilaiPerkenaanC: 0,
            nilaiPerkenaanD: 0,
            waktu: {
                minutes: "00",
                seconds: "00",
                milliseconds: "00"
            },
            hasil: false
        },
        {
            no: "2B",
            nilaiPerkenaanA: 0,
            nilaiPerkenaanC: 0,
            nilaiPerkenaanD: 0,
            waktu: {
                minutes: "00",
                seconds: "00",
                milliseconds: "00"
            },
            hasil: false
        },
        {
            no: "2C",
            nilaiPerkenaanA: 0,
            nilaiPerkenaanC: 0,
            nilaiPerkenaanD: 0,
            waktu: {
                minutes: "00",
                seconds: "00",
                milliseconds: "00"
            },
            hasil: false
        },
    ]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string, field: string) => {
        const { value } = e.target;

        const updatedData = data.map((item) => {
            if (item.no === id) {
                return {
                    ...item,
                    [field]: +value
                };
            }
            return item;
        });

        const totalAlpha = updatedData.reduce(
            (sum, item) => sum + item.nilaiPerkenaanA,
            0
        );
        const totalCharlie = updatedData.reduce(
            (sum, item) => sum + item.nilaiPerkenaanC,
            0
        );
        const totalDelta = updatedData.reduce(
            (sum, item) => sum + item.nilaiPerkenaanD,
            0
        );

        if (totalAlpha <= 12 && totalCharlie <= 12 && totalDelta <= 12) {
            setData(updatedData);
            console.log(updatedData); // Cetak data tabel ke konsol
        }
    };

    const handleWaktuChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof DataItem["waktu"]) => {
        const { value } = e.target;
        let updatedValue = value;

        if (value.length === 1) {
            updatedValue = "0" + value;
        }

        const updatedData = [...data];
        updatedData[index].waktu[field] = updatedValue;
        // Set waktu dan hasil yang sama untuk pasangan nomor seri
        if (index % 2 === 0) {
            updatedData[index + 1].waktu[field] = value;
            updatedData[index + 1].hasil = updatedData[index].hasil;
        } else {
            updatedData[index - 1].waktu[field] = value;
            updatedData[index - 1].hasil = updatedData[index].hasil;
        }
        setData(updatedData);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { checked } = e.target;
        const updatedData = [...data];
        updatedData[index].hasil = checked;
        // Set nilai checkbox yang sama untuk pasangan nomor seri
        if (index % 2 === 0) {
            updatedData[index + 1].hasil = checked;
        } else {
            updatedData[index - 1].hasil = checked;
        }
        setData(updatedData);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th colSpan={6}>SESI PERCOBAAN 1</th>
                </tr>
                <tr>
                    <th rowSpan={2}>No</th>
                    <th colSpan={3}>Nilai Perkenaan</th>
                    <th rowSpan={2}>Waktu</th>
                    <th rowSpan={2}>Hasil</th>
                </tr>
                <tr>
                    <th>A</th>
                    <th>C</th>
                    <th>D</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td rowSpan={1}>{item.no}</td>
                        <td>
                            <input
                                type="number"
                                min={0}
                                max={2 - item.nilaiPerkenaanC - item.nilaiPerkenaanD}
                                value={item.nilaiPerkenaanA}
                                onChange={(e) =>
                                    handleInputChange(e, item.no, "nilaiPerkenaanA")
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min={0}
                                max={2 - item.nilaiPerkenaanA - item.nilaiPerkenaanD}
                                value={item.nilaiPerkenaanC}
                                onChange={(e) =>
                                    handleInputChange(e, item.no, "nilaiPerkenaanC")
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min={0}
                                max={2 - item.nilaiPerkenaanA - item.nilaiPerkenaanC}
                                value={item.nilaiPerkenaanD}
                                onChange={(e) =>
                                    handleInputChange(e, item.no, "nilaiPerkenaanD")
                                }
                            />
                        </td>
                        {item.no !== "1B" &&
                            item.no !== "2B" &&
                            item.no !== "3B" &&
                            item.no !== "1C" &&
                            item.no !== "2C" &&
                            item.no !== "3C" && (
                                <>
                                    <td rowSpan={3}>
                                        <div className="stopwatch">
                                            <input
                                                type="number"
                                                name="minute"
                                                max="59"
                                                min="0"
                                                placeholder="mm"
                                                value={item.waktu.minutes}
                                                onChange={(e) => handleWaktuChange(e, index, "minutes")}
                                            />
                                            :
                                            <input
                                                type="number"
                                                name="second"
                                                max="59"
                                                min="0"
                                                placeholder="ss"
                                                value={item.waktu.seconds}
                                                onChange={(e) => handleWaktuChange(e, index, "seconds")}
                                            />
                                            :
                                            <input
                                                type="number"
                                                name="millisecond"
                                                max="99"
                                                min="0"
                                                placeholder="SS"
                                                value={item.waktu.milliseconds}
                                                onChange={(e) =>
                                                    handleWaktuChange(e, index, "milliseconds")
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td rowSpan={3}>
                                        <input
                                            type="checkbox"
                                            id={`hasil-${index}`}
                                            name="hasil"
                                            checked={item.hasil}
                                            onChange={(e) => handleCheckboxChange(e, index)}
                                        />
                                    </td>
                                </>
                            )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const Percobaan2 = () => {
    const [data, setData] = useState([
        {
            no: "1A",
            nilaiPerkenaanA: 0,
            nilaiPerkenaanC: 0,
            nilaiPerkenaanD: 0,
            waktu: {
                minutes: "00",
                seconds: "00",
                milliseconds: "00"
            },
            hasil: false
        },
        {
            no: "1B",
            nilaiPerkenaanA: 0,
            nilaiPerkenaanC: 0,
            nilaiPerkenaanD: 0,
            waktu: {
                minutes: "00",
                seconds: "00",
                milliseconds: "00"
            },
            hasil: false
        },
        {
            no: "1C",
            nilaiPerkenaanA: 0,
            nilaiPerkenaanC: 0,
            nilaiPerkenaanD: 0,
            waktu: {
                minutes: "00",
                seconds: "00",
                milliseconds: "00"
            },
            hasil: false
        },
        {
            no: "2A",
            nilaiPerkenaanA: 0,
            nilaiPerkenaanC: 0,
            nilaiPerkenaanD: 0,
            waktu: {
                minutes: "00",
                seconds: "00",
                milliseconds: "00"
            },
            hasil: false
        },
        {
            no: "2B",
            nilaiPerkenaanA: 0,
            nilaiPerkenaanC: 0,
            nilaiPerkenaanD: 0,
            waktu: {
                minutes: "00",
                seconds: "00",
                milliseconds: "00"
            },
            hasil: false
        },
        {
            no: "2C",
            nilaiPerkenaanA: 0,
            nilaiPerkenaanC: 0,
            nilaiPerkenaanD: 0,
            waktu: {
                minutes: "00",
                seconds: "00",
                milliseconds: "00"
            },
            hasil: false
        },
    ]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string, field: string) => {
        const { value } = e.target;

        const updatedData = data.map((item) => {
            if (item.no === id) {
                return {
                    ...item,
                    [field]: +value
                };
            }
            return item;
        });

        const totalAlpha = updatedData.reduce(
            (sum, item) => sum + item.nilaiPerkenaanA,
            0
        );
        const totalCharlie = updatedData.reduce(
            (sum, item) => sum + item.nilaiPerkenaanC,
            0
        );
        const totalDelta = updatedData.reduce(
            (sum, item) => sum + item.nilaiPerkenaanD,
            0
        );

        if (totalAlpha <= 12 && totalCharlie <= 12 && totalDelta <= 12) {
            setData(updatedData);
            console.log(updatedData); // Cetak data tabel ke konsol
        }
    };

    const handleWaktuChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof DataItem["waktu"]) => {
        const { value } = e.target;
        let updatedValue = value;

        if (value.length === 1) {
            updatedValue = "0" + value;
        }

        const updatedData = [...data];
        updatedData[index].waktu[field] = updatedValue;
        // Set waktu dan hasil yang sama untuk pasangan nomor seri
        if (index % 2 === 0) {
            updatedData[index + 1].waktu[field] = value;
            updatedData[index + 1].hasil = updatedData[index].hasil;
        } else {
            updatedData[index - 1].waktu[field] = value;
            updatedData[index - 1].hasil = updatedData[index].hasil;
        }
        setData(updatedData);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { checked } = e.target;
        const updatedData = [...data];
        updatedData[index].hasil = checked;
        // Set nilai checkbox yang sama untuk pasangan nomor seri
        if (index % 2 === 0) {
            updatedData[index + 1].hasil = checked;
        } else {
            updatedData[index - 1].hasil = checked;
        }
        setData(updatedData);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th colSpan={6}>SESI PERCOBAAN 2</th>
                </tr>
                <tr>
                    <th rowSpan={2}>No</th>
                    <th colSpan={3}>Nilai Perkenaan</th>
                    <th rowSpan={2}>Waktu</th>
                    <th rowSpan={2}>Hasil</th>
                </tr>
                <tr>
                    <th>A</th>
                    <th>C</th>
                    <th>D</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td rowSpan={1}>{item.no}</td>
                        <td>
                            <input
                                type="number"
                                min={0}
                                max={2 - item.nilaiPerkenaanC - item.nilaiPerkenaanD}
                                value={item.nilaiPerkenaanA}
                                onChange={(e) =>
                                    handleInputChange(e, item.no, "nilaiPerkenaanA")
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min={0}
                                max={2 - item.nilaiPerkenaanA - item.nilaiPerkenaanD}
                                value={item.nilaiPerkenaanC}
                                onChange={(e) =>
                                    handleInputChange(e, item.no, "nilaiPerkenaanC")
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min={0}
                                max={2 - item.nilaiPerkenaanA - item.nilaiPerkenaanC}
                                value={item.nilaiPerkenaanD}
                                onChange={(e) =>
                                    handleInputChange(e, item.no, "nilaiPerkenaanD")
                                }
                            />
                        </td>
                        {item.no !== "1B" &&
                            item.no !== "2B" &&
                            item.no !== "3B" &&
                            item.no !== "1C" &&
                            item.no !== "2C" &&
                            item.no !== "3C" && (
                                <>
                                    <td rowSpan={3}>
                                        <div className="stopwatch">
                                            <input
                                                type="number"
                                                name="minute"
                                                max="59"
                                                min="0"
                                                placeholder="mm"
                                                value={item.waktu.minutes}
                                                onChange={(e) => handleWaktuChange(e, index, "minutes")}
                                            />
                                            :
                                            <input
                                                type="number"
                                                name="second"
                                                max="59"
                                                min="0"
                                                placeholder="ss"
                                                value={item.waktu.seconds}
                                                onChange={(e) => handleWaktuChange(e, index, "seconds")}
                                            />
                                            :
                                            <input
                                                type="number"
                                                name="millisecond"
                                                max="99"
                                                min="0"
                                                placeholder="SS"
                                                value={item.waktu.milliseconds}
                                                onChange={(e) =>
                                                    handleWaktuChange(e, index, "milliseconds")
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td rowSpan={3}>
                                        <input
                                            type="checkbox"
                                            id={`hasil-${index}`}
                                            name="hasil"
                                            checked={item.hasil}
                                            onChange={(e) => handleCheckboxChange(e, index)}
                                        />
                                    </td>
                                </>
                            )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const Stage5 = () => {
    return (
        <Styles>
            <Percobaan1 />
            <Percobaan2 />
        </Styles>
    )
}

export default Stage5