import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './home.css';

function Home() {
  return (
    <div className="parent-container">
      <div className="header">
        <a href="#car">Car</a>
        <a href="#bike">Bike</a>
        <a href="#sports_car">Sports Car</a>
        <a href="#Cycle">Cycle</a>
      </div>
      <div className="home">
        <div className='top'>
          <h1 id="car">CAR</h1>
        </div>
        <div className="home__container">
          <div className='vehicle-card'>
            <img src="https://imgd-ct.aeplcdn.com/370x231/n/cw/ec/132561/taisor-right-front-three-quarter.png?isig=0&q=80" alt="Car 1" />
            <div className='vehicle-info'>
              <h3>Toyota</h3>
              <p>Price: ₹15,00,000</p>
              <p>Model: 2024</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNih8DkVoBmHgsj5HLmRpY7twk7YRWFRaNBs0uA3zy_7TPFcSbu9kEOjt_NHMAk5vufHE&usqp=CAU" alt="Car 2" />
            <div className='vehicle-info'>
              <h3>Honda</h3>
              <p>Price: ₹16,00,000</p>
              <p>Model: 2023</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://etimg.etb2bimg.com/photo/93698533.cms" alt="Car 4" />
            <div className='vehicle-info'>
              <h3>Hyundai</h3>
              <p>Price: ₹12,00,000</p>
              <p>Model: 2022</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/Features/_New%20EVs%20Resized%20and%20Watermarked._005.jpeg&c=0" alt="Car 5" />
            <div className='vehicle-info'>
              <h3>Tesla</h3>
              <p>Price: ₹32,00,000</p>
              <p>Model: 2024</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://images.91wheels.com/assets/b_images/main/models/profile/profile1694686428.jpg?width=360&q=60?w=750&q=60" alt="Car 6" />
            <div className='vehicle-info'>
              <h3>Ford</h3>
              <p>Price: ₹18,00,000</p>
              <p>Model: 2023</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://images.91wheels.com/assets/b_images/main/models/profile/profile1694686428.jpg?width=360&q=60?w=750&q=60" alt="Car 6" />
            <div className='vehicle-info'>
              <h3>Chevrolet</h3>
              <p>Price: ₹19,00,000</p>
              <p>Model: 2023</p>
            </div>
          </div>
        </div>

        <div className='top'>
          <h1 id="bike">Bike</h1>
        </div>
        <div className="home__container">
          <div className='vehicle-card'>
            <img src="https://bd.gaadicdn.com/processedimages/yamaha/mt-15-2-0/source/mt-15-2-06613f885e681c.jpg" alt="Bike 1" />
            <div className='vehicle-info'>
              <h3>Yamaha MT-15</h3>
              <p>Price: ₹3,00,000</p>
              <p>Model: 2024</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://5.imimg.com/data5/LX/PM/GLADMIN-68162457/kawasaki-ninja-h2-bike.png" alt="Bike 2" />
            <div className='vehicle-info'>
              <h3>Kawasaki Ninja H2</h3>
              <p>Price: ₹20,00,000</p>
              <p>Model: 2023</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://www.carandbike.com/_next/image?url=https%3A%2F%2Fimages.carandbike.com%2Fbike-images%2Fbig%2Ftvs%2Fronin%2Ftvs-ronin.jpg%3Fv%3D10&w=3840&q=75" alt="Bike 3" />
            <div className='vehicle-info'>
              <h3>TVS Ronin</h3>
              <p>Price: ₹35,000</p>
              <p>Model: 2023</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://static.toiimg.com/photo/80452572.cms" alt="Bike 4" />
            <div className='vehicle-info'>
              <h3>Royal Enfield</h3>
              <p>Price: ₹4,50,000</p>
              <p>Model: 2022</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://bd.gaadicdn.com/processedimages/suzuki/hayabusa/640X309/hayabusa6433f99fc006a.jpg" alt="Bike 5" />
            <div className='vehicle-info'>
              <h3>Suzuki Hayabusa</h3>
              <p>Price: ₹10,00,000</p>
              <p>Model: 2024</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdlsKoCfSs8FO5J5bbs7Zxyr2ZstcxBaFzO3sAsbJoUCzBsAUnbgC6toG60qxX-Vm0kOw&usqp=CAU" alt="Bike 6" />
            <div className='vehicle-info'>
              <h3>Ducati Panigale</h3>
              <p>Price: ₹22,00,000</p>
              <p>Model: 2023</p>
            </div>
          </div>
        </div>

        <div className='top'>
          <h1 id="sports_car">Sports_car</h1>
        </div>
        <div className="home__container">
          <div className='vehicle-card'>
            <img src="https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/body-image/public/8-lotus-emira-top-10_0.jpg?itok=Gji179uE" alt="Sports Car 1" />
            <div className='vehicle-info'>
              <h3>Lotus Emira</h3>
              <p>Price: ₹50,00,000</p>
              <p>Model: 2024</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://www.usnews.com/object/image/0000018b-fa28-dc80-a9ef-ffe9f8290001/01-2024-chevrolet-corvette-angular-front-jmv.JPG?update-time=1700709318771&size=responsiveGallery" alt="Sports Car 2" />
            <div className='vehicle-info'>
              <h3>Chevrolet Corvette</h3>
              <p>Price: ₹45,00,000</p>
              <p>Model: 2024</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://www.prpnewswire.com/wp-content/uploads/2023/09/New-Sports-Car.jpg" alt="Sports Car 3" />
            <div className='vehicle-info'>
              <h3>Porsche 911</h3>
              <p>Price: ₹70,00,000</p>
              <p>Model: 2023</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://t3.ftcdn.net/jpg/05/62/51/76/360_F_562517637_cRcbpMBacqnl89fjdvlGgc77PixfpfOF.jpg" alt="Sports Car 4" />
            <div className='vehicle-info'>
              <h3>Ferrari F8</h3>
              <p>Price: ₹2,00,00,000</p>
              <p>Model: 2024</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://akm-img-a-in.tosshub.com/sites/visualstory/wp/2024/03/KEG5ZE7UNVIUDIYHJDIZ37DCXI-scaled.jpg" alt="Sports Car 5" />
            <div className='vehicle-info'>
              <h3>Lamborghini Huracan</h3>
              <p>Price: ₹2,50,00,000</p>
              <p>Model: 2023</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://dn1qkewum0hvl.cloudfront.net/blog/wp-content/uploads/2014/05/Dodge_Viper_AME.jpg" alt="Sports Car 6" />
            <div className='vehicle-info'>
              <h3>Dodge Viper</h3>
              <p>Price: ₹60,00,000</p>
              <p>Model: 2022</p>
            </div>
          </div>
        </div>

        <div className='top'>
          <h1 id="Cycle">Cycle</h1>
        </div>
        <div className="home__container">
          <div className='vehicle-card'>
            <img src="https://m.media-amazon.com/images/I/61qAJJ97BzL.jpg" alt="Cycle 1" />
            <div className='vehicle-info'>
              <h3>Giant Talon</h3>
              <p>Price: ₹35,000</p>
              <p>Model: 2024</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://m.media-amazon.com/images/I/51IOt7voNjL._AC_UF894,1000_QL80_.jpg" alt="Cycle 2" />
            <div className='vehicle-info'>
              <h3>Trek Marlin</h3>
              <p>Price: ₹50,000</p>
              <p>Model: 2023</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://m.media-amazon.com/images/I/515uQT12cVL.jpg" alt="Cycle 3" />
            <div className='vehicle-info'>
              <h3>Specialized Rockhopper</h3>
              <p>Price: ₹48,000</p>
              <p>Model: 2022</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://5.imimg.com/data5/ANDROID/Default/2023/12/366207198/VG/EN/MR/189843419/product-jpeg-500x500.jpg" alt="Cycle 4" />
            <div className='vehicle-info'>
              <h3>Cannondale Trail</h3>
              <p>Price: ₹60,000</p>
              <p>Model: 2024</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://images.91wheels.com/news/wp-content/uploads/2021/05/Hercules-roadeo-turner-2016.jpg?width=360&&q=70" alt="Cycle 5" />
            <div className='vehicle-info'>
              <h3>Hercules Roadeo</h3>
              <p>Price: ₹30,000</p>
              <p>Model: 2023</p>
            </div>
          </div>
          <div className='vehicle-card'>
            <img src="https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productpage/cardandcartImages/Emx%2Bplus.jpg" alt="Cycle 6" />
            <div className='vehicle-info'>
              <h3>Firefox</h3>
              <p>Price: ₹35,000</p>
              <p>Model: 2022</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
