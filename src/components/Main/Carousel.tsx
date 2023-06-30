import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import firstcarousel from "../../util/img/firstcarousel.png";
import secondcarousel from "../../util/img/secondcarousel.png";

const StyledSlider = styled(Slider)`
  height: 320px;
  margin-bottom: 70px;
`;

const FirstSlide = styled.div`
  background-color: #ffdab9;
  height: 300px;
`;

const ContentArea = styled.div`
  display: flex;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  height: 100%;
  @media screen and (max-width: 525px) {
    height: 230px;
  }

  > .promotionTitle {
    flex: 5;
    > .mobileTitle {
      display:none;
    }

    @media screen and (max-width: 1024px) {

      > .mobileTitle {
        flex: 5;
        display:inherit;
        margin-left:10px;
        font-weight: 800;
        font-size: 25px;
        text-align:center;
      }
    }
    @media screen and (max-width: 600px) {
      >.mobileTitle {
        flex:5;
        font-size: 15px;
        margin-top:50px;
        margin-left:20px;

      }
    }
    > .subTitle {
      display: flex;
      align-items: center;
      font-size: 25px;
      font-weight: 700;
      padding-left: 200px;
      
      @media screen and (max-width: 1024px) {
      display:none;
    }
      > .musicIcon {
        margin-left: 5px;
      }
    }
  }

  > .promotionImg {
    flex: 5;

    > img {
      margin-left: 50px;
      height: 300px;
      object-fit: contain;
      // 모바일에서 배너 이미지
      @media screen and (max-width: 600px) {
        margin-top: 50px;
        width: 250px;
      }
    }
  }
`;

const SecondSlide = styled.div`
  background-color: #faeac7;
  height: 300px;
`;

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div>
      <StyledSlider {...settings}>
        <FirstSlide>
          <ContentArea>
            <div className='promotionTitle'>
              <div className='subTitle'>다시 보고 싶은 YouTube 영상을</div>
              <div className='subTitle'>YouToo에서 공유해 보세요</div>
              <div className='mobileTitle'>
                <div>유튜브 영상 공유 플랫폼</div>
                <div>YouToo</div>
              </div>

            </div>
            <div className='promotionImg'>
              <img src={firstcarousel} alt='listen music' />
            </div>
          </ContentArea>
        </FirstSlide>
        <SecondSlide>
          <ContentArea>
            <div className='promotionTitle'>
              <div className='subTitle'>함께 보고 싶은 YouTube 영상을</div>
              <div className='subTitle'>YouToo에서 공유해 보세요</div>
              <div className='mobileTitle'>
                <div>너도 한번 봐봐 ~!</div>
                <div>YouToo</div>
              </div>
            </div>
            <div className='promotionImg'>
              <img src={secondcarousel} alt='love music' />
            </div>
          </ContentArea>
        </SecondSlide>
      </StyledSlider>
    </div>

  );
}

export default Carousel;
