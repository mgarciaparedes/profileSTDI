import { render, screen } from '@testing-library/react';
import App from './App';
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = baseURL;

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
