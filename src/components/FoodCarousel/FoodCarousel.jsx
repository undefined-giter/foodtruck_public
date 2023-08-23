import s from './style.module.css'
import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom'

export const FoodCarousel = () => {
  const navigate = useNavigate()

  return (
    <Carousel>
      <Carousel.Item interval={1500}>
        <a href="/Menu#burritos">
          <img src="img/melted/burritos.jpg" alt="Burritos" className={s.carouselImg} />
          <Carousel.Caption>
            <h3>Burritos</h3>
            <p>Des burritos généreux et bien équilibrés</p>
          </Carousel.Caption>
        </a>
      </Carousel.Item>
      <Carousel.Item interval={1500} onClick={() => navigate("/Menu")}>
        <a href="/Menu#burritos_chiken">
          <img src="img/melted/burritos_1.jpg" alt="Burritos Intérieur" className={s.carouselImg} />
          <Carousel.Caption>
            <h3>Burritos au Poulet</h3>
            <p>L'intérieur d'un Burritos Poulet</p>
          </Carousel.Caption>
        </a>
      </Carousel.Item>
      <Carousel.Item interval={2500} onClick={() => navigate("/Menu")}>
        <a href="/Menu#wraps">
          <img src="img/melted/wrap.svg" alt="wrap svg" className={s.carouselImg} />
            <Carousel.Caption>
              <h3>Notre Sélection de Wraps</h3>
              <p>Sans doute les meilleurs wraps du Var</p>
            </Carousel.Caption>
          </a>
        </Carousel.Item>
    </Carousel>
  );
}