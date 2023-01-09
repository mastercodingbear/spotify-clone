import React, { useEffect } from "react";
import Head from "next/head";
import styles from "./.module.sass";
import { getGenres } from "../../redux/actions";
import { connect } from "react-redux";
import CategoryComponent from "../../components/CategoryComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { container } from "../../components/AppMain/.module.sass";

import "swiper/css";
import "swiper/css/navigation";

const mapStateToProps = (state) => state;
const mapDispatchToProps = { getGenres };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function SearchPage({ token, countryCode, getGenres, allCategories }) {
  useEffect(() => {
    if (!allCategories.length) getGenres(token, countryCode, 40);
  }, []);

  return (
    <>
      <Head>
        <title>Spotify App | Search</title>
      </Head>
      <div className="main_search_page_content_container pt-5 my-5">
        <div className={container}>
          <section className="top_categories_container mt-3">
            <div className="row g-0">
              <h4 className={styles._row_title}>your top categories</h4>
              <div
                className={`${styles.navigation_btns_container} d-none d-md-block nav_btns`}
              >
                <div
                  className={`${styles.swiper_button_prev} swiper-button-prev`}
                >
                  <BsChevronLeft />
                </div>
                <div
                  className={`${styles.swiper_button_next} swiper-button-next`}
                >
                  <BsChevronRight />
                </div>
              </div>
              <>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  breakpoints={{
                    575: {
                      spaceBetween: 24,
                      slidesPerView: 2,
                    },
                    991: {
                      spaceBetween: 24,
                      slidesPerView: 2.5,
                    },
                    1399: {
                      spaceBetween: 24,
                      slidesPerView: 3,
                    },
                  }}
                  modules={[Navigation]}
                  navigation={{
                    nextEl: `.nav_btns .swiper-button-next`,
                    prevEl: `.nav_btns .swiper-button-prev`,
                  }}
                >
                  {!allCategories.length
                    ? [...Array(5)].map((el, i) => {
                        return (
                          <SwiperSlide key={i}>
                            <CategoryComponent size="lg" />
                          </SwiperSlide>
                        );
                      })
                    : allCategories?.slice(0, 5).map((el, i) => (
                        <SwiperSlide key={i}>
                          <CategoryComponent size="lg" category={el} />
                        </SwiperSlide>
                      ))}
                </Swiper>
              </>
            </div>
          </section>
          <section className="all_categories_container">
            <div className="row mt-3">
              <h4 className={styles._row_title}>browse all</h4>
              {allCategories.length
                ? allCategories.slice(6).map((el, i) => {
                    return (
                      <CategoryComponent key={i} size="sm" category={el} />
                    );
                  })
                : [...Array(20)].map((el, i) => {
                    return <CategoryComponent size="sm" key={i} />;
                  })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
});
