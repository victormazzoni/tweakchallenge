const url = 'http://localhost:3003/dev';
const request = require('supertest')(url);
const fs = require('fs');

describe('/notes DELETE', () => {
    it('Should return Success Message', async () => {
        const response = await request
            .post('/notes')
            .send();

        const result = await request
            .delete(`/notes/${response.body.id}`)
            .send();

        expect(result).toBeDefined();
        expect(result).toHaveProperty('statusCode', 200);
        expect(result.body).toHaveProperty('message', 'Note deleted successfully.');
    });
});

describe('/notes DELETE WITH FILE', () => {
    it('Should delete the attached file and return Success Message', async () => {
        const filePath = './__tests__/integration/testImage.jpg';

        fs.stat(filePath,
        async (error) => {
            if (error) throw new Error('file does not exist'); 
            const response = await request
                .post('/notes')
                .send();
            
            const result = await request
                .delete(`/notes/${response.body.id}`)
                // Attach the file with key 'file' which is corresponding to your endpoint setting. 
                .attach('file', filePath);
                
            expect(result).toBeDefined();
            expect(result).toHaveProperty('statusCode', 200);
            expect(result.body).toHaveProperty('message', 'Note deleted successfully.');   
        });            
    });
});