'use client';

import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function GoogleMaps() {

    /* useref is a react hook that reference a value not needed for rendering */
    const mapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initializeMap = async () => {
            const loader = new Loader ({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: 'quarterly',
            })

            const { Map } = await loader.importLibrary('maps');

            const ECLaEC = {
                lat: 51.02435693839096,
                lng: -113.93487173195719,
            };
            
            const HHW = {
                lat: 51.023235297488036,
                lng: -113.9336581240099,
            };
            
            // Array of marker positions
            const markerPositions = [ECLaEC, HHW];
            
            // MARKER
            const { Marker } = (await loader.importLibrary('marker')) as google.maps.MarkerLibrary;
            
            const options: google.maps.MapOptions = {
                center: ECLaEC, // Center map on one of the markers
                zoom: 11,
                mapId: 'NEXT_MAPS_TUTS',
            };
            
            const map = new Map(mapRef.current as HTMLDivElement, options);
            
            // Add markers to the map
            markerPositions.forEach(position => {
                new Marker({
                    map: map,
                    position: position,
                });
            });
            
        };

        initializeMap();
    }, []);

    return (
    <div className="h-[400px]" ref={mapRef}>
        GoogleMaps
    </div>
    );
}

