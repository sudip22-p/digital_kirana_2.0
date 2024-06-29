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

        let marker, circle, zoomed;
        let clickMarker;

        function success(pos) {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            const accuracy = pos.coords.accuracy;

            if (marker) {
                map.removeLayer(marker);
                map.removeLayer(circle);
            }
            marker = L.marker([lat, lng]).addTo(map);
            circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

            if (!zoomed) {
                zoomed = map.fitBounds(circle.getBounds());
            }
            map.setView([lat, lng]);
        }

        function error(err) {
            if (err.code === 1) {
                alert('Please allow geolocation access');
            } else {
                alert('Cannot get current location');
            }
        }

        // navigator.geolocation.watchPosition(success, error);

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
            {/* <h1>Map user location</h1> */}
            {/* <h1>Works</h1> */}
            <div id="map" style={{ height: '350px', width: '400px', zIndex: 0 }}></div>
            <p id="info"></p>
        </div>
    );
}

export default Map;
