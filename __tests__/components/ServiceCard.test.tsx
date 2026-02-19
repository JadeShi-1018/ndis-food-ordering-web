import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ServiceCard from '../../app/select-service/ServiceCard';
import { FaUtensils } from 'react-icons/fa';

describe('ServiceCard Component', () => {
  const defaultProps = {
    title: '送餐服務',
    description: '我們提供包天數訂餐、送餐服務。',
    image: '/Images/mealService.jpg',
    icon: <FaUtensils />,
    available: true,
  };

  it('renders service card with all information', () => {
    render(<ServiceCard {...defaultProps} />);

    expect(screen.getByText('送餐服務')).toBeInTheDocument();
    expect(screen.getByText('我們提供包天數訂餐、送餐服務。')).toBeInTheDocument();
    expect(screen.getByText('選　擇')).toBeInTheDocument();
  });

  it('renders available service with enabled button', () => {
    render(<ServiceCard {...defaultProps} available={true} />);

    const selectButton = screen.getByText('選　擇');
    expect(selectButton).toBeInTheDocument();
    expect(selectButton).not.toBeDisabled();
    expect(selectButton).toHaveClass('text-black', 'border-black', 'bg-white');
  });

  it('renders unavailable service with disabled button', () => {
    render(<ServiceCard {...defaultProps} available={false} />);

    const selectButton = screen.getByText('選　擇');
    expect(selectButton).toBeInTheDocument();
    expect(selectButton).toBeDisabled();
    expect(selectButton).toHaveClass('text-black', 'border-black', 'bg-gray-200', 'cursor-not-allowed');
  });

  it('displays fallback description when no description provided', () => {
    const propsWithoutDescription = { ...defaultProps };
    delete propsWithoutDescription.description;

    render(<ServiceCard {...propsWithoutDescription} />);

    expect(screen.getByText('Coming soon...')).toBeInTheDocument();
  });

  it('applies correct background image', () => {
    render(<ServiceCard {...defaultProps} />);

    const card = screen.getByText('送餐服務').closest('div');
    expect(card).toHaveStyle({
      backgroundImage: 'url(/Images/mealService.jpg)',
    });
  });

  it('renders icon correctly', () => {
    render(<ServiceCard {...defaultProps} />);

    // Check if the icon is rendered (FaUtensils should be present)
    const iconContainer = screen.getByText('選　擇').closest('div')?.parentElement;
    expect(iconContainer).toBeInTheDocument();
  });

  it('applies correct overlay for available service', () => {
    render(<ServiceCard {...defaultProps} available={true} />);

    const card = screen.getByText('送餐服務').closest('div');
    const overlay = card?.querySelector('.bg-black\\/50');
    expect(overlay).toBeInTheDocument();
  });

  it('applies correct overlay for unavailable service', () => {
    render(<ServiceCard {...defaultProps} available={false} />);

    const card = screen.getByText('送餐服務').closest('div');
    const overlay = card?.querySelector('.bg-white\\/50');
    expect(overlay).toBeInTheDocument();
  });

  it('maintains proper text color and contrast', () => {
    render(<ServiceCard {...defaultProps} />);

    const title = screen.getByText('送餐服務');
    const description = screen.getByText('我們提供包天數訂餐、送餐服務。');
    
    expect(title).toHaveClass('text-white');
    expect(description).toHaveClass('text-white');
  });

  it('renders with different service titles', () => {
    const differentServices = [
      '居家清潔',
      '交通接送',
      '醫療諮詢',
      '環境整理',
      '照護負申請'
    ];

    differentServices.forEach(title => {
      const { unmount } = render(
        <ServiceCard {...defaultProps} title={title} />
      );
      
      expect(screen.getByText(title)).toBeInTheDocument();
      unmount();
    });
  });
});


