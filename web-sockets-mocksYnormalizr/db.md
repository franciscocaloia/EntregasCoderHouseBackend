## 1 y 2
use ecommerce
db.products.insertMany([{_id:1,name:"monitor",description:"monitor",img:"",price:5000,code:1},{_id:2,name:"mouse",description:"mouse",img:"",price:1000,code:2},{_id:3,name:"auricular",description:"auricular",img:"",price:3000,code:3},{_id:4,name:"teclado",description:"teclado",img:"",price:2000,code:4},{_id:5,name:"webcam",description:"webcam",img:"",price:500,code:5},{_id:6,name:"mousepad",description:"mousepad",img:"",price:500,code:6},{_id:7,name:"gabinete",description:"gabinete",img:"",price:3000,code:7},{_id:8,name:"placa de video",description:"placa de video",img:"",price:5000,code:8},{_id:9,name:"procesador",description:"procesador",img:"",price:5000,code:9},{_id:10,name:"memoria RAM",description:"memoria RAM",img:"",price:2000,code:10}])
db.messages.insertMany([{"_id":1,"name":"francisco ","content":"hola","date":"[2022/11/5  23:21]"},{"_id":2,"name":"francisco ","content":"buen dia","date":"[2022/11/5  23:21]"},{"_id":3,"name":"francisco ","content":"saludos","date":"[2022/11/5  23:21]"},{"_id":4,"name":"francisco ","content":"hola","date":"[2022/11/5  23:21]"},{"_id":5,"name":"francisco ","content":"estoy mandando un mensaje","date":"[2022/11/5  23:21]"},{"_id":6,"name":"francisco ","content":"buen dia grupoooo","date":"[2022/11/5  23:21]"},{"_id":7,"name":"francisco ","content":"como estas?","date":"[2022/11/5  23:21]"},{"_id":8,"name":"fulano ","content":"todo bien y vos?","date":"[2022/11/5  23:21]"},{"_id":9,"name":"francisco ","content":"todo bien por suerte","date":"[2022/11/5  23:21]"},{"_id":10,"name":"francisco ","content":"donde vas a ver el partido el domingo??","date":"[2022/11/5  23:21]"}])
## 3
db.products.find()
db.messages.find()

## 4

db.products.countDocuments()
db.messages.countDocuments()

## 5

### a
db.products.insertOne({{_id:11,name:"tableta digitalizadora",description:"tableta digitalizadora",img:"",price:1000,code:11}})

### b

#### 1 
        db.products.find({"price": {$lt:1000}})
#### 2
        db.products.find({$and:[{"price":{$gte:1000}},{"price":{$lte:3000}}]})
#### 3
        db.products.find({"price":{$gt:3000}})
#### 4
        db.products.find().sort({"price":1}).skip(2).limit(1)

### c
    db.products.updateMany({},{$set:{"stock":100}})

### d
    db.products.updateMany({"price":{$gte:4000}},{$set:{"stock":0}})

### e
    db.products.deleteMany({"price":{$lte:1000}})

## 6
db.createUser({user:"pepe",pwd:"asd456",roles:{[{role:"read",db:"ecommerce"}]}})