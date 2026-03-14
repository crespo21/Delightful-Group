import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Button from '../../components/ui/Button';

describe('Button', () => {
  it('renders children text', () => {
    render(
      <MemoryRouter>
        <Button>Click me</Button>
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('uses primary variant styles by default', () => {
    render(
      <MemoryRouter>
        <Button>Primary</Button>
      </MemoryRouter>
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-green-600');
  });

  it('applies secondary variant styles', () => {
    render(
      <MemoryRouter>
        <Button variant="secondary">Secondary</Button>
      </MemoryRouter>
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-gray-800');
  });

  it('applies outline variant styles', () => {
    render(
      <MemoryRouter>
        <Button variant="outline">Outline</Button>
      </MemoryRouter>
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('border-green-600');
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <MemoryRouter>
        <Button onClick={handleClick}>Click</Button>
      </MemoryRouter>
    );
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('renders as a link when href is provided', () => {
    render(
      <MemoryRouter>
        <Button href="/about">About</Button>
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
  });

  it('sets the correct button type', () => {
    render(
      <MemoryRouter>
        <Button type="submit">Submit</Button>
      </MemoryRouter>
    );
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
