[
    {
        "_id": "60e4b09ad51f4827f40eab50",
        "rating": 5,
        "comment": "Imagine all the eatables, living in conFusion!",
        "author": "John Lemon",
        "date": "2012-10-16T17:57:28.556Z"
    },
    {
        "_id": "60e4b09ad51f4827f40eab51",
        "rating": 4,
        "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        "author": "Paul McVites",
        "date": "2014-09-05T17:57:28.556Z"
    },
    {
        "_id": "60e4b09ad51f4827f40eab52",
        "rating": 3,
        "comment": "Eat it, just eat it!",
        "author": "Michael Jaikishan",
        "date": "2015-02-13T17:57:28.556Z"
    },
    {
        "_id": "60e4b09ad51f4827f40eab53",
        "rating": 4,
        "comment": "Ultimate, Reaching for the stars!",
        "author": "Ringo Starry",
        "date": "2013-12-02T17:57:28.556Z"
    },
    {
        "_id": "60e4b09ad51f4827f40eab54",
        "rating": 2,
        "comment": "It's your birthday, we're gonna party!",
        "author": "25 Cent",
        "date": "2011-12-02T17:57:28.556Z"
    }
]
  User.findOne({username:req.body.name})
                    .then((user)=>{
                        user.firstName=req.body.firstName;
                        user.lastName=req.body.lastName;
                        user.save()
                        .then((data)=>{
                            passport.authenticate('local')(req,res,()=>{
                                res.statusCode=200;
                                res.end('User Signed up successfully')
                            })
                        })
                        
                    })
              
              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGVjYmI0NjJjYWFjYjJmZjg4YzY2ZWYiLCJpYXQiOjE2MjYxMjg2NzUsImV4cCI6MTYyNjEzMjI3NX0.LUiZ0DGQbNTPA55Yox2-2fZnjf01mIt0ozQTZXEbnEY

              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGVjYmNmMGE1NWJhYTJiYTgwOWE2NWYiLCJpYXQiOjE2MjYxMjg5MzgsImV4cCI6MTYyNjEzMjUzOH0.YoqbjaroG-txRPYCw2S4zZvgq_WjzxYryyKzUh6S3zo
