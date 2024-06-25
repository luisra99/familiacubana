import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";

export const TextoSimple: IGenericControls = {
  type: "text",
  label: "Texto",
  gridValues: { md: 3 },
  name: "test-texto",
  pattern: /[0-9]/,
  validations: {
    length: { value: 11, message: "el carnet debe tener 11 digitos" },
  },
};
export const Monto: IGenericControls = {
  type: "number",
  label: "Monetario",
  name: "moneda",
  decimalScale: 2,
  format: "finance",
  gridValues: { md: 3 },
};
export const Unidades: IGenericControls = {
  type: "number",
  label: "Unidades",
  name: "unidades",
  decimalScale: 2,
  gridValues: { md: 3 },
  format: "units",
};
export const ChipSelect: IGenericControls = {
  type: "select",
  name: "testchipselect",
  label: "Chips Select",
  multiple: "chips",
  url: "asd",
};
export const CheckSelect: IGenericControls = {
  type: "select",
  name: "testcheckselect",
  label: "Check Select",
  multiple: "check",
  options: [
    { value: "opt1", label: "Opción 1" },
    { value: "opt2", label: "Opción 2" },
  ],
};
export const MultipleSelect: IGenericControls = {
  type: "select",
  name: "testmultipleselect",
  label: "Select Multiple",
  multiple: "native",
  options: [
    { value: "opt1", label: "Opción 1" },
    { value: "opt2", label: "Opción 2" },
  ],
};
export const SelectSimple: IGenericControls = {
  type: "select",
  name: "testsimpleselect",
  label: "Select",
  options: [
    { value: "opt1", label: "Opción 1" },
    { value: "opt2", label: "Opción 2" },
  ],
};
export const AutocompleteMultiple: IGenericControls = {
  type: "autocomplete",
  name: "test-autocompletemultiple",
  label: "Autocomplete",
  gridValues: { md: 3 },
  multiple: "native",
  url: "asd",
};
export const AutocompleteSimple: IGenericControls = {
  type: "autocomplete",
  name: "test-autocomplete-simple",
  label: "Autocomplete",
  options: [
    { value: "opt1", label: "Opción 1" },
    { value: "opt2", label: "Opción 2" },
  ],
};
export const Fecha: IGenericControls = {
  type: "date",
  label: "Fecha",
  name: "fecha",
};
export const Hora: IGenericControls = {
  type: "time",
  label: "Hora",
  name: "Hora",
};
export const GeneroVertical: IGenericControls = {
  type: "radio",
  label: "Género",
  name: "radiouno",
  radios: [
    { idconcepto: "1", denominacion: "Hombre" },
    { idconcepto: "2", denominacion: "Mujer" },
  ],
};
export const GeneroHorizontal: IGenericControls = {
  type: "radio",
  label: "Género",
  name: "radiodos",
  radios: [
    { idconcepto: "1", denominacion: "Hombre" },
    { idconcepto: "2", denominacion: "Mujer" },
  ],
  direction: "row",
  labelPlacement: "top",
};
export const Terminos: IGenericControls = {
  type: "check",
  label: "Términos y condiciones",
  name: "terms",
  defaultValue: true,
};
export const Favorito: IGenericControls = {
  type: "check",
  label: "Favorito",
  name: "fav",
  customIcons: {
    outlinedIcon: "FavoriteBorder",
    filledIcon: "Favorite",
  },
  color: "red",
};
export const Activar: IGenericControls = {
  type: "switch",
  label: "Activar",
  name: "activar",
  defaultValue: true,
};
export const Peligro: IGenericControls = {
  type: "switch",
  label: "Peligro",
  name: "danger",
  color: "red",
};
export const Volumen: IGenericControls = {
  type: "slider",
  label: "Volumen",
  name: "volumen",
  min: 0,
  startIcon: "VolumeDown",
  endIcon: "VolumeUp",
  max: 100,
};
export const Limite: IGenericControls = {
  type: "slider",
  label: "Limite",
  name: "limit",
  min: 20,
  max: 120,
};
export const Rating: IGenericControls = {
  type: "rating",
  label: "Rating",
  name: "rating",
};
export const Likes: IGenericControls = {
  type: "rating",
  label: "Likes",
  customIcons: { outlinedIcon: "FavoriteOutlined", filledIcon: "Favorite" },
  name: "likes",
  color: "red",
  max: 10,
};
