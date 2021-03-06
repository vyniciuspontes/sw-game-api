

import Planet from '../api/planets/planet.model';


import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
let should = chai.should();


chai.use(chaiHttp);

describe('Planets', () => {

    //Empty database
    beforeEach((done) => {
        Planet.deleteMany({}, (err) => {
            done();
        });
    });

    describe('/GET planets', () => {
        it('it should GET all the planets', (done) => {
            chai.request(server)
                .get('/api/planets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });

        it('it should GET planet by given name', (done) => {
            let planet = new Planet({
                name: 'Yavin IV',
                terrain: 'jungle, rainforests',
                climate: 'temperate, tropical',
                movieAppearances: 1
            });

            planet.save((err, newPlanet) => {
                chai.request(server).get('/api/planets?name=Yavin IV').send().end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.lengthOf(1);
                    res.body[0].should.have.property('name');
                    res.body[0].should.have.property('terrain');
                    res.body[0].should.have.property('climate');
                    res.body[0].should.have.property('movieAppearances');
                    res.body[0].should.have.property('_id').eql(newPlanet.id);
                    done();
                });
            });

        });

    });

    describe('/GET/:id planet', () => {
        it('it should GET planet by given id', (done) => {
            let planet = new Planet({
                name: 'Yavin IV',
                terrain: 'jungle, rainforests',
                climate: 'temperate, tropical',
                movieAppearances: 1
            });

            planet.save((err, newPlanet) => {
                chai.request(server).get('/api/planets/' + newPlanet.id).send().end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('terrain');
                    res.body.should.have.property('climate');
                    res.body.should.have.property('movieAppearances');
                    res.body.should.have.property('_id').eql(newPlanet.id);
                    done();
                });
            });

        });
    });

    describe('/POST planet', () => {

        it('Should not POST a planet without name', (done) => {
            let planet = {
                terrain: 'jungle, rainforests',
                climate: 'temperate, tropical'
            };

            chai.request(server).post('/api/planets').send(planet).end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.details.should.a('array');
                res.body.error.details.should.have.lengthOf(1);
                res.body.error.details[0].message.should.be.eql('name is required');
                done();
            });
        });

        it('Should POST a planet', (done) => {
            let planet = {
                name: 'Yavin IV',
                terrain: 'jungle, rainforests',
                climate: 'temperate, tropical'
            };

            chai.request(server).post('/api/planets').send(planet).end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('terrain');
                res.body.should.have.property('climate');
                res.body.should.have.property('movieAppearances');
                done();
            });
        });

        it('Should not have movie appearances if it\'s not present in the swapi.co', (done) => {
            let planet = {
                name: 'A cool movie name',
                terrain: 'jungle, rainforests',
                climate: 'temperate, tropical'
            };

            chai.request(server).post('/api/planets').send(planet).end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('terrain');
                res.body.should.have.property('climate');
                res.body.should.have.property('movieAppearances').eql(0);
                done();
            });
        });
    });

    describe('/DELETE/:id planet', ()=> { 
        it('Should delete a planet by given id', (done)=> { 
            let planet = new Planet({
                name: 'Yavin IV',
                terrain: 'jungle, rainforests',
                climate: 'temperate, tropical',
                movieAppearances: 1
            });

            planet.save((err, newPlanet) => {
                chai.request(server).delete('/api/planets/' + newPlanet.id).send().end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
            });
        });
    })

});

