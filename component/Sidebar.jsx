import React from "react";
import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faDatabase,
  faRegistered,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [active, setactive] = useState(false);

  return (
    <div className={styles.sidebar}>
      <Link href={"/"}>
        <div className={styles.outercontainer}>
          <div className={styles.smallcontainer}>
            <FontAwesomeIcon icon={faDashboard} />
          </div>
          <p>Dashboard</p>
        </div>
      </Link>

      <Link href={"/items"}>
        <div className={styles.outercontainer}>
          <div className={styles.smallcontainer}>
            <FontAwesomeIcon icon={faDatabase} />
          </div>
          <p>Items</p>
        </div>
      </Link>

      <Link href={"/waybills"}>
        <div className={styles.outercontainer}>
          <div className={styles.smallcontainer}>
            <FontAwesomeIcon icon={faFileInvoice} />
          </div>
          <p>Waybills</p>
        </div>
      </Link>

      <Link href={"/register"}>
        <div className={styles.outercontainer}>
          <div className={styles.smallcontainer}>
            <FontAwesomeIcon icon={faRegistered} />
          </div>
          <p>Register</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
