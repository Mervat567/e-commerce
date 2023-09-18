const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")


describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Order App",()=>{

        describe("GET /getAllOrders",()=>{
           test("should read all orders",async()=>{
            const response=await request(app).get('/getAllOrders')
            expect(response.body.code).toBe(200)
           })
        })


       
        
        describe("POST /addOrder",()=>{
            let data={
                "r_time":"1/2/2020", 
                "a_time":"2/3/2021",
                "quantity":4,
                "user":[{
                    "firstName":"mona",
                    "lastName":"ali",
                    "Email":"mona34@gmail.com",
                    "Password":"moon45Z0$@&A",
                    "Address":"minya",
                    }],
            }
            test("should add an order",async()=>{
             const response=await request(app)
             .post('/addOrder').send(data)
             expect(response.body.code).toBe(200)
            })
         })
         describe("PUT /updateOrder/:id",()=>{
        let data={
            "quantity" : "",
             "products" : "",
        }
        test("should update order",async()=>{
         const response=await request(app)
         .put('/updateOrder/63ea5558e3a5f1df7251b20a')
         .send(data)
         expect(response.body.code).toBe(201)
        })
     })


     describe("DELETE /deleteOrder/:id",()=>{
        test("should delete order",async()=>{
         const response=await request(app)
         .delete('/deleteOrder/63ea550c43e81e962ebf56a9')
         expect(response.body.message).toBe("success")
        })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

