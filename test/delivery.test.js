const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")


describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Delivery  App",()=>{

        describe("GET /getAllDeliveries",()=>{
           test("should read all deliveries",async()=>{
            const response=await request(app).get('/getAllDeliveries')
            expect(response.body.code).toBe(200)
           })
        })

        describe("POST /createDelivery",()=>{
            let data={
           "firstName" : "khaled",
           "lastName" : "rady",
           "Email" : "kalood23@gmail.com",
           "Password" : "khalood89Z0$@&A",
           "Address" : "mansoura",
           "phone" : "01124569032",
           "role" : "superAdmin",
            }
            test("should add an delivery",async()=>{
             const response=await request(app)
             .post('/createDelivery').send(data)
             expect(response.body.code).toBe(200)
            })
         })

        describe("POST /loginDelivery",()=>{

            let data={
                "Email" : "kalood23@gmail.com",
                "Password" : "khalood89Z0$@&A"
            }
            test("should sign in an delivery",async()=>{
             const response=await request(app).post('/loginDelivery').send(data)
             expect(response.body.code).toBe(201)
            })
            test("should return 404 delivery not found",async()=>{
                const response=await request(app).post('/loginDelivery')
                .send({
                    "Email" : "alimohammed@gmail.com",
                    "Password" : "khalood89Z0$@&A"
                })
                expect(response.body.code).toBe(404)
               })
               test("should return 400 incorrect password",async()=>{
                const response=await request(app).post('/loginDelivery')
                .send({
                    "Email" : "kalood23@gmail.com",
                    "Password" : "mgh45678"
                })
                expect(response.body.message).toBe("incorrect password")
               })
         })
        

    
         describe("PUT /updateDelivery/:id",()=>{
        let data={
            "firstName" : "khaled",
            "lastName" : "rady",
            "Email" : "kalood23@gmail.com",
            "Password" : "khalood89Z0$@&A",
            "Address" : "benisuef",
            "phone" : "01124569032",
            "role" : "admin",
        }
        test("should update delivery",async()=>{
         const response=await request(app)
         .put('/updateDelivery/63ea5558e3a5f1df7251b20a')
         .send(data)
         expect(response.body.code).toBe(201)
        })
     })


     describe("DELETE /deleteDelivery/:id",()=>{
        test("should delete delivery",async()=>{
         const response=await request(app)
         .delete('/deleteDelivery/63ea550c43e81e962ebf56a9')
         expect(response.body.message).toBe("success")
        })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

