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



describe('App', () => {
    describe('GET /unvalid route', () => {
        it('404 route not found', (done) => {
            chai.request(server)
                .get('/unvalidroute')
                .end((err, res) => {
                    // console.log("res:" , res);
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an("object");
                    expect(res.body.errors).to.be.an("array");
                    expect(res.body.errors[0].status).to.be.equal(404);
                    expect(res.body.errors).to.be.an("array");
                    expect(res.body.errors).to.have.lengthOf(1);
                    expect(res.body.errors[0]).to.have.property("title");
                    expect(res.body.errors[0].detail).to.equal("Not Found");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });
});
