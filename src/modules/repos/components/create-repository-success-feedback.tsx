import { Button } from "@/modules/shared/components/ui/button";
import { DialogClose } from "@/modules/shared/components/ui/dialog";

export function CreateRepositorySuccessFeedback() {
  return (
    <div className='px-8 py-16 space-y-6 flex flex-col items-center'>
      <p className="mb-4 text-2xl font-medium">Teu repositório foi criado!</p>
      <DialogClose asChild>
        <Button>Aí simmm!</Button>
      </DialogClose>
    </div>
  );
}
