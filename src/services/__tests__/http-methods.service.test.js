import HttpMethodsService from '../http-methods.service';

describe('HttpMethodsService', () => {
    let service;
    const responseData = JSON.stringify({
        products: [
            { Name: 'Cheese', Price: 2.50, Location: 'Refrigerated foods' },
            { Name: 'Crisps', Price: 3, Location: 'the Snack isle' },
        ],
    });
    const responseInit = { status: 200, statusText: 'success!' };

    beforeEach(() => {
        service = new HttpMethodsService();
    });

    describe('Initialization', () => {
        it('should set the default headers', () => {
            // Arrange
            const header = new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            });

            // Act
            const { headers } = service;

            // Assert
            expect(headers).toEqual(header);
        });
    });

    describe('get', () => {
        let callOnServiceGet;
        let spyOnBaseGet;

        beforeEach(() => {
            spyOnBaseGet = spyOn(service, 'baseGet')
                .and.returnValue(Promise.resolve(false));
            callOnServiceGet = service.get('url', false, null).then(() => { });
        });

        it('should call baseGet if the cached is false', () => {
            // Assert
            expect(spyOnBaseGet).toHaveBeenCalled();
        });

        it('should return promise if the cache is false', () => {
            // Assert
            expect(callOnServiceGet instanceof Promise).toBeTruthy();
        });

        it('should return promise if the cache is true', () => {
            // Act
            callOnServiceGet = service.get('url', true, null).then(() => { });

            // Assert
            expect(callOnServiceGet instanceof Promise).toBeTruthy();
        });
    });

    describe('setDefaultHeaders', () => {
        it('should set the default header', () => {
            // Arrange
            const header = new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            });

            // Act
            service.setDefaultHeaders();

            // Assert
            expect(service.headers).toEqual(header);
        });
    });

    describe('toJson', () => {
        it('should return parameter value if the parameter is not Response object', () => {
            // Arrange
            const param = false;

            // Act
            const result = service.toJson(param);

            // Assert
            expect(result).toBeFalsy();
        });

        it('should return promise if the response is valid', () => {
            // Arrange
            const param = new Response(responseData, responseInit);

            // Act
            const result = service.toJson(param);

            // Assert
            expect(result instanceof Promise).toBeTruthy();
        });

        it('should transform json to js object', () => {
            // Arrange
            const param = new Response(responseData, responseInit);
            const jsonParse = JSON.parse(responseData);

            // Act
            // Assert
            service.toJson(param).then((jsonResult) => {
                expect(jsonParse).toEqual(jsonResult);
            });
        });
    });

    describe('getUrlKey', () => {
        it('should return a key from a url', () => {
            // Arrange
            const url = 'http://getme.com';

            // Act
            const result = service.getUrlKey(url);
            const manualResult = url.replace(/[^\w\s]/gi, '');

            // Assert
            expect(result).toEqual(manualResult);
        });

        it('should return empty string if url is undefined or null or empty', () => {
            // Arrange
            const url = undefined;

            // Act
            const result = service.getUrlKey(url);

            // Assert
            expect(result).toBe('');
            expect(result).toBeDefined();
        });
    });
});
