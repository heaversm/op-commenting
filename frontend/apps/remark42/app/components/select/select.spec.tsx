import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/preact';

import { render } from 'tests/utils';
import { Select } from './select';

const items = [
  { label: 'None', value: 'none' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Newest', value: 'newest' },
  { label: 'Best', value: 'best' },
  { label: 'Worst', value: 'worst' },
];

describe('<Select/>', () => {
  it('should has static class names', () => {
    render(<Select items={items} selected={items[0]} />);
    expect(screen.getByRole('combobox')).toHaveClass('select-element');
    expect(screen.getByTestId('select-root')).toHaveClass('select');
    expect(screen.getByTestId('select-arrow')).toHaveClass('select-arrow');
  });

  it('should render selected item', () => {
    const selectedIndex = 1;
    const selectedItem = items[selectedIndex];

    render(<Select items={items} selected={selectedItem} />);
    expect(screen.getAllByRole<HTMLOptionElement>('option')[selectedIndex].selected).toBeTruthy();
  });

  it('should highlight select on focus', async () => {
    render(<Select items={items} selected={items[0]} />);

    fireEvent.focus(screen.getByRole('combobox'));
    await waitFor(() => {
      const rootElement = screen.getByTestId('select-root');
      expect(rootElement).toHaveClass('select_focused');
      expect(rootElement).toHaveClass('rootFocused');
    });
  });
});
