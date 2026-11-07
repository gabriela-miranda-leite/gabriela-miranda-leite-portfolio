import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Container } from '../Container';

expect.extend(toHaveNoViolations);

describe('Container', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Container>
        <p>Conteúdo</p>
      </Container>
    );
    expect(getByText('Conteúdo')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Container>
        <p>Conteúdo</p>
      </Container>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
