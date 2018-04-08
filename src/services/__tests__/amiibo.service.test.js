import AmiiboService from '../amiibo.service';
import { HttpMethodsServiceStub } from '../stubs';

describe('AmiiboService', () => {
    let service;
    const listData = {
        amiibo: [
            {
                amiiboSeries: 'Super Smash Bros.',
                character: 'Mario',
                gameSeries: 'Super Mario',
                head: '00000000',
                image: 'img',
                name: 'Mario',
                release: {
                    au: '2014-11-29',
                },
                tail: '00000002',
                type: 'Figure',
            },
        ],
    };

    beforeEach(() => {
        const http = new HttpMethodsServiceStub();
        service = new AmiiboService(http);
    });

    describe('list', () => {
        it('should call the http methods service get', () => {
            // Arrange
            const spyOnGet = spyOn(service.httpMethodsService, 'get')
                .and.returnValue(Promise.resolve(listData));

            // Act
            // Assert
            service.list().then(() => {
                expect(spyOnGet).toHaveBeenCalled();
            });
        });

        it('should return promise', () => {
            // Arrange
            spyOn(service.httpMethodsService, 'get')
                .and.returnValue(Promise.resolve(listData));

            // Act
            const returnType = service.list();

            // Assert
            expect(returnType instanceof Promise).toBeTruthy();
        });

        it('should return pass the get url of amiibo as a first argument', () => {
            // Arrange
            const spyOnGet = spyOn(service.httpMethodsService, 'get')
                .and.returnValue(Promise.resolve(listData));

            // Act
            service.list();
            const [url, isCache] = spyOnGet.calls.allArgs()[0];

            // Assert
            expect(url).toBe('http://www.amiiboapi.com/api/amiibo/');
            expect(isCache).toBeTruthy();
        });
    });
});
