import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import marker images
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';

function Map() {
    useEffect(() => {
        // Fix the default icon
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: markerIcon2x,
            iconUrl: markerIcon,
            shadowUrl: markerShadow,
        });

        const map = L.map('map').setView([28.2096, 83.9856], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        let clickMarker;

        map.on('click', function (e) {
            var lat = e.latlng.lat;
            var lng = e.latlng.lng;
            document.getElementById('info').textContent = `Latitude: ${lat}, Longitude: ${lng}`;
            
            if (clickMarker) {
                map.removeLayer(clickMarker);
            }

            clickMarker = L.marker([lat, lng]).addTo(map);
        });

        return () => {
            map.remove();
        };
    }, []);

    return (
        <div>
            <div id="map" style={{ height: '350px', width: '400px', zIndex: 0 }}></div>
            <p id="info"></p>
        </div>
    );
}

export default Map;
