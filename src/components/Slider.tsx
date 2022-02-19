import { ReactNode } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

interface Props {
  children?: ReactNode;
  delay?: number;
}

const CustomSlider = ({ children, delay }: Props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 4000,
    delay: delay || 0,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 875,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  return <StyledSlider {...settings}>{children}</StyledSlider>;
};

export default CustomSlider;

const StyledSlider = styled(Slider)`
  ul.slick-dots {
    bottom: -20px;
    text-align: right;

    @media (max-width: 550px) {
      text-align: center;
    }

    li {
      button:before {
        font-size: 15px;
        color: var(--clr-primary);

        @media (max-width: 550px) {
          font-size: 10px;
        }
      }

      &.slick-active {
        button:before {
          color: var(--clr-primary);
        }
      }
    }
  }

  ul.slick-dots li button:hover:before {
    opacity: 0.4;
  }

  ul.slick-dots li button:focus:before {
    opacity: 1;
  }
`;
