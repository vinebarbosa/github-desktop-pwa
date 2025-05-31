import { type FormEvent, useState } from 'react';
import type { CreateRepositoryFormProps } from '.';

export function useCreateRepositoryForm({
  onSubmit,
  onSubmitSuccess,
  onSubmitError
}: Omit<CreateRepositoryFormProps, 'submitSuccessFeedback'>) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isRepositoryCreated, setIsRepositoryCreated] = useState(false);

  // Embora existam soluções mais sofisticadas para formulários, como React Hook Form e Zod,
  // optei por não adicionar bibliotecas extras para um formulário simples com apenas um campo.
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const value = formData.get('name') as string;

    setIsSubmiting(true);

    try {
      await onSubmit({ name: value });
      onSubmitSuccess?.();
      setIsRepositoryCreated(true);
    } catch (error) {
      onSubmitError?.(error as Error);
    } finally {
      setIsSubmiting(false);
    }
  }

  return {
    isSubmiting,
    isRepositoryCreated,
    handleSubmit
  };
}
