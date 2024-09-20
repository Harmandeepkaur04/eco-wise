'use client';

import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function GoogleMaps() {

    const mapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initializeMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: 'quarterly',
            });

            const { Map } = await loader.importLibrary('maps');

            const ECLaEC = {
                lat: 51.0242238379019,
                lng: -113.93486134791175,
                url: 'https://maps.app.goo.gl/cJQFXdWRwWmeBfoH7',
                label: 'East Calgary Landfill and Eco Centre'
            };

            const SLaEC = {
                lat: 51.15987213095209, 
                lng: -114.1872637334405,
                url: 'https://maps.app.goo.gl/qXzc2XNTimubBqhJ7',
                label: 'Spyhill Landfill and Eco Centre'
            };

            const SL = {
                lat: 50.94444527624795, 
                lng: -113.93710278317985,
                url: 'https://maps.app.goo.gl/4ie6rAzaSLznqfXF7',
                label: 'Shepard Landfill and Eco Centre'
            };

            const Center = {
                lat: 51.04426294335533, 
                lng: -114.0723209037262
            }

            const markerPositions = [ECLaEC, SLaEC, SL];

            const { Marker } = (await loader.importLibrary('marker')) as google.maps.MarkerLibrary;

            const options: google.maps.MapOptions = {
                center: Center,
                zoom: 11,
                mapId: 'NEXT_MAPS_TUTS',
            };

            const map = new Map(mapRef.current as HTMLDivElement, options);

            const { InfoWindow } = await loader.importLibrary('maps');

            markerPositions.forEach(position => {
                const marker = new Marker({
                    map: map,
                    position: { lat: position.lat, lng: position.lng },
                });

                // Info window to show on hover
                const infoWindow = new InfoWindow({
                    content: `<div>${position.label}</div>`,
                });

                // Show info window on hover
                marker.addListener('mouseover', () => {
                    infoWindow.open(map, marker);
                });

                // Hide info window when not hovering
                marker.addListener('mouseout', () => {
                    infoWindow.close();
                });

                // Redirect on click
                marker.addListener('click', () => {
                    window.open(position.url, '_blank');
                });
            });
        };

        initializeMap();
    }, []);


    return (
        <div className="square-map-container">
            <div ref={mapRef} className="square-map">
                GoogleMaps
            </div>
        </div>
    );
}
