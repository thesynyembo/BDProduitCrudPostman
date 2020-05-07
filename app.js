const express= require('express');
const mysql=require('mysql');
const bodyParser=require('body-parser');

//Initialisation du serveur express
const app=express();

//analyse de l'application/urlencoded

app.use(bodyParser.urlencoded({extended:false}));

//analyse de l'application/json
app.use(bodyParser.json())

//Configation de la base de données

const connection=mysql.createConnection({
    host:'localhost',
    user:'thesyNyembo',
    database:'jojoFashion',
    password:'12345'
})
//connexion à la base de données

connection.connect((erreur)=>{
    if(erreur){
        throw erreur;
    }
    console.log('la connexion est établie')
})

//Get
app.get('/api/produits',(req,res)=>{
    connection.query('select * from Produit',(erreur,resultat)=>
    { if(erreur) throw erreur;
    return res.send(resultat);})
})

app.get('/api/produits/:id',(req,res)=>{
    connection.query(`select * from Produit where id=${req.params.id}`,(erreur,resultat)=>
    { if(erreur) throw erreur;
        return res.send(resultat);})
})

//post

app.post('/api/produits',(req,res)=>{
    connection.query(`insert into Produit(nom,quantite,prixUHT) values('${req.body.nom}','${req.body.quantite}','${req.body.prixUHT}')`,(erreur,resultat)=>
    { if(erreur) throw erreur;
        return res.send(resultat);})
})

//put
app.put('/api/produits/:id',(req,res)=>{
    connection.query(`UPDATE Produit Set nom="${req.body.nom}", quantite="${req.body.quantite}",prixUHT="${req.body.prixUHT}" where id=${req.params.id}`,(erreur,resultat)=>
    { if(erreur) throw erreur;
        return res.send(resultat);})
})




//Définir le port
const PORT=5000
app.listen(PORT,function(){
    console.log(`le serveur écoute sur le port ${PORT}`);
});
