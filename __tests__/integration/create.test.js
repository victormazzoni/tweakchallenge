const url = 'http://localhost:3003/dev';
const request = require('supertest')(url);
const fs = require('fs');

describe('/notes POST', () => {
    it('Should return Created Note', async () => {
        const response = await request
            .post('/notes')
            .send();

        expect(response).toBeDefined();
        expect(response).toHaveProperty('statusCode', 200);
        expect(response.body).toHaveProperty('id');

        await request.delete(`/notes/${response.body.id}`);
    });
});

describe('/notes POST WITH FILE', () => {
    it('Should return Created Note With Attachment', async () => {
        const filePath = './__tests__/integration/testImage.jpg';

        fs.stat(filePath,
        async (error) => {
            if (error) throw new Error('file does not exist'); 

            const result = await request
                .post('/notes')
                // Attach the file with key 'file' which is corresponding to your endpoint setting. 
                .attach('file', filePath);

            expect(result).toBeDefined();
            expect(result).toHaveProperty('statusCode', 200);
            expect(result.body).toHaveProperty('id');
            expect(result.body).toHaveProperty('attachment', 'testImage.jpg');    

            //Deletes the note created on test
            await request.delete(`/notes/${result.body.id}`);
        });
    });
});