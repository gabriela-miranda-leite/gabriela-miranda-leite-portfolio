/**
 * Datas de referência da trajetória profissional. Atualizar aqui propaga
 * automaticamente para os textos que mencionam "X anos" no site.
 */
const CAREER_START = new Date('2021-06-01');
const STONE_START = new Date('2023-09-01');

function yearsSince(start: Date, now: Date = new Date()): number {
  let years = now.getFullYear() - start.getFullYear();
  const anniversary = new Date(now.getFullYear(), start.getMonth(), start.getDate());
  if (now < anniversary) years -= 1;
  return years;
}

export function getCareerYears(now?: Date): number {
  return yearsSince(CAREER_START, now);
}

export function getStoneYears(now?: Date): number {
  return yearsSince(STONE_START, now);
}
