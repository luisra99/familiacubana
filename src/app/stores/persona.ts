import { atom, useRecoilState } from "recoil";

const personaAtom = atom<any>({
  key: "persona-state",
  default: false,
});

export function usePersona(): any {
  const [persona, setPersona] = useRecoilState(personaAtom);

  function select() {}

  async function create() {}

  async function edit() {}

  async function remove() {}

  return [];
}
