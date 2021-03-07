"use strict";

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

let token = "";

describe('Trades', () => {
    describe('POST /trades/buy', () => {
        it('should get 201 HAPPY PATH user successfully registered', (done) => {
            let user = {
                email: "test@trades.se",
                password: "Testingtrades"
            };

            chai.request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.status.should.be.equal(201);
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.equal("User successfully registered!");

                    done();
                });
        });

        it('should get 500 user registration failed due to double', (done) => {
            let user = {
                email: "test@trades.se",
                password: "Testingtrades"
            };

            chai.request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.status.should.be.equal(500);
                    res.body.errors.should.have.property("detail");
                    res.body.errors.detail.should.equal("SQLITE_CONSTRAINT:" +
                                                        " UNIQUE constraint failed: users.email");

                    done();
                });
        });

        it('should get 401 as a token is not provided', (done) => {
            let accountBuy = {
                email: "test@trades.se",
                realTimePrice: 20,
                amount: 2,
                mushroom: "Stensopp",
                liquidAssets: 360
            };

            chai.request(server)
                .post('/trades/buy')
                .send(accountBuy)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.equal("No token");

                    done();
                });
        });

        it('should get 500 as an unvalid token is provided', (done) => {
            let accountBuy = {
                email: "test@trades.se",
                realTimePrice: 20,
                amount: 2,
                mushroom: "Stensopp",
                liquidAssets: 360
            };

            chai.request(server)
                .post('/trades/buy')
                .set('authorization', 't1e2s3t4')
                .send(accountBuy)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.status.should.be.equal(500);
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.equal("Failed authentication");

                    done();
                });
        });

        it('should get 200 HAPPY PATH user successfully logged in', (done) => {
            let user = {
                email: "test@trades.se",
                password: "Testingtrades"
            };

            chai.request(server)
                .post('/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.status.should.be.equal(200);
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.equal("User logged in");
                    res.body.data.should.have.property("token");

                    token = res.body.data.token;
                    // console.log("token: ", token);

                    done();
                });
        });

        it('should get 401 as cost exceeds liquid assets', (done) => {
            let accountBuy = {
                email: "test@trades.se",
                realTimePrice: 20,
                amount: 20,
                mushroom: "Stensopp",
                liquidAssets: 360
            };

            chai.request(server)
                .post('/trades/buy')
                .set('authorization', token)
                .send(accountBuy)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.equal("Cost exceeds liquid assets");

                    done();
                });
        });

        it('should get 201 HAPPY PATH buying mushrooms', (done) => {
            let accountBuy = {
                email: "test@trades.se",
                realTimePrice: 20,
                amount: 2,
                mushroom: "Stensopp",
                liquidAssets: 360
            };

            chai.request(server)
                .post('/trades/buy')
                .set('authorization', token)
                .send(accountBuy)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.status.should.be.equal(201);
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.equal("Purchase successfully performed!");

                    done();
                });
        });
    });

    describe('POST /trades/sell', () => {
        it('should get 401 as cost exceeds liquid assets', (done) => {
            let accountSell = {
                email: "test@trades.se",
                realTimePrice: 20,
                amount: 20,
                mushroom: "Trattkantarell",
                liquidAssets: 360,
                ownedTratt: 15
            };

            chai.request(server)
                .post('/trades/sell')
                .set('authorization', token)
                .send(accountSell)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.equal("Amount exceeds holding");

                    done();
                });
        });

        it('should get 201 HAPPY PATH selling mushrooms', (done) => {
            let accountSell = {
                email: "test@trades.se",
                realTimePrice: 20,
                amount: 2,
                mushroom: "Stensopp",
                liquidAssets: 360
            };

            chai.request(server)
                .post('/trades/sell')
                .set('authorization', token)
                .send(accountSell)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.status.should.be.equal(201);
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.equal("Sell successfully performed!");

                    done();
                });
        });
    });
});
