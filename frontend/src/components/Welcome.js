import logo from "../images/logo1.png";
import hairService from "../images/hair.jpg";
import nailService from "../images/nails.jpg";
import "../scss/style.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import image from "../images/img.png";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import React, { useRef, useState } from "react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import makeupService from "../images/makeup.jpg";

function Welcome() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="welcome--container">
        <header className="header">
          <div className="logo">GLAMOUR EASE.</div>
          <ul className="nav--list">
            <li>
              <a href="#about">About us</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>

            <li>
              <a href="#">Partners</a>
            </li>
            <li>
              <a href="#">Contacts</a>
            </li>
          </ul>
        </header>
        <section className="section--container">
          <div className="section--container--bg"></div>
          <div className="content">
            <h1 className="content--promotion">
              Promote | Find your beauty services by GlamourEase now.
            </h1>
            <p style={{ color: "gray", fontSize: "15px" }}>
              We find the perfect services tailored to your preferences and we
              empower independent beauty service providers to thrive and expand
              their businesses
            </p>
            <button onClick={() => navigate("/login")}> Get Started</button>
          </div>
          <div className="img">
            <img src={image} />
          </div>
        </section>
      </div>
      <section className="about" id="about">
        <div className="about--content">
          <div>
            <p className="discover">Discover</p>
            <h1>
              Transform your look with our beauty independent services
              businesses owner
            </h1>
            <p>
              At Beauty Services, we offer a wide range of treatments and
              services designed to enhance your natural beauty. Wheter you're
              looking for a relaxing massage, a rejuvenating facial, or a
              stunning makeover, our independent business beauty services are
              ready to help you look and feel at your best.
            </p>
            <div className="btns">
              <button>Learn More</button>{" "}
              <button>
                Sign Up <BsChevronRight style={{ fontWeight: "bold" }} />
              </button>
            </div>
          </div>
        </div>
        <div className="about--img">
          <div className="img"></div>
        </div>
      </section>
      <section className="services" id="services">
        <h1>Discover our Beauty services</h1>

        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            {" "}
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={nailService}
                title="nail services"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ color: "orange", fontFamily: "semi-bold" }}
                >
                  Nails Services
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={hairService}
                title="hair services"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ color: "orange", fontFamily: "semi-bold" }}
                >
                  Hair Services
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={makeupService}
                title="make up services"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ color: "orange", fontFamily: "semi-bold" }}
                >
                  Makeup Services
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={nailService}
                title="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ color: "orange", fontFamily: "semi-bold" }}
                >
                  Nails Services
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={nailService}
                title="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ color: "orange", fontFamily: "semi-bold" }}
                >
                  Nails Services
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={makeupService}
                title="make up services"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ color: "orange", fontFamily: "semi-bold" }}
                >
                  Makeup Services
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        </Swiper>
      </section>
      <section style={{ height: "100vh", marginTop: "200px" }}>
        <h1>Contacts</h1>
      </section>
    </div>
  );
}

export default Welcome;
