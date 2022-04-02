/* 单元测试 */
import { mount, createLocalVue } from '@vue/test-utils';
import SearchList from '@/views/searchList';
import ElementUI from 'element-ui';
import Moment from 'moment';

const localVue = createLocalVue(); // 创建临时Vue实例，挂载组件中使用的插件
localVue.use(ElementUI);

// 定义全局时间戳过滤器
localVue.filter('formatDate', function (value) {
  return Moment(value).format('YYYY-MM-DD HH:mm');
});

describe('search by blocklet hash', () => {
  // 测试实例
  const wrapper = mount(SearchList, {
    localVue,
    stubs: ['slot'],
  });
  // 测试searchList组件是否挂载
  it('searchList挂载', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  // 测试搜索框的输入
  it('搜索框输入', () => {
    wrapper.setData({ blockHash: 'all' });
    expect(wrapper.vm.blockHash).toBe('all');
  });
});
