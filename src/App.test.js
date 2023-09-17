import { render, screen } from '@testing-library/react';
import App from './App';
import Provide from './redux/provider';

test('renders learn react link', () => {
  render(<Provide>
      <App />
    </Provide>);
  //const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
});
