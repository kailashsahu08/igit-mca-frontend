"use client";
import React, { useRef } from "react";
import styles from "./navbar.module.css";
import "./navbar.css";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NavLinkItems from "./NavLinkItems";
import ActiveUserAndLoginStatusContext from "@/context/activeUserAndLoginStatus/activeUserAndLoginStatusContext";
import { useContext } from "react";
import { useEffect } from "react";
import UserAvatar from "./UserAvatar";
import VerificationStatus from "./VerificationStatus";
import UserName from "./UserName";
import { useRouter } from "next/navigation";
import UserProfileSkeleton from "./UserProfileSkeleton";




const NavBar = () => {
  const router = useRouter();
  // ----- Context -----
  const { activeUser, loginStatus, fetchActiveUser } = useContext(
    ActiveUserAndLoginStatusContext
  );

  const responsive_Nav_ref = useRef();
  const { name } = activeUser != null && activeUser.userDetails;
  const { status } = activeUser != null && activeUser;
  const { url } = activeUser != null && activeUser.profilePic;

  useEffect(() => {
    fetchActiveUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleNavBar = () => {
    responsive_Nav_ref.current.classList.toggle("active_nav");
  };

  const redirectProfilePage = () => {
    toggleNavBar();
  };
  const disableLink = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <nav className={`${styles.navbar} "navbar" `}>
        <div className={styles.navbar_container}>
          {/* Logo */}
          <h1 className={`${styles.logo}`}>
            <Link shallow={true} href="/" className={`${styles.link_text}`}>
              IGIT-MCA
            </Link>
          </h1>

          {/* Nav Menus */}
          <ul className={`${styles.nav_item}`}>
            <li>
              <Link shallow={true} href={"/"}>Home</Link>
            </li>
            <li>
              <Link shallow={true} href="/batch">Batch</Link>
            </li>
            <li>
              <Link shallow={true} href="/notes">Notes</Link>
            </li>
            <li>
              <Link shallow={true} href="/galleries">Galleries</Link>
            </li>
            <li>
              <Link
                shallow={true}
                className="disabled_link_text"
                onClick={disableLink}
                href="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                shallow={true}
                className="disabled_link_text"
                onClick={disableLink}
                href="/contacts"
              >
                Contacts
              </Link>
            </li>
          </ul>

          {/* Login & registration Details starts*/}
          <div className={styles.login_credentials}>
            {/* show based on log in status*/}
            {loginStatus === null ? (
              <UserProfileSkeleton />
            ) : loginStatus ? (
              <Link href={"/profile"} >
                <div
                  onClick={redirectProfilePage}
                  className={styles.avatar_name_for_desktop}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      marginRight: "0.5rem",
                    }}
                  >
                    <UserName name={name} />
                    <VerificationStatus status={status} />
                  </div>
                  <UserAvatar userName={name} profileUrl={url} />
                </div>
              </Link>
            ) : (
              <div>
                <Link shallow={true} className={styles.login_link} href="/login">
                  Login
                </Link>
                <Link shallow={true} className={styles.registration_link} href="/registration">
                  Registration
                </Link>
              </div>
            )}


          </div>
          {/* Login & registartion Details ends */}

          {/* hamburger */}
          <span className={styles.hamburger_menu}>
            <MenuIcon onClick={toggleNavBar} />
          </span>

          {/* Responsive nav links*/}
          <div ref={responsive_Nav_ref} className={`${styles.responsive_nav}`}>
            <CloseIcon
              onClick={toggleNavBar}
              className={styles.cross_hamburger_menu}
            />
            {/* when a link is clicked then closes responsive navbar */}
            {loginStatus === null ? (
              <UserProfileSkeleton mobileMode={true} />
            ) : loginStatus ? (
              <Link href="/profile" >
                <div
                  onClick={redirectProfilePage}
                  className={styles.avatar_name_for_responsive_nav}
                >
                  <UserAvatar name={name} profileUrl={url} />
                  <div>
                    <UserName name={name} />
                    <VerificationStatus status={status} />
                  </div>
                </div>
              </Link>
            ) : (
              <div>
                <Link
                  shallow={true}
                  className={styles.login_link}
                  onClick={toggleNavBar}
                  href="/login"
                >
                  Login
                </Link>
                <Link
                  shallow={true}
                  className={styles.registration_link}
                  onClick={toggleNavBar}
                  href="/registration"
                >
                  Registration
                </Link>
              </div>
            )}

            <NavLinkItems toggleNav={toggleNavBar} />
            {/* show based on log in status*/}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
