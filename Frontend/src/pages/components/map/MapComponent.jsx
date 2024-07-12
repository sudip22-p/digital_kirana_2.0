import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Map() {
    useEffect(() => {
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
