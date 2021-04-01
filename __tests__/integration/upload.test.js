const url = 'http://localhost:3003/dev';
const request = require('supertest')(url);
const fs = require('fs');

describe('/notes POST WITH FILE', () => {
    it('Should return Uploaded File', async () => {
        const filePath = './__tests__/integration/testImage.jpg';

        fs.stat(filePath,
        async (error) => {
            if (error) throw new Error('file does not exist'); 

            const result = await request
                .post('/upload')
                // Attach the file with key 'file' which is corresponding to your endpoint setting. 
                .attach('file', filePath);

            expect(result).toBeDefined();
            expect(result).toHaveProperty('statusCode', 200);
            expect(result.body).toHaveProperty('id');
            expect(result.body).toHaveProperty('fileName', 'testImage.jpg');
        });            
    });
});