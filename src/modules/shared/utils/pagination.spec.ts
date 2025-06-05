import { getApiPageNumber, getPaginationStatus } from './pagination';

const FIRST_PAGE = 1;

describe('Paginação', () => {
  describe('getApiPageNumber', () => {
    it.each([undefined, null, Number.NaN, 'abc', {}, [], false])(
      'deve retornar FIRST_PAGE quando o parâmetro é: %s',
      (param) => {
        const result = getApiPageNumber(param as any);
        expect(result).toBe(FIRST_PAGE);
      }
    );

    it.each([
      [2, 2],
      ['3', 3]
    ])('deve retornar o número correto da página para valores válidos: %s', (param, expected) => {
      const result = getApiPageNumber(param as any);
      expect(result).toBe(expected);
    });

    it.each([
      [0, FIRST_PAGE],
      [-1, FIRST_PAGE],
      ['0', FIRST_PAGE],
      ['-5', FIRST_PAGE]
    ])(
      'deve retornar FIRST_PAGE para valores menores ou iguais a FIRST_PAGE: %s',
      (param, expected) => {
        const result = getApiPageNumber(param as any);
        expect(result).toBe(expected);
      }
    );
  });

  describe('getPaginationStatus', () => {
    it('deve indicar primeira e última página quando não há linkHeader', () => {
      const status = getPaginationStatus({ currentPage: 1, linkHeader: null });
      expect(status).toEqual({
        isFirstPage: true,
        isLastPage: true,
        page: 1,
        hasNext: false,
        hasPrev: false,
        firstPage: 1,
        lastPage: 1
      });
    });

    it("deve indicar não ser a última página quando existe link 'next'", () => {
      const linkHeader =
        '<https://api.example.com/items?page=2&per_page=10>; rel="next", <https://api.example.com/items?page=5&per_page=10>; rel="last"';
      const status = getPaginationStatus({ currentPage: 1, linkHeader });
      expect(status.isFirstPage).toBe(true);
      expect(status.isLastPage).toBe(false);
      expect(status.hasNext).toBe(true);
      expect(status.hasPrev).toBe(false);
      expect(status.firstPage).toBe(1);
      expect(status.lastPage).toBe(5);
    });

    it("deve indicar ser a última página quando não existe link 'next'", () => {
      const linkHeader =
        '<https://api.example.com/items?page=1&per_page=10>; rel="first", <https://api.example.com/items?page=3&per_page=10>; rel="last"';
      const status = getPaginationStatus({ currentPage: 3, linkHeader });
      expect(status.isFirstPage).toBe(false);
      expect(status.isLastPage).toBe(true);
      expect(status.hasNext).toBe(false);
      expect(status.hasPrev).toBe(true);
      expect(status.firstPage).toBe(1);
      expect(status.lastPage).toBe(3);
    });

    it('deve lidar com linkHeader vazio', () => {
      const status = getPaginationStatus({ currentPage: 2, linkHeader: '' });
      expect(status.isFirstPage).toBe(false);
      expect(status.isLastPage).toBe(true);
      expect(status.hasNext).toBe(false);
      expect(status.hasPrev).toBe(true);
      expect(status.firstPage).toBe(1);
      expect(status.lastPage).toBe(2);
    });

    it('deve lidar com linkHeader sem last', () => {
      const linkHeader = '<https://api.example.com/items?page=2&per_page=10>; rel="next"';
      const status = getPaginationStatus({ currentPage: 1, linkHeader });
      expect(status.isFirstPage).toBe(true);
      expect(status.isLastPage).toBe(false);
      expect(status.hasNext).toBe(true);
      expect(status.hasPrev).toBe(false);
      expect(status.firstPage).toBe(1);
      expect(status.lastPage).toBe(1);
    });

    it('deve lidar com linkHeader malformado', () => {
      const linkHeader = 'malformed header';
      const status = getPaginationStatus({ currentPage: 2, linkHeader });
      expect(status.isFirstPage).toBe(false);
      expect(status.isLastPage).toBe(true);
      expect(status.hasNext).toBe(false);
      expect(status.hasPrev).toBe(true);
      expect(status.firstPage).toBe(1);
      expect(status.lastPage).toBe(2);
    });
  });
});
