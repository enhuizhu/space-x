import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('space x test suites', () => {
  it('it should contain expected table data and should open modal when user click view detail text', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.queryByText('FalconSat')).toBeInTheDocument();
    });

    const viewDetails = screen.queryAllByText('View Detail');
    userEvent.click(viewDetails[0]);

    await waitFor(() => {
      expect(screen.queryByTestId('dialog-title')).toBeInTheDocument();
    });

    userEvent.click(await screen.findByText('Close'));
    
    await waitFor(() => {
      expect(screen.queryByTestId('dialog-title')).not.toBeInTheDocument();
    });
  });
});