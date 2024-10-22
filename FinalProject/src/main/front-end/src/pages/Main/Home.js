import { useNavigate } from 'react-router-dom';
import './Home.css'
const Home = ()=>{
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/kioskMenu');
  };
    return(
      // <div className='container-md body-center'>
      //   <div className="main-background">
      //     <img src="images/kioskMain/KioskMain.webp" alt='메인화면' className="main-background-img"></img>
      //   </div>
      //   <div className="select-place ">
      //     <button type='button' className='take-out-btn' onClick={handleClick}>포장하기</button>
      //     <button type='button' className='take-out-btn' onClick={handleClick}>먹고가기</button>
      //   </div>
      // </div>

      <div className='container-md body-center'>
          <div className='main-logo-container'>
            <div className='main-logo'>
              <img src='images/kioskMain/logo-black.png' alt='메인 로고' className='main-logo-img'></img>
            </div>
          </div>

             <div className="select-place ">
           <button type='button' className='take-out-btn' onClick={handleClick}>포장하기</button>
          <button type='button' className='here-btn' onClick={handleClick}>먹고가기</button>
         </div>


      </div>

    );
}
export default Home;