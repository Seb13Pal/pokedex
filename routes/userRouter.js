import { Router } from 'express'
import userModels from '../models/userModels.js'
import pokemonModels from '../models/pokemonModels.js'
import { comparePass, pass } from '../bcrypt.js'
import userController from '../controller/userController.js'
import authguard from '../authguard.js'
const userRouter = Router()

/////////////////INSCRIPTION//////////////////////////
userRouter.get('/inscription', async (req, res) => {
  let users = await userModels.find()
  res.render('inscription.twig', {
    users: users
  });
})
userRouter.post('/inscription', async (req, res) => {
  try {
    req.body.password = await pass(req.body.password)
      let user = new userModels(req.body)
    await user.save()
    res.redirect("/connection")
  } catch (error) {
    res.send(error)
  }
})
////////////////////////////////////////////////////

/////////////CONNECTION/////////////////////////////
userRouter.get('/connection', async (req, res) => {
  try {
    res.render('connection.twig', {
    
    });
  } catch (error) {
    res.send(error);
  }
});
userRouter.post('/connection', async (req, res) => {
  let user = await userController.connection(req)
  if (user) {
    req.session.user = user._id
    res.redirect('/pageprincipale')
  } else {
    res.send("erreur");
  }
})
userRouter.get('/logout', async (req, res) => {
  try {
    req.session.destroy()
    res.redirect("/connection")
  } catch (error) {
    res.send(error);
  }
})
////////////////////////////////////////////////////

///////////////INSCRIPTION POKEMON//////////////////
userRouter.get('/inscriptionpokemon',authguard, async (req, res) => {
  let users = await pokemonModels.find()
  res.render('inscriptionpokemon.twig', {
    users: users
  });
})

userRouter.post('/inscriptionpokemon', async (req, res) => {
  try {
    req.body.trainer = req.session.user
    let pkmn = new pokemonModels(req.body)
    await pkmn.save()
    res.redirect("/pageprincipale")
  } catch (error) {
    console.log(error);
  }
})
////////////////////////////////////////////////////

/////////////PAGE PRINCIPALE///////////////////////
userRouter.get('/pageprincipale', authguard,  async (req, res) => {
  let pokemons = await pokemonModels.find({ trainer: req.session.user })
  let userConnected = await userModels.findOne({ _id: req.session.user })
  if (userConnected) {
    userConnected = userConnected.name
  }
  res.render('pageprincipale.twig', {
    pokemons: pokemons,
    userConnected: userConnected
  });
})
/////////////////////////////////////////////////

///////////////USER/////////////////////////////
userRouter.get('/user/:id', async (req, res) => {
  try {
    let user = await userModels.findOne({ _id: req.params.id })
    res.json(user)
  } catch (error) {
    console.log(error);
  }
})
userRouter.get('/deleteUser/:id', async (req, res) => {
  try {
    await userModels.deleteOne({ _id: req.params.id })
    res.redirect("/users")
  } catch (error) {
    res.send(error);
  }
})
userRouter.get('/updateUser/:id', async (req, res) => {
  try {
    let user = await userModels.findOne({ _id: req.params.id })
    res.render("", {
      user: user
    })
  } catch (error) {
    res.send(error);
  }
})
userRouter.post('/updateUser/:id', async (req, res) => {
  try {
    await userModels.updateOne({ _id: req.params.id }, req.body)
    res.redirect("/users")
  } catch (error) {
    res.send(error);
  }
})
////////////////////////////////////////////////////////////

//////////////////POKEMON/////////////////////////////////
userRouter.get('/deletePokemon/:id', async (req, res) => {
  try {
    await pokemonModels.deleteOne({ _id: req.params.id })
    res.redirect("/pageprincipale")
  } catch (error) {
    res.send(error);
  }
})
userRouter.get('/updatePokemon/:id', async (req, res) => {
  try {
    let pokemon = await pokemonModels.findOne({ _id: req.params.id })
    res.render('inscriptionpokemon.twig', {
      pokemon: pokemon
    }
    )
  } catch (error) {
    res.send(error);
  }
})
userRouter.post('/updatePokemon/:id', async (req, res) => {
  try {
    await pokemonModels.updateOne({ _id: req.params.id }, req.body)
    res.redirect("/pageprincipale")
  } catch (error) {
    res.send(error);
  }
})
/////////////////////////////////////////////////////////////////////

export default userRouter

