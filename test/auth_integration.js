"use strict";

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

// let token = "";

describe('Authentication', () => {
    describe('POST /register', () => {
        it('should get 401 registration failed due to missing password', (done) => {
            let user = {
                email: "test@authentication.se",
                // password: "Testingauthentication"
            };

            chai.request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.equal("Email or password missing");

                    done();
                });
        });

        it('should get 401 registration failed due to missing email', (done) => {
            let user = {
                // email: "test@authentication.se",
                password: "Testingauthentication"
            };

            chai.request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.equal("Email or password missing");

                    done();
                });
        });


        it('should get 201 HAPPY PATH user successfully registered', (done) => {
            let user = {
                email: "test@authentication.se",
                password: "Testingauthentication"
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
                email: "test@authentication.se",
                password: "Testingauthentication"
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
    });

    describe('POST /login', () => {
        it('should get 401 user not found', (done) => {
            let user = {
                email: "test@authenticationx.se",
                password: "Testingauthentication"
            };

            chai.request(server)
                .post('/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.equal("User not found");
                    res.body.errors.should.have.property("detail");
                    res.body.errors.detail.should.be.a("string");

                    done();
                });
        });

        it('should get 401 wrong password', (done) => {
            let user = {
                email: "test@authentication.se",
                password: "Testingauthenticationx"
            };

            chai.request(server)
                .post('/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.equal("Wrong password");
                    res.body.errors.should.have.property("detail");
                    res.body.errors.detail.should.be.a("string");

                    done();
                });
        });


        it('should get 401 login failed due to missing password', (done) => {
            let user = {
                email: "test@authentication.se",
                // password: "Testingauthentication"
            };

            chai.request(server)
                .post('/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.equal("Email or password missing");

                    done();
                });
        });

        it('should get 401 login failed due to missing email', (done) => {
            let user = {
                // email: "test@authentication.se",
                password: "Testingauthentication"
            };

            chai.request(server)
                .post('/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.status.should.be.equal(401);
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.equal("Email or password missing");

                    done();
                });
        });


        it('should get 200 HAPPY PATH user successfully logged in', (done) => {
            let user = {
                email: "test@authentication.se",
                password: "Testingauthentication"
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
                    res.body.data.token.should.be.a("string");

                    // token = res.body.data.token;
                    // console.log("token: ", token);

                    done();
                });
        });
    });
});
