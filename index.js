const express = require("express");
const morgan = require('morgan')
const cors = require('cors')
const app = express();
app.use(express.static('dist'))
app.use(express.json());
// const contentLogger = morgan('tiny')
app.use(cors())
morgan.token('body',(request,response)=>{
    console.log(request.body)
    return JSON.stringify(request.body);
})
const contentLogger = morgan(':body :method :url :status :res[content-length] - :response-time ms')
let contacts = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.get("/api/persons", (request, response) => {
  response.json(contacts);
});
app.get("/info", (request, response) => {
  const total = contacts.length;
  const date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  response.send(`
        <p>Phonebook has info for ${total} people</p>
        <p> ${days[date.getDay()]} ${
    months[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} IST</p>
    `);
});
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const contact = contacts.find((contact) => contact.id === id);
  if (contact) {
    response.json(contact);
  } else {
    response.status(404).end();
  }
});
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  if (id) {
    contacts = contacts.filter((contact) => contact.id !== id);
    response.status(204).end()
  } else {
    response.status(404).end()
  }
});
app.post('/api/persons', contentLogger ,(request,response)=>{
    const body = request.body
    const id = String(Math.floor(Math.random()*1e11))
    if(!body){
        return response.status(404).json({
            error:'content missing'
        })
    }
    if(!body.name){
        return response.status(400).json({error:'name is missing'})
    }
    if(!body.number){
        return response.status(400).json({error:'number is missing'})
    }
    const user = contacts.find(contact => contact.name === body.name)
    if(user){
        return response.status(400).json({error:'user is already present'})
    }
    const contact = {id:id,name:body.name,number:body.number}
    contacts = contacts.concat(contact);
    response.json(contact)
})

const PORT = 3001;
app.listen(PORT);
