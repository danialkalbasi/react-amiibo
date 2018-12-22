import React from 'react';
import { shallow } from 'enzyme';
import Search from '../Search';

describe('<Search />', () => {
    let component;
    let onSearchResults = {};

    beforeEach(() => {
        onSearchResults = {
            onSearchCharacter: {},
            onSearchAmiiboSeries: {},
            onSearchGameSeries: {},
            onSearchType: {}
        };
        component = shallow(
            <Search
                onSearchCharacter={data => {
                    onSearchResults.onSearchCharacter = data;
                }}
                onSearchAmiiboSeries={data => {
                    onSearchResults.onSearchAmiiboSeries = data;
                }}
                onSearchGameSeries={data => {
                    onSearchResults.onSearchGameSeries = data;
                }}
                onSearchType={data => {
                    onSearchResults.onSearchType = data;
                }}
            />
        );
    });

    describe('Initialization', () => {
        it('should renders the component', () => {
            // Assert
            expect(component).toBeDefined();
        });
    });

    describe('setDefaults', () => {
        it('should set the default dropdown option', () => {
            // Arrange
            const firstOption = component.instance().getDropDownOptions()[0];
            const firstOptionJson = JSON.stringify(firstOption);
            const stateOption = JSON.stringify(component.state('selectedOption'));

            // Act
            // should call in the componentDidMount

            // Assert
            expect(stateOption).toEqual(firstOptionJson);
        });
    });

    describe('render', () => {
        it('should render <DropdownButton />', () => {
            // Act
            const findDropDownButton = component.find('DropdownButton');

            // Assert
            expect(findDropDownButton.length).toEqual(1);
        });

        it('should render 1 <Col />', () => {
            // Act
            const findCols = component.find('Col');

            // Assert
            expect(findCols.length).toEqual(1);
        });

        it('should render search button', () => {
            // Act
            const findButton = component.find('Button');

            // Assert
            expect(findButton.length).toEqual(1);
        });
    });

    describe('getDropDownOptions', () => {
        let options;

        beforeEach(() => {
            options = component.instance().getDropDownOptions();
        });

        it('should call the onSearchCharacter whenever the character option onSearch is fired', () => {
            // Act
            options[0].onSearch({ data: '' });

            // Assert
            expect(onSearchResults.onSearchCharacter).toBeDefined();
            expect(onSearchResults.onSearchCharacter).toEqual({ data: '' });
        });

        it('should call the onSearchGameSeries whenever the character option onSearch is fired', () => {
            // Act
            options[1].onSearch({ data: '' });

            // Assert
            expect(onSearchResults.onSearchGameSeries).toBeDefined();
            expect(onSearchResults.onSearchGameSeries).toEqual({ data: '' });
        });

        it('should call the onSearchAmiiboSeries whenever the character option onSearch is fired', () => {
            // Act
            options[2].onSearch({ data: '' });

            // Assert
            expect(onSearchResults.onSearchAmiiboSeries).toBeDefined();
            expect(onSearchResults.onSearchAmiiboSeries).toEqual({ data: '' });
        });

        it('should call the onSearchType whenever the character option onSearch is fired', () => {
            // Act
            options[3].onSearch({ data: '' });

            // Assert
            expect(onSearchResults.onSearchType).toBeDefined();
            expect(onSearchResults.onSearchType).toEqual({ data: '' });
        });
    });
});
