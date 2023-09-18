const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")


describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Review App",()=>{

        describe("GET /getAllReviews",()=>{
           test("should read all reviews",async()=>{
            const response=await request(app).get('/getAllReviews')
            expect(response.body.code).toBe(200)
           })
        })


        
        describe("POST /addReview",()=>{
            let data={
            "title" : "pasta review",
             "content" : "this is best pasta",
             "created_at" : "3/3/2012",
             "updated_at" : "4/3/2012",
            }
            test("should add an review",async()=>{
             const response=await request(app)
             .post('/addReview').send(data)
             expect(response.body.code).toBe(200)
            })
         })

    
         describe("PUT /updateReview/:id",()=>{
        let data={
            "title" : "meet review",
            "content" : "this is best meet",
            "created_at" : "3/3/2012",
            "updated_at" : "4/3/2012",
        }
        test("should update review",async()=>{
         const response=await request(app)
         .put('/updateReview/63ea5558e3a5f1df7251b20a')
         .send(data)
         expect(response.body.code).toBe(201)
        })
     })


     describe("DELETE /deleteReview/:id",()=>{
        test("should delete review",async()=>{
         const response=await request(app)
         .delete('/deleteReview/63ea550c43e81e962ebf56a9')
         expect(response.body.message).toBe("success")
        })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

