"use strict";

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

let token = "";

describe('Accounts', () => {
    describe('GET /accounts/test@accounts.se', () => {
        it('should get 401 account not found', (done) => {
            chai.request(server)
                .get('/accounts/test@accounts.se')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.equal("Account not found");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });

        it('should get 201 HAPPY PATH user successfully registered', (done) => {
            let user = {
                email: "test@accounts.se",
                password: "Testingaccounts"
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
                email: "test@accounts.se",
                password: "Testingaccounts"
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

        it('200 HAPPY PATH account found', (done) => {
            chai.request(server)
                .get('/accounts/test@accounts.se')
                .end((err, res) => {
                    // console.log("res:" , res);
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.status.should.be.equal(200);
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.equal("Account found");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('POST /accounts', () => {
        it('should get 401 as a token is not provided', (done) => {
            let accountDeposit = {
                email: "test@accounts.se",
                deposit: 20
                // amount: 2,
                // mushroom: "Stensopp",
                // liquidAssets: 360
            };

            chai.request(server)
                .post('/accounts')
                .send(accountDeposit)
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
            let accountDeposit = {
                email: "test@accounts.se",
                deposit: 20
                // amount: 2,
                // mushroom: "Stensopp",
                // liquidAssets: 360
            };

            chai.request(server)
                .post('/accounts')
                .set('authorization', 't1e2s3t4')
                .send(accountDeposit)
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

        it('should get 500 user registration failed due to double', (done) => {
            let user = {
                email: "test@accounts.se",
                password: "Testingaccounts"
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

        it('should get 200 HAPPY PATH user successfully logged in', (done) => {
            let user = {
                email: "test@accounts.se",
                password: "Testingaccounts"
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

        it('should get 201 HAPPY PATH depositing to account', (done) => {
            let accountDeposit = {
                email: "test@accounts.se",
                deposit: 20
            };

            chai.request(server)
                .post('/accounts')
                .set('authorization', token)
                .send(accountDeposit)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.status.should.be.equal(201);
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.equal("Account successfully updated!");

                    done();
                });
        });
    });
});
