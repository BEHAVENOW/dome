// pages/drop/drop.js
Page({
  data: {
		tabType: 'tab1',
		key: 'tab1',
		conditionList: [{
				title: '选项1',
				id: '1',
				select: true
			},
			{
				title: '选项2',
				id: '2',
				select: false
			},
			{
				title: '选项3',
				id: '3',
				select: false
			},
			{
				title: '选项4',
				id: '4',
				select: false
			},
			{
				title: '选项5',
				id: '5',
				select: false
			}
		],
		choosedCondition: {
			title: '选项1',
			id: '1'
		},
		conditionVisible: false,


	
	},

	showCondition() {
		this.setData({
			conditionVisible: !this.data.conditionVisible
		})
	},
	// 改变查询项
	onChnageCondition(e) {
		const list = this.data.conditionList
		list.forEach(item => {
			if (item.id === e.currentTarget.dataset.id) {
				item.select = true
				this.setData({
					'choosedCondition.title': item.title,
					'choosedCondition.id': item.id
				})
			} else {
				item.select = false
			}
		})
		this.setData({
			conditionList: list
		})
	},

})