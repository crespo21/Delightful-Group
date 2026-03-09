import { render, screen } from '@testing-library/react';
import Logo from '../../components/ui/Logo';

describe('Logo', () => {
  it('renders the logo image with correct alt text', () => {
    render(<Logo />);
    const img = screen.getByRole('img', { name: /delightfulgroup logo/i });
    expect(img).toBeInTheDocument();
  });

  it('renders the brand name', () => {
    render(<Logo />);
    expect(screen.getByText('DelightfulGroup')).toBeInTheDocument();
  });

  it('applies footer styles when isFooter is true', () => {
    render(<Logo isFooter />);
    const brandName = screen.getByText('DelightfulGroup');
    expect(brandName.className).toContain('text-white');
  });

  it('uses default (header) styles when isFooter is false', () => {
    render(<Logo />);
    const brandName = screen.getByText('DelightfulGroup');
    expect(brandName.className).toContain('text-green-600');
  });
});
