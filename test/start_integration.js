"use strict";

process.env.NODE_ENV = 'test';

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const server = require('../../app.js');
//
// chai.should();
//
// chai.use(chaiHttp);

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.use(chaiHttp);



describe('Start', () => {
    describe('GET /', () => {
        it('200 HAPPY PATH start found', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    // console.log("res:" , res);
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    expect(res.body.data).to.be.an("object");
                    expect(res.body.data.status).to.be.equal(200);
                    expect(res.body.data).to.have.property("data");
                    expect(res.body.data.data).to.be.an("array");
                    expect(res.body.data.data).to.have.lengthOf(1);
                    expect(res.body.data).to.have.property("data").with.lengthOf(1);
                    expect(res.body.data.message).to.equal("Info about this trading site");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });
});
