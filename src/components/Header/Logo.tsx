import logo from '../../assets/logo.png';

const Logo: React.FC = () => (
  <div className="navbar-item pr-3">
    <img
      src={logo}
      alt="環境部 Logo"
      style={{ height: 50 }}
    />
  </div>
);

export default Logo;
