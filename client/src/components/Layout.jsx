import { Switch, Route } from "react-router-dom";

import ProfileSection from "./ProfileSection";
import NewsSection from "./NewsSection";
import PostSection from "./PostSection";
import Dashboard from "./Dashboard";
import UserProfile from "./UserProfile";
import PostLists from "./PostLists";
import Settings from "./Settings";

function Layout({logOutUser}) {
  return (
    <Switch>
      <Route path="/dashboard/profile/myposts" component={PostLists} />
      <Route path="/dashboard/profile/likedposts" component={PostLists} />
      <Route path="/dashboard/profile/:id" component={UserProfile} />
      <Route path="/dashboard/profile" component={ProfileSection} />
      <Route path="/dashboard/news" component={NewsSection} />
      <Route path="/dashboard/posts" component={PostSection} />
      <Route path="/dashboard/settings" component={Settings} />
      <Route path="/dashboard">
        <Dashboard logOutUser={logOutUser} />
      </Route>
    </Switch>
  );
}

export default Layout;