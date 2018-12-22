import React, { Component } from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';

describe('<Dashboard />', () => {
    let component;

    beforeEach(() => {
        component = shallow(<Header />);
    });

    describe('Initialization', () => {
        it('should renders the component', () => {
            // Assert
            expect(component).toBeDefined();
        });
    });
});
