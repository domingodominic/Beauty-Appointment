import { providermodel } from "../model/providermodel.js";
import express from "express";
const route = express.Router();


//route - provider
route.post('/', async (request, response) => {
    try {
      if (
        !request.body.firstname ||
        !request.body.lastname ||
        !request.body.username ||
        !request.body.password ||
        !request.body.confirmPassword ||
        !request.body.municipality ||
        !request.body.businessName ||
        !request.body.businessEmail ||
        !request.body.businessContactNumber ||
        !request.body.services
      ) {
        return response.status(400).send({
          message: 'Send all required fields! ',
        });
      }
  
      const newProvider = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        username: request.body.username,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        municipality: request.body.municipality,
        businessName: request.body.businessName,
        businessEmail: request.body.businessEmail,
        businessContactNumber: request.body.businessContactNumber,
        services: request.body.services,
      };
  
      const provider = await providermodel.create(newProvider);
  
      return response.status(201).send(provider);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  //route - one get
  //try lng
  route.get('/', async (request, response) => {
    try {

        const { id } = request.params;
        const provider = await providermodel.find({});
      
        
        return response.status(200).json({count:provider.length, data: provider});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
    })

  //Update - services
  //debug

route.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.firstname ||
            !request.body.lastname ||
            !request.body.username ||
            !request.body.password ||
            !request.body.confirmPassword ||
            !request.body.municipality ||
            !request.body.businessName ||
            !request.body.businessEmail ||
            !request.body.businessContactNumber ||
            !request.body.services
        ) {
            return response.status(400).send({
                message: 'Send all required feilds!',
            });
        }

        const { id } = request.params;
        const result = await providermodel.findByIdAndUpdate(id, request.body );
       

        if (!result) {
            return response.status(404).json({message: 'Services not found!'});
        }
        
        return response.status(200).send({message: 'Services updated successfully'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//delete - provider
route.delete('/:id', async (request, response) => {
  try {
    const {id} = request.params;
    const del = await providermodel.findByIdAndDelete(id);
    
    return response.status(200).send({message:"Successful deleted"})
  } catch (error) {
    console.log(error);
  }
})
  export default route;