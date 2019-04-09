import Vue from 'vue'
import Home from '@/views/Home'

describe('Home.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Home)
    }).$mount()

    expect(vm.$el.querySelector('.home')).to.contain('Welcome to your new project!')
  })
})
