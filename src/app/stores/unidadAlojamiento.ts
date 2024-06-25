import { atom, useRecoilState } from "recoil";

const unidadAlojamientoAtom = atom<any>({
  key: "unidad-alojamineto-state",
  default: false,
});

export function useUnidadAlojamiento(): any {
  const [unidadAlojamiento, setUnidadAlojamiento] = useRecoilState(
    unidadAlojamientoAtom
  );

  function select() {}

  async function create() {}

  async function edit() {}

  async function remove() {}

  return [];
}
