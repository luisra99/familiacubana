import { atom, useRecoilState } from "recoil";

const hogarAtom = atom<any>({
  key: "hogar-state",
  default: false,
});

export function useHogar(): any {
  const [hogar, setHogar] = useRecoilState(hogarAtom);

  function select() {}

  async function create() {}

  async function edit() {}

  async function remove() {}

  return [];
}
