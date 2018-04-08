import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import AmiiboList from '../AmiiboList';

describe('<AmiiboList />', () => {
    let component;
    const listData = [
        {
            "amiiboSeries": "Super Smash Bros.",
            "character": "Mario",
            "gameSeries": "Super Mario",
            "head": "00000000",
            "image": "img",
            "name": "Mario",
            "release": {
                "au": "2014-11-29",
            },
            "tail": "00000002",
            "type": "Figure"
        }
    ];

    beforeEach(() => {
        component = shallow(<AmiiboList list={listData} />);
    });

    describe('Initialization', () => {
        it('should renders the component', () => {
            // Assert
            expect(component).toBeDefined();
        });
    });

    describe('Render', () => {
        it('should render the list with correct number of Rows', () => {
            // Act
            const lengthOfRow = component.find('Row').length;

            // Assert
            expect(lengthOfRow).toBe(1);
        });

        it('should render the list with correct number of Cols', () => {
            // Act
            const lengthOfCol = component.find('Col').length;

            // Assert
            expect(lengthOfCol).toBe(4);
        });
    });
});