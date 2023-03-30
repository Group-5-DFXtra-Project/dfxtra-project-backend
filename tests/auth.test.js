import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import User from '../models/User.js';
import ProfileInfo from '../models/ProfileInfo.js';

chai.use(chaiHttp);
const { expect } = chai;



describe('Auth tests', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        await ProfileInfo.deleteMany({});
    });

    describe('POST /api/auth/signup', () => {
        

        it('should successfully register a new user', async () => {
            const testUser = {
                 username: 'bob',
                 email: 'bob@bob.com',
                 password: 'password'
            };
            
            const res = await chai
                .request(app)
                .post('/api/auth/signup')
                .send(testUser);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('username', testUser.username);
            expect(res.body).to.have.property('email', testUser.email);
        });

        it('should populate an entry in the DB', async () => {
            const testUser = {
                username: 'bob',
                email: 'bob@bob.com',
                password: 'password'
            };

            const res = await chai
                .request(app)
                .post('/api/auth/signup')
                .send(testUser);
            
            const userInDb = await User.findOne({ email: testUser.email });
            const profileInDb = await ProfileInfo.findOne({ user: userInDb._id });
           
            expect(userInDb).to.not.be.null;
            expect(profileInDb).to.not.be.null;
        });

        it('should not register a user with an existing email', async () => {
            const testUser = {
                username: 'bob',
                email: 'bob@bob.com',
                password: 'password'
            };

            await chai
            .request(app)
            .post('/api/auth/signup')
            .send(testUser);

            const res = await chai
                .request(app)
                .post('/api/auth/signup')
                .send(testUser);

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message', 'Email already in use');
        });
        
        it('should not register a user without an email', async () => {
            const testUser = {
                username: 'bob',
                password: 'password'
             };

             const res = await chai
                .request(app)
                .post('/api/auth/signup')
                .send(testUser);

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message', 'Missing required fields');
        });

        it('should not register a user without a password', async () => {
            const testUser = {
                username: 'bob',
                email: 'bob@bob.com'
            };

            const res = await chai
                .request(app)
                .post('/api/auth/signup')
                .send(testUser);

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message', 'Missing required fields');
        });


        
    });

    describe('POST /api/auth/signin', () => {
        it('should successfully log in a user', async () => {
            const testUser = {
                username: 'bob',
                email: 'bob@bob.com',
                password: 'password'
            };

            await chai
                .request(app)
                .post('/api/auth/signup')
                .send(testUser);

            const res = await chai
                .request(app)
                .post('/api/auth/signin')
                .send({
                    email: testUser.email,
                    password: testUser.password
                });

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
        });
    });

});