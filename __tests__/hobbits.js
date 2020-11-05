const supertest = require("supertest")
const server=require("../server")
const db=require("../data/config")

beforeEach(async ()=>{
    await db.seed.run()
})
afterAll(async ()=>{
//close the database connection before the test runner ends,
await db.destroy()
})
describe("hobbits integration tests",()=>{
    it ("gets a lists of hobbits",async()=>{
        const res=await supertest(server).get("/hobbits")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.length).toBeGreaterThanOrEqual(4)
        expect(res.body[0].name).toBe("sam")
    })
    it("get By id",async()=>{
        const res=await supertest(server).get("/hobbits/2")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.id).toBe(2)
        expect(res.body.name).toBe("frodo")
    })
   it("post an hobbits",async()=>{
       const res=await supertest(server)
                .post("/hobbits")
                .send({name:"blippi"})
            expect(res.statusCode).toBe(201)
            expect(res.type).toBe("application/json")
            expect(res.body.name).toBe("blippi")
            expect(res.body.id).toBeDefined()
   })
})