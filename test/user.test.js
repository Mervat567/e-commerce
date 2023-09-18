const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")


describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing User App",()=>{

        describe("GET /getAllUsers",()=>{
           test("should read all users",async()=>{
            const response=await request(app).get('/getAllUsers')
            expect(response.body.code).toBe(200)
           })
        })


        describe("POST /addUser",()=>{
            let data={
                "firstName" : "Hala",
                "lastName" : "Ashraf",
                "Email" : "Hala468@gmail.com",
                "Password" : "holaa34Z0$@&A",
                "Address" : "fayoum",
                "phone" : "01124567890",
                "role" : "admin",
            }
            test("should add an user",async()=>{
             const response=await request(app)
             .post('/addUser').send(data)
             expect(response.body.code).toBe(200)
            })
         })
 

         describe("POST /loginUser",()=>{

            let data={
                "Email" : "Hala468@gmail.com",
                "Password" : "holaa34Z0$@&A"
            }
            test("user should sign in ",async()=>{
             const response=await request(app).post('/loginUser').send(data)
             expect(response.body.code).toBe(201)
            })
            test("should return 404 user not found",async()=>{
                const response=await request(app).post('/loginUser')
                .send({
                    "Email" : "hisham@gmail.com",
                    "Password" : "holaa34Z0$@&A"
                })
                expect(response.body.code).toBe(404)
               })
               test("should return 400 incorrect password",async()=>{
                const response=await request(app).post('/loginUser')
                .send({
                    "Email" : "Hala468@gmail.com",
                    "Password" : "mgh45678"
                })
                expect(response.body.message).toBe("incorrect password")
               })
         })
       
        

         describe("PUT /updateUser/:id",()=>{
        let data={
            "firstName" : "Hala",
            "lastName" : "Ashraf",
            "Email" : "Hala468@gmail.com",
            "Password" : "holaa34Z0$@&A",
            "Address" : "minya",
            "phone" : "01124567890",
            "role" : "superAdmin",
        }
        test("should update user",async()=>{
         const response=await request(app)
         .put('/updateUser/63ea5558e3a5f1df7251b20a')
         .send(data)
         expect(response.body.code).toBe(201)
        })
     })


     describe("DELETE /deleteUser/:id",()=>{
        test("should delete user",async()=>{
         const response=await request(app)
         .delete('/deleteUser/63ea550c43e81e962ebf56a9')
         expect(response.body.message).toBe("success")
        })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

