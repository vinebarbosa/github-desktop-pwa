'use client';

import type { ElementType } from 'react';

import { Button } from '@/modules/shared/components/ui/button';
import { useCreateRepositoryForm } from './use-create-repository-form';

export interface CreateRepositoryFormProps {
  onSubmit: (data: { name: string }) => Promise<void>;
  onSubmitSuccess?: () => void;
  onSubmitError?: (error: Error) => void;
  submitSuccessFeedback?: ElementType;
}

export function CreateRepositoryForm({
  onSubmit,
  onSubmitSuccess,
  onSubmitError,
  submitSuccessFeedback: SubmitSuccessFeedback
}: CreateRepositoryFormProps) {
  const { isSubmiting, isRepositoryCreated, handleSubmit } = useCreateRepositoryForm({
    onSubmit,
    onSubmitSuccess,
    onSubmitError
  });

  if (isRepositoryCreated && SubmitSuccessFeedback) {
    return <SubmitSuccessFeedback />;
  }

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={handleSubmit}
      data-testid="create-repository-form"

    >
      <div className="flex flex-col w-full items-center px-8 py-16 space-y-6">
        <label htmlFor="name" className="font-medium text-sm leading-5 tracking-[1%]">
          Dê um nome ao seu repositório
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="
            font-bold text-2xl leading-5 tracking-[1%] text-center h-9 p-2 w-full
            focus:outline-none
            inset-shadow-sm
          "
          required
        />
      </div>
      <Button className="my-2" disabled={isSubmiting}>
        {isSubmiting ? 'Aguarde...' : 'Criar'}
      </Button>
    </form>
  );
}
