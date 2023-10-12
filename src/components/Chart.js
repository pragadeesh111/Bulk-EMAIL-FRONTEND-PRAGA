import React from "react";
import Chart from "react-apexcharts";

const ChartPage = () => {
  let options = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: "Email Sent",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  let donutData = {
    series: [30, 40, 45, 50, 49, 60, 70, 91],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["A", "B", "C", "D", "E", "F", "G", "H"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  return (
    <>
      <Chart
        options={options}
        series={donutData}
        type="donut"
        width="100%"
        height="500"
      />
    </>
  );
};

export default ChartPage;
