import { render, screen } from '@testing-library/react';
import { CreateRepositoryForm } from './create-repository-form';

import { userEvent } from '@testing-library/user-event';

import { cleanup } from '@testing-library/react';

const mockOnSubmit = vi.fn();
const mockOnSubmitSuccess = vi.fn();
const mockOnSubmitError = vi.fn();

describe('CreateRepositoryForm', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnSubmitSuccess.mockClear();
    mockOnSubmitError.mockClear();

    render(
      <CreateRepositoryForm
        onSubmit={mockOnSubmit}
        onSubmitSuccess={mockOnSubmitSuccess}
        onSubmitError={mockOnSubmitError}
      />
    );
  });

  async function fillAndSubmitRepositoryForm() {
    const nameInput = screen.getByLabelText('Dê um nome ao seu repositório');
    const submitButton = screen.getByRole('button', { name: 'Criar' });

    await userEvent.type(nameInput, 'meu-repo');
    await userEvent.click(submitButton);
  }

  describe('Renderização Inicial e Estado Padrão', () => {
    it('Deve renderizar o componente corretamente', () => {
      const form = screen.getByTestId('create-repository-form');
      expect(form).toBeInTheDocument();

      const nameInput = screen.getByLabelText('Dê um nome ao seu repositório');
      expect(form).toContainElement(nameInput);

      const submitButton = screen.getByRole('button', { name: 'Criar' });
      expect(form).toContainElement(submitButton);
    });
  });

  describe('Validação de Formulário', () => {
    it('Não deve ser possível enviar o formulário sem preencher o nome do repositório', async () => {
      const nameInput = screen.getByLabelText('Dê um nome ao seu repositório');
      expect(nameInput).toHaveValue('');

      const submitButton = screen.getByRole('button', { name: 'Criar' });
      await userEvent.click(submitButton);

      expect(mockOnSubmit).not.toHaveBeenCalled();
      expect(nameInput).toBeInvalid();
    });
  });

  describe('Submissão do Formulário (Cenário de Sucesso', () => {
    it('Deve chamar onSubmit com os dados corretos ao submeter o formulário', async () => {
      await fillAndSubmitRepositoryForm();

      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith({ name: 'meu-repo' });
    });

    it('Deve exibir o estado de submissão no botão durante o envio', async () => {
      const deferred = () => {
        let resolve: () => void;
        const promise = new Promise<void>((res) => {
          resolve = res;
        });
        return { promise, resolve: resolve! };
      };

      const submitDeferred = deferred();
      mockOnSubmit.mockImplementation(() => submitDeferred.promise);

      await fillAndSubmitRepositoryForm();

      expect(screen.getByRole('button')).toHaveTextContent('Aguarde...');

      submitDeferred.resolve();

      await screen.findByRole('button', { name: 'Criar' });
    });

    it('Deve chamar onSubmitSuccess após a submissão bem-sucedida', async () => {
      await fillAndSubmitRepositoryForm();
      expect(mockOnSubmitSuccess).toBeCalledTimes(1);
    });

    it('Deve renderizar submitSuccessFeedback após a submissão bem-sucedida (se fornecido)', async () => {
      cleanup();

      const SubmitSuccessFeedback = () => <p>Formulário enviado com sucesso</p>;

      render(
        <CreateRepositoryForm
          onSubmit={mockOnSubmit}
          submitSuccessFeedback={SubmitSuccessFeedback}
        />
      );

      expect(screen.queryByText('Formulário enviado com sucesso')).not.toBeInTheDocument();

      await fillAndSubmitRepositoryForm();

      expect(screen.getByText('Formulário enviado com sucesso')).toBeInTheDocument();
    });
  });

  describe('Submissão do Formulário (Cenário de Erro)', () => {
    it('Deve chamar onSubmitError quando a submissão falhar', async () => {
      const error = new Error('Erro ao criar repositório');
      mockOnSubmit.mockRejectedValueOnce(error);

      await fillAndSubmitRepositoryForm();

      expect(mockOnSubmitError).toHaveBeenCalledTimes(1);
      expect(mockOnSubmitError).toHaveBeenCalledWith(error);
    });
  });
});
