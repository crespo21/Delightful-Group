import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Lightweight smoke test for individual page components.
// We mock heavy dependencies to keep unit tests fast.
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, key) =>
        ({ children, ...rest }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => {
          const Tag = String(key) as keyof JSX.IntrinsicElements;
          return <Tag {...(rest as object)}>{children}</Tag>;
        },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('three', () => ({}));
vi.mock('../components/ThreeD/Scene', () => ({
  default: () => <div data-testid="3d-scene" />,
}));

import Contact from '../pages/Contact';
import About from '../pages/About';

describe('Page routing smoke tests', () => {
  it('renders the Contact page', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );
    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  });

  it('renders the About page', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/about/i).length).toBeGreaterThan(0);
  });

  it('Contact page contains a form', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });
});
