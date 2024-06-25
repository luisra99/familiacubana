import { sample } from "lodash";
import { faker } from "@faker-js/faker";
const PRODUCT_NAME = [
  "Autonomía y necesidades especiales",
  "Ingresos por fuentes",
  "No vinculado a trabajo remunerado",
  "Ocuación",
  "Acceso a programas de protección social",
  "Situacion de niños y adolescentes",
];
const PRODUCT_COLOR = [
  "#00AB55",
  "#000000",
  "#FFFFFF",
  "#FFC0CB",
  "#FF4842",
  "#1890FF",
  "#94D82D",
  "#FFC107",
];

// ----------------------------------------------------------------------

export const products = [...Array(6)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.string.uuid(),
    cover: `/miembros/card_${setIndex}.jpg`,
    name: PRODUCT_NAME[index],
    price: faker.number.int({ min: 4, max: 99 }),
    priceSale: setIndex % 3 ? null : faker.number.int({ min: 19, max: 29 }),
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(["sale", "new", "", ""]),
  };
});
