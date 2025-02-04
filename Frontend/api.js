
export const getCoordinates = async (req, res) => {
   try {
     const response = await fetch("/api/user/coordinates",{
         method:"GET",
 
     });
 
     const data = await response.json();
     if(response.ok){
         console.log(data);
     }
     else{
         console.log(data.message);
     }
   } catch (error) {
     console.error(error.message);
    
   }
}