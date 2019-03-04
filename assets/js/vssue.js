  new Vue({
    el: '#vssue',
    render: h => h('Vssue', {
      props: {
        // 在这里设置当前页面对应的 Issue 标题
        title: 'Vssue Dev',
        // 在这里设置你使用的平台的 OAuth App 配置
        options: {
          owner: 'calcyu',
          repo: 'temp',
          clientId: '92562dc4e8e1afdc8a19',
          clientSecret: 'ad9586cb956a0bac93e167fc004faf90fa26dd86',
        },
      }
    })
  })