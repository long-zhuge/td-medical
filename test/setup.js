import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// 自定义一个node环境的媒体查询对象
window.matchMedia = window.matchMedia || function() {
  return {
    matches : false,
    addListener : function() {},
    removeListener: function() {},
  };
};

Enzyme.configure({
  adapter: new Adapter(),
});

export default Enzyme;
