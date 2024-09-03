// import axios from 'axios';

// async function getSuburbAndPostcodeByPostcode(postcode: string): Promise<{ suburb: string; postcode: string } | null> {
//     try {
//         const apiKey = 'YOUR_API_KEY';
//         const response = await axios.get(
//             `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode},AU&key=${apiKey}`
//         );

//         const results = response.data.results;

//         if (results.length > 0) {
//             let suburb = '';
//             let postalCode = '';

//             // Iterate over the address components to find the suburb and postal code
//             results[0].address_components.forEach((component: any) => {
//                 if (component.types.includes('locality')) {
//                     suburb = component.long_name;
//                 }
//                 if (component.types.includes('postal_code')) {
//                     postalCode = component.long_name;
//                 }
//             });

//             return { suburb, postcode: postalCode };
//         }

//         return null;
//     } catch (error) {
//         console.error('Error fetching location data:', error);
//         return null;
//     }
// }

// // Example usage
// getSuburbAndPostcodeByPostcode('2000').then(data => {
//     if (data) {
//         console.log(`Suburb: ${data.suburb}, Postcode: ${data.postcode}`);
//     } else {
//         console.log('No results found.');
//     }
// });

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page