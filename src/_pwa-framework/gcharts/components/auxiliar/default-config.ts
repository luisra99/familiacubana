export const barLineBaseOptions = {
  legend: {
    top: "bottom",
    padding: 10,
  },
  tooltip: {
    trigger: "item",
  },
  grid: {
    left: "10%",
    right: "10%",
    bottom: "20%",
    top: "5%",
  },
  emphasis: {
    itemStyle: {
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowColor: "rgba(0, 0, 0, 0.5)",
    },
  },
};
export const pieBaseOptions = {
  tooltip: {
    trigger: "item",
  },
  emphasis: {
    itemStyle: {
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowColor: "rgba(0, 0, 0, 0.5)",
    },
  },
  grid: {
    left: "10%",
    right: "10%",
    bottom: "20%",
    top: "5%",
  },
  legend: {},
};
