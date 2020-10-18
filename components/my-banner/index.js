import {User} from "../../models/user";
import {promisic} from "../../utils/util";

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		couponCount: Number
	},
	
	/**
	 * 组件的初始数据
	 */
	data: {
		showLoginBtn: false,
	},
	
	lifetimes: {
		async attached() {
			if (!await this.hasAuthUserInfo()) {
				this.setData({
					showLoginBtn: true
				})
			}
		}
	},
	
	/**
	 * 组件的方法列表
	 */
	methods: {
		async onAuthUserInfo(event) {
			console.log(event.detail)
			if (event.detail.userInfo) {
				const success = await User.updateUserInfo(event.detail.userInfo)
				this.setData({
					showLoginBtn:false
				})
			}
		},
		
		async hasAuthUserInfo() {
			const setting = await promisic(wx.getSetting)();
			const userInfo = setting.authSetting['scope.userInfo']
			return !!userInfo;
		},
		
		onGotoMyCoupon(event) {
			wx.navigateTo({
				url:`/pages/coupon/coupon`
			})
		},
		
		aboutUs(event) {
			wx.navigateTo({
				url:`/pages/about/about`
			})
		}
	}
})
