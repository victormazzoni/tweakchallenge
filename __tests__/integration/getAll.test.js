const url = 'http://localhost:3003/dev';
const request = require('supertest')(url);

describe('/notes GET', () => {
    it('Should return all notes from the user', async () => {
        const response1 = await request
            .post('/notes')
            .send();

        const response2 = await request
            .post('/notes')
            .send();

        const result = await request
            .get('/notes')
            .send();
            
        expect(result).toBeDefined();
        expect(result).toHaveProperty('statusCode', 200);
        expect(result.body).toContainEqual(response1.body);
        expect(result.body).toContainEqual(response2.body);

        //Deletes the notes created on test
        await request.delete(`/notes/${response1.body.id}`);
        await request.delete(`/notes/${response2.body.id}`);
    });
});