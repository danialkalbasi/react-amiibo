import React from 'react';
import { shallow } from 'enzyme';
import AmiiboList from '../AmiiboList';

describe('<AmiiboList />', () => {
    let component;
    const listData = [
        {
            amiiboSeries: 'Super Smash Bros.',
            character: 'Mario',
            gameSeries: 'Super Mario',
            head: '00000000',
            image: 'img',
            name: 'Mario',
            release: {
                au: '2014-11-29'
            },
            tail: '00000002',
            type: 'Figure'
        }
    ];

    beforeEach(() => {
        component = shallow(
            <AmiiboList list={listData} onSortByType={() => {}} onSortByName={() => {}} />
        );
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

            // Assert, 1 row is the header
            expect(lengthOfRow).toBe(2);
        });

        it('should render the list with correct number of Cols', () => {
            // Act
            const lengthOfCol = component.find('Col').length;

            // Assert, 4 cols is the header
            expect(lengthOfCol).toBe(12);
        });
    });
});
