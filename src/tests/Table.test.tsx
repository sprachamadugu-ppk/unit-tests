import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import SiteTable from './Table';
import { authToken } from '../context/TokenContext';
import { getSites } from '../api/api-calls';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../api/api-calls');

const mockSites = [
  { firstname: 'John', lastname: 'Doe', middlename: 'M', email: 'john@example.com' },
];

beforeEach(() => {
  (getSites as jest.Mock).mockResolvedValue({ data: mockSites });
});

test('renders site details table', async () => {
  
    render(
        <authToken.Provider value={{ token: 'mockToken' }} >
          <BrowserRouter>
          <SiteTable />
          </BrowserRouter>
        </authToken.Provider>
      );  
  

  await waitFor(() => {
    expect(screen.getByText('Site Details')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

});

test('handles back button click', async () => {
  const mockNavigate = jest.fn();

  render(
    <authToken.Provider value={{ token: 'mockToken' }} >
      <BrowserRouter>
      <SiteTable />
      </BrowserRouter>
    </authToken.Provider>
  );  
  const backButton = screen.getByTestId('back-button');
  fireEvent.click(backButton);
 

  expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
});
