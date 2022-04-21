import Vue from 'vue'
import Vuex, { Commit, StoreOptions } from 'vuex'
import { RootState } from '@/store/types'
import { User } from '@firebase/auth-types'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    loggedIn: false,
    showHeader: true,
    products: [{
      categoryId: 0,
      categoryName: '',
      id: 0,
      imageUrl: '',
      manufacture: '',
      name: '',
      price: '',
      times: 0,
      volume: ''
    }]
  },
  getters: {
    loggedIn (state: RootState): boolean {
      return state.loggedIn
    },
    showHeader (state: RootState): boolean {
      return state.showHeader
    },
    products: (state: RootState): [{
      categoryId: number;
      categoryName: string;
      id: number;
      imageUrl: string;
      manufacture: string;
      name: string;
      price: any;
      times: number;
      volume: string;
    }] => {
      return state.products
    }
  },
  mutations: {
    updateLogInState (state: RootState, loggedIn: boolean): void {
      state.loggedIn = loggedIn
    },
    updateShowHeaderState (state: RootState, showHeader: boolean): void {
      state.showHeader = showHeader
    },
    updateProducts (state: RootState, products: [{
      categoryId: number;
      categoryName: string;
      id: number;
      imageUrl: string;
      manufacture: string;
      name: string;
      price: any;
      times: number;
      volume: string;
    }]): void {
      state.products = products
    }
  },
  actions: {
    updateLogInState ({ commit }: { commit: Commit }, user: User): void {
      commit('updateLogInState', user !== null)
    },
    updateShowHeaderState ({ commit }: { commit: Commit}, showHeader: boolean): void {
      commit('updateShowHeaderState', showHeader)
    },
    updateProductsState ({ commit }: {commit: Commit}, products: [{
      categoryId: number;
      categoryName: string;
      id: number;
      imageUrl: string;
      manufacture: string;
      name: string;
      price: any;
      times: number;
      volume: string;
    }]
    ): void {
      commit('updateProducts', products)
    }
  }
}

export default new Vuex.Store<RootState>(store)