import { Switch, Route } from "react-router-dom";

import ProfileSection from "./ProfileSection";
import NewsSection from "./NewsSection";
import PostSection from "./PostSection";
import Dashboard from "./Dashboard";

function Layout() {
  return (
    <Switch>
      <Route path="/dashboard/profile" component={ProfileSection} />
      <Route path="/dashboard/news" component={NewsSection} />
      <Route path="/dashboard/posts" component={PostSection} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
}

export default Layout;