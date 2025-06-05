'use client';

import { Button } from '@/modules/shared/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/modules/shared/components/ui/dialog';
import { luizaHubServiceFactory } from '@/modules/shared/factories/luizahub-service-factory';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { revalidateUserRepositoriesAction } from '../server-actions/revalidate-user-repositories-action';
import { CreateRepositoryForm } from './create-repository-form';
import { CreateRepositorySuccessFeedback } from './create-repository-success-feedback';

export function CreateRepositoryDialog() {
  const { data: session } = useSession();

  const service = luizaHubServiceFactory();

  const handleCreateRepository = useCallback(
    async (data: { name: string }) => {
      await service.createRepository({
        name: data.name,
        authorizationToken: session?.accessToken
      });
    },
    [session?.accessToken, service]
  );

  function handleCreateRepositoryError(error: Error) {
    toast.error(error.message, { duration: 5000 });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Criar repositório</Button>
      </DialogTrigger>
      <DialogContent className="pb-6 pt-14 px-4">
        <CreateRepositoryForm
          onSubmit={handleCreateRepository}
          submitSuccessFeedback={CreateRepositorySuccessFeedback}
          onSubmitSuccess={revalidateUserRepositoriesAction}
          onSubmitError={handleCreateRepositoryError}
        />
      </DialogContent>
    </Dialog>
  );
}
