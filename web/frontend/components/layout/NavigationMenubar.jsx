import { Link, useLocation } from "react-router-dom";
import { Tabs } from "../../pages";
import { Icon } from "@shopify/polaris";
import SubMenuList from "./SubMenuList";
import { useMemo, useState } from "react";
import { DropdownMinor } from "@shopify/polaris-icons";
import styles from "./NavigationMenubar.module.css";
import { useSelector } from "react-redux";

function NavigationMenubar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const closeDropdown = () => {
    isOpenMenu && setIsOpenMenu(false);
  };
  const location = useLocation();
  const hasEditApi = location.pathname.includes("/edit-api");
  const user = useSelector((state) => state.user.userData?.user);

  const tabsData = useMemo(()=> {
    const data = Tabs.filter(tab =>{
      if(!tab?.viewAccess)
        return tab
      else if(tab?.viewAccess?.includes(user?.subscriptionName))
        return tab
      else
      return null
    })
    return data
  },[user])

  return (
    <nav className={styles.ipsTabNav}>
      <div className={styles.ipsTabContentNav}>
        <ul className={styles.ipsTabNavigation}>
          {tabsData?.map(({ id, icon, content, path, children }) => (
            <li
              key={id}
              className={`${styles.ipsTabMenuItems} ${children && isOpenMenu && styles.ipsTabActive
                }`}
              onClick={closeDropdown}
            >
              <Link
                to={path}
                className={`${styles.ipsTabMenuLink} ${location?.pathname?.includes(path)
                  ? styles.ipsTabActive
                  : (path === "/api-settings" &&
                    location.pathname === "/add-api") ||
                    (path === "/api-settings" && hasEditApi)
                    ? styles.ipsTabActive
                    : ""
                  }`}
                onClick={() => {
                  children && setIsOpenMenu((prev) => !prev);
                }}
              >
                <Icon
                  source={icon}
                  className={`${styles.navIcons} ${location.pathname?.includes(path) ? styles.ipsTabActive : ""
                    }`}
                />
                <span className={styles.ipsTabNavTitle}>{content}</span>
              </Link>
              {children && (
                <>
                  <SubMenuList
                    submenus={children}
                    isOpenMenu={isOpenMenu}
                    setIsOpenMenu={setIsOpenMenu}
                  />
                  <div
                    style={{ margin: "auto" }}
                    onClick={() => {
                      children && setIsOpenMenu((prev) => !prev);
                    }}
                  >
                    <Icon source={DropdownMinor} color="base" />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
export default NavigationMenubar;
