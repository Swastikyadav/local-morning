import { HomeOutlined, RadiusUprightOutlined, UserOutlined, MessageOutlined } from "@ant-design/icons";

import "../style/mobileNav.css";

function MobileNavigation() {
  return (
    <nav className="mobile-navigation">
      <div className="nav-links-container">
        <HomeOutlined />
        <RadiusUprightOutlined />
        <UserOutlined />
        <MessageOutlined />
      </div>
    </nav>
  );
}

export default MobileNavigation;