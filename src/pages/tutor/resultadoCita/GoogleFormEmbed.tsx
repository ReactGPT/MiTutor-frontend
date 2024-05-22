import React, { useState } from 'react'; 
import FormfacadeEmbed from "@formfacade/embed-react"; 
import axios from 'axios';

type InputProps = {
  className:string; 
}

function GoogleForm({className}:InputProps){ 

  async function onSubmitForm(){ 
    //aca llama al servicio
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbyRW0w8YFDBjmYyuLBpfk8sfPqNKTkkfsnd87CO6aOjtAudDhCvdAMVhemiC9CTWkkb_Q/exec';
 
    try{
      const response = await axios.get(scriptUrl);  
      console.log(response)
       
    }catch(error){
        throw new Error("Error en datos");
    }
  }  

  return (  
    <div className={className}>  
        <FormfacadeEmbed
          formFacadeURL="https://formfacade.com/include/102689651376161215250/form/1FAIpQLSfIzrqfZ-ghfsMGvIjad-xJn9NZhqTYp69JI8oeJQsVB9g4Aw/classic.js/?div=ff-compose"
          onSubmitForm={onSubmitForm}
        />
    </div>
     
  );
};

export default GoogleForm;



