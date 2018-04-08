import React, { Component } from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../Dashboard';
import { AmiiboService } from '../../../services';
jest.mock('../../../services/amiibo.service');

describe('<Dashboard />', () => {
    let component;

    beforeEach(() => {
        AmiiboService.mockImplementation(() => {
            return {
                list: () => Promise.resolve([])
            }
        });
        component = shallow(<Dashboard />);
    });

    describe('Initialization', () => {
        it('should renders the component', () => {
            // Assert
            expect(component).toBeDefined();
        });
    });
});