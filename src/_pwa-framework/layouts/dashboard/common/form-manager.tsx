import useFormManager from "@/_pwa-framework/hooks/form/use-form-manager";

export default function FormManager({ children }: any) {
  useFormManager();
  return children;
}
