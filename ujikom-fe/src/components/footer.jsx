import React, { useEffect, useState } from "react";
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from "react-icons/fa";
import Raps from '../assets/raps.png';

const Footer = () => {
  const [location, setLocation] = useState({ lat: -6.2088, lng: 106.8456 });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setError("Location access denied");
        }
      );
    } else {
      setError("Geolocation not supported");
    }
  }, []);

  return (
    <footer>
      <section className="top">
        <img src={Raps} alt="Logo" className="footer-logo" />
        <div className="links">
          <div className="links-column">
            <h2>Raps Point</h2>
            <a href="#">Terbaik</a>
            <a href="#">Tercepat</a>
            <a href="#">Termurah</a>
          </div>
          <div className="links-column">
            <h2>Our Partner</h2>
            <a href="#">Dongkak</a>
            <a href="#">Acursio</a>
            <a href="#">Oura Store</a>
            <a href="#">Takapedia</a>
          </div>
          <div className="links-column socials-column">
            <h2>Social Media</h2>
            <a href="#"><FaInstagram /> Instagram</a>
            <a href="#"><FaTiktok /> Tiktok</a>
            <a href="#"><FaYoutube /> Youtube</a>
            <a href="#"><FaFacebook /> Facebook</a>
          </div>
        </div>
      </section>
      <section className="bottom">
        <div className="footer-content">
          <div className="footer-info">
            <p className="copyright">© 2025 All rights reserved</p>
            <div className="legal">
              <a href="#">Contact</a> 
              <a href="#">Terms</a> 
              <a href="#">Privacy</a>
            </div>
          </div>
         
          <div className="map-container">
            <h2 className="map-title">Kantor Pusat</h2> {/* Tambahan Judul */}
            <iframe
              title="Google Map"
              width="300"
              height="200"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAaMweXphWQab7zRFPoOfnFGodUXvZnn_w&q=-6.891135,107.628750`}
            ></iframe>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
