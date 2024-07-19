
import Cookies from "universal-cookie";

const O_Cookie = new Cookies();

const CookieService = {
  get: function(name) {
    return O_Cookie.get(name);
  },
  set: function(name, value, options) {
    O_Cookie.set(name, value, options);
  },
  remove: function(name) {
    O_Cookie.remove(name);
  }
};

export default CookieService;
