import { useNavigate } from 'react-router-dom';
import './Home.css'
import useClickSound from '../../hooks/useClickSound';
import useTTS from '../../hooks/useTTS';

const Home = ()=>{
  const ClickSound = useClickSound(); 
  const playTTS = useTTS(); 
  const navigate = useNavigate();


  const handleClick = () => {
    ClickSound();
    playTTS("메뉴를 선택해주세요")
    navigate('/kioskMenu');
  };
    return(
 
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