import React, { useState } from "react";
import jokiimg from "../assets/joki.png";
import mythic from "../assets/mythic.jpg"; 
import rapslogo from "../assets/rapsmajubersama_logo.png"; 
import background from "../assets/background1.png";
import topup from "../assets/topup.webp"; 
import beli from "../assets/beli.webp"; 
import background2 from "../assets/background2.png";

const RankBoostForm = () => {
    const [username, setUsername] = useState("");
    const [akun, setAkun] = useState("");
    const [nominal, setnominal] = useState("");
    const [tanggalmasuk, setTanggalmasuk] = useState("");
    const [tanggalkeluar, setTanggalkeluar] = useState("");
    const [showInput, setShowInput] = useState(false);
   

  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log({ username, akun, nominal, });
    };

 

  return (

    
    
    <div className="container-form">
      
      <h2>Mau Dijoki Sampai Mana?</h2>
      <div className="form-group">
        <label>Masukkan nama</label>
        <input
                type="text"
                placeholder="Nama"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
              />
      </div>
      <div className="form-group">
        <label>Masukkan Akun</label>
        <input
                type="text"
                placeholder="Akun"
                value={akun}
                onChange={(e) => setAkun(e.target.value)}
                className="input"
              />
      </div>
      <div className="form-group">
        <label>Masukkan Nominal</label>
        <input
                type="text"
                placeholder="Nominal"
                value={nominal}
                onChange={(e) => setnominal(e.target.value)}
                className="input"
              />
      </div>
      <div className="form-group">
        <label>Masukkan Tanggal Masuk</label>
        <input
                type="date"
                placeholder="Tanggal Masuk"
                value={tanggalmasuk}
                onChange={(e) => setTanggalmasuk(e.target.value)}
                className="input"
              />
      </div>
      <div className="form-group">
        <label>Masukkan Tanggal Keluar</label>
        <input
                type="date"
                placeholder="Tanggal Masuk"
                value={tanggalkeluar}
                onChange={(e) => setTanggalkeluar(e.target.value)}
                className="input"
              />
      </div>

      
      
      <button className="calculate-btn">Submit</button>
    </div>
  );
};



const MainPage = () => {
  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Welcome to Our Website</h1>
        <p className="description">Joki terbaik hanya di Raps Point.</p>
        <div className="main-bg-container">
          <img src={background} alt="" className="main-bg" />
        </div>
        <div className="title-populer"><h1>POPULER</h1></div>
        <div className="image-gallery">
          <div className="image-card">
            <img src={topup} alt="Top Up" className="image" />
          </div>
          <div className="image-card">
            <img src={jokiimg} alt="Joki" className="image" />
          </div>
          <div className="image-card">
            <img src={beli} alt="Beli Akun" className="image" />
          </div>
        </div>
      </div>
      <div className="container-main-bg-2">
        <img src={background} alt="" className="main-bg-2" />
      </div>
      <div className="container-story">
        <h1 className="title-story">Our Story</h1>
        <img src={rapslogo} alt="" className="story-logo" />
        <div className="paragraf-story">
          <h3>PT RAPS MAJU BERSAMA</h3>
          <p>Kami merupakan perusahaan yang didirikan sejak tahun 2020 untuk melayani seluruh kebutuhan game anda mulai dari topup, jual beli akun, jual beli mata uang dalam game, Investasi dalam game, dan lainnya, kami juga kedepannya akan memperbanyak jasa dan kegiatan perusahaan yang akan memudahkan ada dalam segala kegiatan dalam game maupun diluar game.</p>
        </div>
      </div>

      
     
      <RankBoostForm />
      <div className="stats-container">
        <h1 className="title-2">RAPSPOINT</h1>
        <p className="description">Website jual beli Akun, joki akun, dan top up Mobile Legends terpercaya di Indonesia. Ayo wujudkan impian kamu bersama RAPSPOINT!</p>
        <div className="stats-grid">
          <div className="stat-item">
            <h2 className="stat-number">10000+</h2>
            <p className="stat-label">User Member</p>
          </div>
          <div className="stat-item">
            <h2 className="stat-number">100000000+</h2>
            <p className="stat-label">Total Top Up Transaction</p>
          </div>
          <div className="stat-item">
            <h2 className="stat-number">15000000+</h2>
            <p className="stat-label">Total Joki Transaction</p>
          </div>
          <div className="stat-item">
            <h2 className="stat-number">10000+</h2>
            <p className="stat-label">Total Sold Account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
