<template>
	<div class="slide">
		<el-menu default-active="$route.name" :router="true" background-color="#2A2D38" text-color="#bfcbd9"
			active-text-color="#049eff" :collapse="isCollapse" >
			<!-- 动态渲染组件 -->
			<div  v-for="(item,index) in routerlist" :key="index">
				<el-menu-item v-if="!item.children" :index="item.path" :to='item.name' >
					<span>{{item.meta.title}}</span>
				</el-menu-item>
				<el-submenu v-if="item.children"  :index="item.path" >
					<template slot="title" >
						<!-- <i class="el-icon-notebook-2"></i> -->
						<span>{{item.meta.title}}</span>
					</template>
					<el-menu-item v-for="(itemlist,index) in item.children" :index="itemlist.path" :to='itemlist.name'>
						{{itemlist.meta.title}}
					</el-menu-item>
				</el-submenu>
			</div>
			
			
			<!-- <el-menu-item index="/home" @click.native="clickMenu({ path: '/home', name: 'home', label: '首页' })">
				<i class="el-icon-s-home"></i>
				<span>首页</span>
			</el-menu-item>

			<el-menu-item index="/patient"
				@click.native="clickMenu({ path: '/patient', name: 'patient', label: '患者' })">
				<i class="el-icon-s-home"></i>
				<span>患者</span>
			</el-menu-item>

			<el-menu-item index="/subscribe"
				@click.native="clickMenu({ path: '/subscribe', name: 'subscribe', label: '预约' })">
				<i class="el-icon-s-home"></i>
				<span>预约</span>
			</el-menu-item>


			<el-menu-item index="/doctorWorkStation"
				@click.native="clickMenu({ path: '/doctorWorkStation', name: 'doctorWorkStation', label: '医生工作站' })">
				<i class="el-icon-suitcase"></i>
				<span>医生工作站</span>
			</el-menu-item>
 -->
			

		</el-menu>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				routerlist:[]
			};
		},
		computed: {
			isCollapse() {
				return this.$store.state.tab.isCollapse;
			},
			...mapState('userInfo',['accessRoutes'])
		},
		mounted() {
			this.routerlist=this.accessRoutes
			console.log(this.routerlist)
		},
		methods: {
			clickMenu(item) {
				this.$router.push({
					name: item.name,
				});
				this.$store.commit('selectMenu', item);
			},
		},
	};
</script>
<style lang="less" scoped>
	.slide {
		height: 100%;
		overflow: hidden;

		.el-menu {
			min-height: 100%;
			// color: #bfcbd9;
			background-color: rgb(42, 45, 56);

			text-align: left;
			border-right: none;
		}
	}
</style>
