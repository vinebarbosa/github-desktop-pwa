import { getApiPageNumber } from "./pagination"

const FIRST_PAGE = 1;

describe("Paginação", () => {
  describe("getApiPageNumber", () => {
    it.each([
      undefined,
      null,
      Number.NaN,
      "abc",
      {},
      [],
      false
    ])("deve retornar FIRST_PAGE quando o parâmetro é: %s", (param) => {
      const result = getApiPageNumber(param as any);
      expect(result).toBe(FIRST_PAGE);
    });

    it.each([
      [2, 2],
      ["3", 3],
    ])("deve retornar o número correto da página para valores válidos: %s", (param, expected) => {
      const result = getApiPageNumber(param as any);
      expect(result).toBe(expected);
    });

    it.each([
      [0, FIRST_PAGE],
      [-1, FIRST_PAGE],
      ["0", FIRST_PAGE],
      ["-5", FIRST_PAGE],
    ])("deve retornar FIRST_PAGE para valores menores ou iguais a FIRST_PAGE: %s", (param, expected) => {
      const result = getApiPageNumber(param as any);
      expect(result).toBe(expected);
    });
  })

});
