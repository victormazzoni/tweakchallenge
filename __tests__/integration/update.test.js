const url = 'http://localhost:3003/dev';
const request = require('supertest')(url);
const fs = require('fs');

describe('/notes PUT', () => {
    it('Should return updated Note', async () => {
        const response = await request
        .post('/notes')
        .send();

        const result = await request
            .put(`/notes/${response.body.id}`)
            .send();

        expect(result).toBeDefined();
        expect(result.body).toHaveProperty('id', response.body.id);

        //Deletes the note created on test
        await request.delete(`/notes/${response.body.id}`);
    });
});

describe('/notes PUT WITH FILE', () => {
    it('Should update the note with attached file', async () => {
        const filePath = './__tests__/integration/testImage.jpg';

        fs.stat(filePath,
        async (error) => {
            if (error) throw new Error('file does not exist'); 
            const response = await request
                .post('/notes')
                .send();
            
            const result = await request
                .put(`/notes/${response.body.id}`)
                // Attach the file with key 'file' which is corresponding to your endpoint setting. 
                .attach('file', filePath);
                
            expect(result).toBeDefined();
            expect(result.body).toHaveProperty('id', response.body.id);
            expect(result.body).toHaveProperty('attachment', 'testImage.jpg');

            //Deletes the note created on test
            await request.delete(`/notes/${result.body.id}`);
        });            
    });
});