import { serviceAccount } from '../serviceAccount';
describe('Config => Firebase | Testing Suite', () => {
    describe('Service Account Config', () => {
        it('should return an object', () => {
            expect(serviceAccount).toBeInstanceOf(Object);
        });
        it('should return the correct service account key', () => {
            expect(serviceAccount).toMatchObject(serviceAccount);
        });
        it('should return the correct service account type', () => {
            const serviceAccountType = serviceAccount.type;
            const expectedResponse = 'service_account';
            expect(serviceAccountType).toEqual(expectedResponse);
        });
    });
});
