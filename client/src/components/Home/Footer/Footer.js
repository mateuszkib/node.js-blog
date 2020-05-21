import React from "react";
import styles from "./Footer.module.scss";
import logo from "../../../assets/images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faFacebook,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
    faChevronRight,
    faMapMarkerAlt,
    faPhoneAlt,
    faEnvelopeOpenText,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                <div className="row">
                    <div className="col-md">
                        <div className={styles.title}>
                            <img
                                src={logo}
                                width="40"
                                height="40"
                                alt="Blog logo"
                            />
                        </div>
                        <div className="mb-4">
                            <p>
                                Far far away, behind the word mountains, far
                                from the countries Vokalia and Consonantia,
                                there live the blind texts.
                            </p>
                        </div>
                        <div className={styles.icons}>
                            <a href="https://twitter.com">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="https://facebook.com">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a href="https://instagram.com">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className={styles.title}>
                            <h3>Latest News</h3>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className={styles.title}>
                            <h3>Information</h3>
                        </div>
                        <div className={styles.information}>
                            <ul>
                                <li>
                                    <NavLink to="/">
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/about">
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                        About
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/articles">
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                        Articles
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contact">
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                        Contact
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className={styles.title}>
                            <h3>Have a Question?</h3>
                        </div>
                        <div className={styles.question}>
                            <ul>
                                <li>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    <span>
                                        203 Fake St. Mountain View, San
                                        Francisco, California, USA
                                    </span>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faPhoneAlt} />
                                    <span>500 000 000</span>
                                </li>
                                <li>
                                    <FontAwesomeIcon
                                        icon={faEnvelopeOpenText}
                                    />
                                    <span>mateusz.kibilko@gmail.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
