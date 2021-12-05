export type ErrorMessageType = {
  required?: { value: boolean; message?: string; };
  minLength?: { value: number; message: string; };
  maxLength?: { value: number; message: string; };
}
