

import Planet from '../api/planets/planet.model';


import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
let should = chai.should();


chai.use(chaiHttp);

describe('Planets', () => {
    beforeEach((done) => { //Before each test we empty the database
        Planet.deleteMany({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET planets', () => {
        it('it should GET all the Planets', (done) => {
            chai.request(server)
                .get('/api/planets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

});

describe('/POST planet')