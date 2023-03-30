import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import User from '../models/User.js';
import ProfileInfo from '../models/ProfileInfo.js';
import { signup, signin } from '../controllers/auth.js'
import { verifyToken } from '../middlewares/authJwt.js';
chai.use(chaiHttp);
const { expect } = chai;
let userToken;

before(async () => {
    await User.deleteMany({});
    await ProfileInfo.deleteMany({});
    const testUser = {
        username: "test",
        email: "test@test.com",
        password: "test"
    }
    const signup = await chai
        .request(app)
        .post('/api/auths/signup')
        .send(testUser)

    const signin = await chai
        .request(app)
        .post('/api/auths/signin')
        .send({ email: testUser.email, password: testUser.password })

    userToken = signup.body.token;
});


/*describe('Profileinfo tests', () => {

    beforeEach(async () => {
        await ProfileInfo.deleteMany({});
    });

    describe('certification tests', () => {
        it('should add a new cert to the user profile', async () => {
            const certification = {
                certName: 'Certification',
                certImage: 'Linktoimage'
            };

            // Use chai-http to send a POST request to add the certification to the profile
            const res = await chai
                .request(app)
                .put('/api/profile/certifications')
                .set('Authorization', `Bearer ${userToken}`)
                .send(certification);


            expect(res).to.have.status(200);


        });
    });
})
