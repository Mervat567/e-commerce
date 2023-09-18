const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")



describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Product App",()=>{

        describe("GET /getAllProducts",()=>{
           test("should read all products",async()=>{
            const response=await request(app).get('/getAllProducts')
            expect(response.body.code).toBe(200)
           })
        })

        describe("POST /addProduct",()=>{
            let data={
                "name" : "phone",
                "price" : 7000,
                "desc" : "this is phone",
                "category_name" : "electronic devices",
            }
            test("should add an product",async()=>{
             const response=await request(app)
             .post('/addProduct').send(data)
             expect(response.body.code).toBe(200)
            })
         })


         describe("PUT /updateProduct/:id",()=>{
        let data={
            "name" : "phone",
            "price" : 8000,
            "desc" : "this is phone",
            "category_name" : "electronic devices",
        }
        test("should update product",async()=>{
         const response=await request(app)
         .put('/updateProduct/63ea5558e3a5f1df7251b20a')
         .send(data)
         expect(response.body.code).toBe(201)
        })
     })
        



     describe("DELETE /deleteProduct/:id",()=>{
        test("should delete product",async()=>{
         const response=await request(app)
         .delete('/deleteProduct/63ea550c43e81e962ebf56a9')
         expect(response.body.message).toBe("success")
        })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

