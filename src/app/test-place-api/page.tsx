"use client"

import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const libraries: ('places')[] = ['places'];

const MyComponent: React.FC = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDbkaRxITpzLhs_FzEMOuI0vuMSKzZ1Amk', // Use your API key here
    libraries,
  });

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [input, setInput] = useState<string>('');

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      console.log(place);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <div>
      {isLoaded && (
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          options={{
            componentRestrictions: { country: 'au' }, // Restrict to Australia
          }}
        >
          <input
            type="text"
            placeholder="Search places"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='border-2 p-4'
          />
        </Autocomplete>
      )}
      {loadError && <div>Error loading maps</div>}
    </div>
  );
};

export default MyComponent;
