import { useRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

NavLink.defaultProps = {
  exact: false,
};

function NavLink({ href, exact, children, styles, ...props }) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += ` ${styles.active}`;
  }

  return (
    <li className={`${styles.app_nav_item} ${props.className}`}>
      <div className="container">
        <Link href={href}>
          <a {...props}>{children}</a>
        </Link>
      </div>
    </li>
  );
}
export default NavLink;
