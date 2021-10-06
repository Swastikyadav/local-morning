import { NavLink } from "react-router-dom";
import { HomeOutlined, RadiusUprightOutlined, UserOutlined, MessageOutlined } from "@ant-design/icons";

import "../style/mobileNav.css";

function MobileNavigation() {
  return (
    <nav className="mobile-navigation">
      <div className="nav-links-container">
        <NavLink to="/dashboard/posts" activeClassName="active"><HomeOutlined /></NavLink>
        <NavLink to="/dashboard/news" activeClassName="active"><RadiusUprightOutlined /></NavLink>
        <NavLink to="/dashboard/profile" activeClassName="active"><UserOutlined /></NavLink>
        <MessageOutlined />
      </div>
    </nav>
  );
}

export default MobileNavigation;