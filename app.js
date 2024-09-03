const express =require('express');
const Notes  = require('./DATA');
 class Servidor {
   
  constructor() {
    this.app = express();
    this.port = process.env.PORT || '4000';
    this.apiRouter = {
        usuarios:"/api/usuarios",
        inicio: "/"
      }
    this.ConeccionBase();
    this.Middleware();
    this.Router();
  }
  Middleware(){
    this.app.use(express.json());

  }
  Router(){
    this.app.get('/api/notes',(resquest,response)=>{
      const data = Notes;
     return response.json(data)
    })
    this.app.get('/api/notes/:id',(resquest,response)=>{
      const {id} = resquest.params
      const data =  Notes.find(n=> n.id == id)
      console.log(data)
      return response.json({data})
    })
    this.app.post('/api/notes',(resquest,response)=>{
      const {content,important} = resquest.body;
      if(!content){
        return response.status(400).json({erro:'content is important'})
      }
      const ids = Notes.map(nota=> nota.id );
      const newNota={
        id:Math.max(...ids) + 1,
        content,
        date: new Date(),
        important : typeof important !== 'undefined' ? important : false
      }
      const nota  = [...Notes,newNota]
     return response.json(nota)

     
    }
  
  )

    this.app.delete('/api/notes/:id',(resquest,response)=>{
      const {id} = resquest.params;
      const data = Notes.filter( n => n.id != id)
      console.log(data)
      
     return response.json({data})
    })
    this.app.use((resquest,respons,next)=>{
       respons.status(404).json(
        {error:'Not found'}
       )
       next()
    })
  }
  
  async ConeccionBase(){
    console.log('Connection has been established successfully.');
  }
  Listen(){
    this.app.listen(this.port, () => {
      console.log('Server on port', this.port);
    });
  }
}


module.exports = Servidor