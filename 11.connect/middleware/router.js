import { parse } from 'url';

module.exports = function route (obj) {
  return function (req, res, next) {
    if (!obj[req.method]) {
      next()
      return;
    }

    const routes = obj[req.method];
    const url = parse(req.url);
    const paths = Object.keys(routes);

    for (let path of paths) {
      const fn = routes[path];
      path = path
               .replace(/\//g, '\\/')
               .replace(/:(\w+)/g, '([^\\/]+)');
      const reg = new RegExp(`^${path}$`);
      let matches = url.pathname.match(reg);
      if (matches) {
        let args = [req, res].concat(matches.slice(1));
        fn.apply(null, args);
        return;
      }
    }
  };
}
