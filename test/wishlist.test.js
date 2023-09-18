const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")



describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Wishlist App",()=>{

        describe("GET /getAllWishlists",()=>{
           test("should read all wishlists",async()=>{
            const response=await request(app).get('/getAllWishlists')
            expect(response.body.code).toBe(200)
           })
        })


        
        
        describe("POST /addWishlist",()=>{
            let data={
                "product_name" : "meet",
                 "price" : "300",
                 "status" : "pending",
            }
            test("should add an wishlist",async()=>{
             const response=await request(app)
             .post('/addWishlist').send(data)
             expect(response.body.code).toBe(200)
            })
         })
    
         describe("PUT /updateWishlist/:id",()=>{
        let data={
            "product_name" : "rice",
             "price" : "100",
             "status" : "pending",
        }
        test("should update wishlist",async()=>{
         const response=await request(app)
         .put('/updateWishlist/63ea5558e3a5f1df7251b20a')
         .send(data)
         expect(response.body.code).toBe(201)
        })
     })


     describe("DELETE /deleteWishlist/:id",()=>{
        test("should delete wishlist",async()=>{
         const response=await request(app)
         .delete('/deleteWishlist/63ea550c43e81e962ebf56a9')
         expect(response.body.message).toBe("success")
        })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

