const url = 'http://localhost:3003/dev';
const request = require('supertest')(url);

describe('/notes GET', () => {
    it('Should return a note from the user', async () => {
        const response = await request
            .post('/notes')
            .send();

        const result = await request
            .get(`/notes/${response.body.id}`)
            .send();

        expect(result).toBeDefined();
        expect(result).toHaveProperty('statusCode', 200);
        expect(response.body).toHaveProperty('id', response.body.id);

        //Deletes the note created on test
        await request.delete(`/notes/${response.body.id}`);
    });
});