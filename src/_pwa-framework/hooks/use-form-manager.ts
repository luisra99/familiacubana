import { useRef, useState } from 'react';

export default function useFormManager() {
  const formRef = useRef<any>();
  const [formModalState, setState] = useState<boolean>(false);
  const handleShowForm = () => {
    setState(!formModalState);
  };
  return {
    formRef,
    handleShowForm,
    formModalState,
  };
}
