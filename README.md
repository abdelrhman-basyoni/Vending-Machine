# Vending-Machine



## Description

  this is exmple for a vending machine 

## project Requirments
In this exercise we want you to design an API for a vending machine, allowing users
with a “seller” role to add, update or remove products, while users with a “buyer” role
can deposit coins into the machine and make purchases. Your vending machine
should only accept 5, 10, 20, 50 and 100 cent coins

**Tasks**

1- REST API should be implemented consuming and producing
“application/json”.

2- Implement product model with amountAvailable, cost, productName and
sellerId fields.

3- Implement user model with username, password, deposit and role fields.

4- Implement CRUD for users (POST shouldn’t require authentication).

5- Implement CRUD for a product model (GET can be called by anyone, while
POST, PUT and DELETE can be called only by the seller user who created the
product)Implement /deposit endpoint so users with a “buyer” role can deposit 5, 10,
20, 50 and 100 cent coins into their vending machine account.

6- Implement /buy endpoint (accepts productId, amount of products) so users
with a “buyer” role can buy products with the money they’ve deposited. API
should return total they’ve spent, products they’ve purchased and their
change if there’s any (in 5, 10, 20, 50 and 100 cent coins).

7- Implement /reset endpoint so users with a “buyer” role can reset their
deposit.

## Technologies
- Nodejs
- nestjs
- TypeScript
- mongodb


## Installation

```bash
$ npm install
```
#env
```
create .env file on the same lvl as env-example and copy the keys from it(add ur mongodb connection string in hte key DB_URL)
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

