import React from "react";
import styles from "./HeaderTitle.module.scss";
import { ReactComponent as Icon } from "../../assets/images/down-arrow.svg";

const HeaderTitle = () => {
    return (
        <section className={styles.wrapper}>
            <p className={styles.description}>Hello! Welcome to</p>
            <h1 className={styles.title}>
                Node.js <span className={styles.titleSpan}>blog</span>
            </h1>
            <p className={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                id porta libero. Duis blandit mi augue, gravida volutpat tellus
                pharetra non. Nulla varius nunc elit, ut blandit lorem facilisis
                nec. Nulla facilisis sem nulla, ac ornare sem blandit sit amet.
                Duis lacus lacus, scelerisque eu tincidunt ut, aliquam sit amet.
            </p>
            <div className={styles.arrow}>
                <Icon />
            </div>
        </section>
    );
};

export default HeaderTitle;
