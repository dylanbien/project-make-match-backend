# MakeMatch backend

*a backend for the MakeMatch project*

## Data Structures
### Product
```
{
  name: string
  desc: string
  type: concealer | foundation
  tone: hex code string
  imgs: [string]
  id: string
}
```

### User
```
{
  username: string
  email: string
  password: salted and hashed string
  tone: hex code string
  id: string
}
```

## Routes
- `GET api/products?type={concealer|foundation}&tone={hex code}`
- `GET api/products/:id`
- `POST api/user/signin`
- `POST api/user/signup`
- `PATCH api/user/:id`

### GET api/products
`GET api/products?type={'concealer'|'foundation'}&tone={hex code}`
specify these two query parameters
returns a list of matching `product` objects

### GET api/products/:id
returns a `product` object

### POST api/user/signin
specify the `email` and `password` fields in the body
returns an object containing a `token` and `user` object without the `password` field

### POST api/user/signup
specify the `username`, `email`, `password`, and `tone` fields in the body
returns an object containing a `token` and `user` object without the `password` field

### PATCH api/user/:id
todo

[deployed url]()
