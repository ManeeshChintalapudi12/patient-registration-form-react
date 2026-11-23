import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

const API_URL =
  'https://mc-patient-registration-service.azurewebsites.net/api/Patient/Register';

// Fill every required field so the form can be submitted as a user would.
function fillForm(container) {
  fireEvent.change(screen.getByLabelText(/first/i), { target: { value: 'Jane' } });
  fireEvent.change(screen.getByLabelText(/last/i), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText(/^phone/i), { target: { value: '5551234567' } });
  fireEvent.change(container.querySelector('input[type="date"]'), {
    target: { value: '1990-05-15' },
  });
  fireEvent.change(screen.getByLabelText(/street/i), { target: { value: '123 Main St' } });
  fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Dallas' } });
  fireEvent.change(screen.getByLabelText(/state/i), { target: { value: 'TX' } });
  fireEvent.change(screen.getByLabelText(/postal\/zip code/i), { target: { value: '75001' } });
  // The insurance field has no label; it is the last textbox in the form.
  const textboxes = screen.getAllByRole('textbox');
  fireEvent.change(textboxes[textboxes.length - 1], { target: { value: 'Acme Health' } });

  // Country is an MUI Select: open it and pick US.
  fireEvent.mouseDown(screen.getByLabelText(/country/i));
  fireEvent.click(screen.getByText('US'));
}

describe('Patient registration form', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders the registration heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /Patient Registration Form/i })
    ).toBeInTheDocument();
  });

  test('submitting a filled form posts exactly once and shows a success message', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({ id: 1 }) });
    const { container } = render(<App />);
    fillForm(container);

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // The submit button must trigger exactly one POST: the form's
    // onSubmit is the only handler (a previous version also wired
    // onClick on the button, firing the request twice).
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(global.fetch).toHaveBeenCalledWith(
      API_URL,
      expect.objectContaining({ method: 'POST' })
    );
    const body = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(body.firstName).toBe('Jane');
    expect(body.country).toBe('us');
    expect(await screen.findByText('Patient registered successfully.')).toBeInTheDocument();
  });

  test('a failed registration shows an error message instead of succeeding silently', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 500, json: async () => ({}) });
    const { container } = render(<App />);
    fillForm(container);

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(
      await screen.findByText('Error registering patient. Please try again.')
    ).toBeInTheDocument();
  });
});
