import React from "react";
import styles from "./.module.sass";
import NextImage from "../NextImage";
import Link from "next/link";
export default function StyledCategoryComponent({ size, category }) {
  return (
    <div
      className={
        size === "lg"
          ? "w-100"
          : `col-12 col-sm-6 col-md-4 col-xl-3 ${styles.col_xxl_2_5}`
      }
    >
      <Link href={`/search/category/${category?.id}`}>
        <a>
          <div
            style={{ backgroundColor: category?.bgColor }}
            className={`${styles.category_component_styled} ${
              size === "lg" ? styles.size_large : null
            }`}
          >
            {category ? (
              <span className={styles.category_name}>{category.name}</span>
            ) : (
              <span className={styles.category_name_placeholder}></span>
            )}
            <div className={styles.category_cover_img_wrapper}>
              {category ? (
                <NextImage
                  alt={category.id}
                  path={category.cover}
                  width={100}
                  height={100}
                  layout="responsive"
                  loading="eager"
                />
              ) : null}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
