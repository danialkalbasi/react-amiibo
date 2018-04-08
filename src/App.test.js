import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
    let component;

    beforeEach(() => {
        component = shallow(<App />);
    });

    describe('Initialization', () => {
        it('should renders the component', () => {
            // Assert
            expect(component).toBeDefined();
        });
    });
});
