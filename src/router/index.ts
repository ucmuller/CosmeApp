import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AllProductList from '../views/AllProductList.vue'
// import Biz from '../views/Biz.vue'
import BrandList from '../views/BrandList.vue'
import BrandProduct from '../views/BrandProduct.vue'
import Category from '../views/Category.vue'
import ChannelList from '../views/ChannelList.vue'
import CosmePouch from '../views/CosmePouch.vue'
import FeatureProduct from '../views/FeatureProduct.vue'
import IndividualProductVideo from '../views/IndividualProductVideo.vue'
import PersonalColorAnalysis from '../views/PersonalColorAnalysis.vue'
import PersonalColorAnalysisQuestion from '../views/PersonalColorAnalysisQuestion.vue'
import PersonalColorResultAutumn from '../views/PersonalColorResultAutumn.vue'
import PersonalColorResultSpring from '../views/PersonalColorResultSpring.vue'
import PersonalColorResultSummer from '../views/PersonalColorResultSummer.vue'
import PersonalColorResultWinter from '../views/PersonalColorResultWinter.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import Product from '../views/Product.vue'
import ProductList from '../views/ProductList.vue'
import RankingList from '../views/RankingList.vue'
import Search from '../views/Search.vue'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'
import Sitepolicy from '../views/Sitepolicy.vue'
import SortedChannelList from '../views/SortedChannelList.vue'
import SortedProductList from '../views/SortedProductList.vue'
import SortedVideoList from '../views/SortedVideoList.vue'
import Swatch from '../views/Swatch.vue'
import TermsOfService from '../views/TermsOfService.vue'
import Top from '../views/Top.vue'
import UsersProduct from '../views/UsersProduct.vue'
import VideoList from '../views/VideoList.vue'
import VideoProduct from '../views/VideoProduct.vue'
import YoutubersProduct from '../views/YoutubersProduct.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Top',
    component: Top
  },
  {
    path: '/top',
    name: 'Top',
    component: Top
  },
  // {
  //   path: '/biz',
  //   name: 'Biz',
  //   component: Biz
  // },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product,
    props: (route) => ({id: Number(route.params.id)})
  },
  {
    path: "/_product/:id",
    redirect: "/product/:id"
  },
  {
    path: '/productlist/:id',
    name: 'ProductList',
    component: ProductList,
    props: (route) => ({id: Number(route.params.id)})
  },
  {
    path: '/allproductlist/',
    name: 'AllProductList',
    component: AllProductList
  },
  {
    path: '/sortedproductlist/:id',
    name: 'SortedProductList',
    component: SortedProductList,
    props: (route) => ({id: route.params.id})
  },
  {
    path: '/sortedvideolist/:id',
    name: 'SortedVideoList',
    component: SortedVideoList,
    props: (route) => ({id: route.params.id})
  },
  {
    path: '/featureproduct/:id',
    name: 'FeatureProduct',
    component: FeatureProduct,
    props: (route) => ({id: route.params.id})
  },
  {
    path: '/youtubersproduct/:id',
    name: 'YoutubersProduct',
    component: YoutubersProduct,
    props: (route) => ({id: Number(route.params.id)})
  },
  {
    path: "/_youtubersproduct/:id",
    redirect: "/youtubersproduct/:id"
  },
  {
    path: '/swatch/:id',
    name: 'Swatch',
    component: Swatch,
    props: (route) => ({id: Number(route.params.id)})
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/channellist',
    name: 'ChannelList',
    component: ChannelList
  },
  {
    path: '/brandlist',
    name: 'BrandList',
    component: BrandList
  },
  {
    path: '/brandproduct/:id',
    name: 'BrandProduct',
    component: BrandProduct,
    props: (route) => ({id: route.params.id})
  },
  {
    path: '/rankinglist',
    name: 'RankingList',
    component: RankingList
  },
  {
    path: '/videolist',
    name: 'VideoList',
    component: VideoList
  },
  {
    path: '/videoproduct/:id',
    name: 'VideoProduct',
    component: VideoProduct,
    props: (route) => ({id: Number(route.params.id)})
  },
  {
    path: '/individualproductvideo/:id',
    name: 'IndividualProductVideo',
    component: IndividualProductVideo,
    props: (route) => ({id: Number(route.params.id)})
  },
  {
    path: "/_individualproductvideo/:id",
    redirect: "/individualproductvideo/:id"
  },
  {
    path: "/_videoproduct/:id",
    redirect: "/videoproduct/:id"
  },
  {
    path: "/_personalcoloranalysis",
    redirect: "personalcoloranalysis"
  },
  {
    path: '/usersproduct',
    name: 'UsersProduct',
    component: UsersProduct
  },
  {
    path: '/personalcoloranalysis',
    name: 'PersonalColorAnalysis',
    component: PersonalColorAnalysis
  },
  {
    path: '/personalcoloranalysisquestion',
    name: 'PersonalColorAnalysisQuestion',
    component: PersonalColorAnalysisQuestion
  },
  {
    path: '/personalcolorresultspring',
    name: 'PersonalColorResultSpring',
    component: PersonalColorResultSpring,
    props: true
  },
  {
    path: '/personalcolorresultsummer',
    name: 'PersonalColorResultSummer',
    component: PersonalColorResultSummer,
    props: true
  },
  {
    path: '/personalcolorresultautumn',
    name: 'PersonalColorResultAutumn',
    component: PersonalColorResultAutumn,
    props: true
  },
  {
    path: '/personalcolorresultwinter',
    name: 'PersonalColorResultWinter',
    component: PersonalColorResultWinter,
    props: true
  },
  {
    path: '/termsofservice',
    name: 'TermsOfService',
    component: TermsOfService
  },
  {
    path: '/privacypolicy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '/sitepolicy',
    name: 'Sitepolicy',
    component: Sitepolicy
  },
  {
    path: '/cosmepouch/:id',
    name: 'CosmePouch',
    component: CosmePouch,
    props: (route) => ({id: Number(route.params.id)})
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/sortedchannellist',
    name: 'SortedChannelList',
    component: SortedChannelList,
    props: (route) => ({id: route.params.id})
  },
  {
    path: '/signup/:id',
    name: 'Signup',
    component: Signup,
    props: (route) => ({id: Number(route.params.id)})
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
