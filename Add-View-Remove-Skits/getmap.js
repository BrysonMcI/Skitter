var client = require('./connection.js');

client.indices.getMapping({  
	    index: 'skitter',
		    type: 'skit',
			  },
			  function (error,response) {  
			  if (error){
						console.log(error.message);
							}
								else {
										  console.log("Mappings:\n",response.skitter.mappings.skit.properties);
											  }
	  });
