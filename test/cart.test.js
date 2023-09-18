const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")



describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing cart App",()=>{

        describe("GET /getAllItems",()=>{
           test("should read all items",async()=>{
            const response=await request(app).get('/getAllItems')
            expect(response.body.code).toBe(200)
           })
        })


       
       
    describe("POST /addItem",()=>{
        let data={
            "quantity" : 3,
             "price" : 400
        }
        test("should add an item",async()=>{
         const response=await request(app)
         .post('/addItem').send(data)
         expect(response.body.code).toBe(200)
        })
     })

    //  describe("PUT /updateItem/:id",()=>{
    //     let data={
    //         "quantity" : 4,
    //          "totalPrice" : 800
    //     }
    //     test("should update item",async()=>{
    //      const response=await request(app)
    //      .put('/updateItem/63ea5558e3a5f1df7251b20a')
    //      .send(data)
    //      expect(response.body.code).toBe(201)
    //     })
    //  })

     describe("DELETE /deleteItem/:id",()=>{
        test("should delete item",async()=>{
         const response=await request(app)
         .delete('/deleteItem/63ea550c43e81e962ebf56a9')
         expect(response.body.message).toBe("success")
        })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

