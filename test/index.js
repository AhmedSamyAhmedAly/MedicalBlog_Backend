const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
chai.should();
chai.use(chaiHttp);

describe('Posts APIs', () => {

     
    //  Test Get All Posts route 
    

    // Right scenario 
    describe('GET /api/posts', () => {
        it('It should GET all the posts', (done) => {
            chai.request(server)
                .get("/api/posts")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                });
        });
    });

    //Wrong scenario
    describe('GET /api/post', () => {
        it('It should NOT GET All posts', (done) => {
            chai.request(server)
                .get("/api/post")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });



});