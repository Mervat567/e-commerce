const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")



describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Vendor App",()=>{

        describe("GET /getAllVendors",()=>{
           test("should read all vendors",async()=>{
            const response=await request(app).get('/getAllVendors')
            expect(response.body.code).toBe(200)
           })
        })

        describe("POST /addVendor",()=>{
            let data={
              "firstName" : "ibrahiem",
              "lastName" : "mostafa",
              "email" : "ibrahiem56@gmail.com",
            "password" : "ibram85Z0$@&A",
           "address" : "minya",
          "phone" : "010256789",
          "role" : "superAdmin",
            }
            test("should add an vendor",async()=>{
             const response=await request(app)
             .post('/addVendor').send(data)
             expect(response.body.code).toBe(200)
            })
         })



        describe("POST /loginVendor",()=>{

            let data={
                "email" : "ibrahiem56@gmail.com",
                "password" : "ibram85Z0$@&A"
            }
            test("vendor should sign in ",async()=>{
             const response=await request(app).post('/loginVendor').send(data)
             expect(response.body.code).toBe(201)
            })
            test("should return 404 vendor not found",async()=>{
                const response=await request(app).post('/loginVendor')
                .send({
                    "email" : "alimohammed@gmail.com",
                    "password" : "ibram85Z0$@&A"
                })
                expect(response.body.code).toBe(404)
               })
               test("should return 400 incorrect password",async()=>{
                const response=await request(app).post('/loginVendor')
                .send({
                    "email" : "ibrahiem56@gmail.com",
                    "password" : "mgh45678"
                })
                expect(response.body.message).toBe("incorrect password")
               })
         })
        

    
    

    describe("PUT /updateVendor/:id",()=>{
        let data={
            "firstName" : "ibrahiem",
            "lastName" : "mostafa",
            "email" : "ibrahiem56@gmail.com",
           "password" : "ibram85Z0$@&A",
          "address" : "fayoum",
         "phone" : "010256789",
         "role" : "admin",
        }
        test("should update vendor",async()=>{
         const response=await request(app)
         .put('/updateVendor/63ea5558e3a5f1df7251b20a')
         .send(data)
         expect(response.body.code).toBe(201)
        })
     })

     describe("DELETE /deleteVendor/:id",()=>{
        test("should delete vendor",async()=>{
         const response=await request(app)
         .delete('/deleteVendor/63ea550c43e81e962ebf56a9')
         expect(response.body.message).toBe("success")
        })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

