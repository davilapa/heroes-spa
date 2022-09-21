import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}))

describe('SearchPage tests', () => {

    beforeEach(() => jest.clearAllMocks());

    test('should render default values', () => { 
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )

        expect(container).toMatchSnapshot();
    });

    test('should render batman and input with queryString value', () => { 
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');

        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('none')
    });

    test('should render an error if hero does not exist (batman123)', () => { 
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman123');

        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('')

        expect(screen.getByText('No hero with')).toBeTruthy();
    });

    test('should call navigate to a new page', () => { 

        const inputValue = 'spiderman';

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        )

        
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { name: 'searchText', value: inputValue } })
        
        // const btn = screen.getByRole('button');
        // fireEvent.click(btn);

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockedUsedNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
        
    })

})