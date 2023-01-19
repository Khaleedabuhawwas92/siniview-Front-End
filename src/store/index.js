export const state = () => {
  users: [];
  hloo: "ssdsdsd";
  toggleOne1: 1;
  menuList: [];
  printersList: [];
};

export const getters = {
  getMenuList: (state) => {
    return state.menuList;
  },
  getPrinterList: (state) => {
    return state.printersList;
  },

  isAuthenticated(state) {
    return state.auth.loggedIn;
  },

  loggedInUser(state) {
    return state.auth.user;
  },
  toggleOne(state) {
    return state.toggleOne;
  },
};
export const actions = {
  async fetchMenu({ commit }) {
    const response = await this.$axios.get("http://localhost:8000/api/items");
    commit("SET_MENU", response.data);
  },
  async fetchPrinters({ commit }) {
    const response = await window.versions.getPrinters();
    commit("SET_MENU_PRINTERS", response);
  },
  async getUsers() {
    const users = await this.$axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    commit("addUsers", users);
    return users;
  },
  async getToggle(state) {
    const res = { data: 10 };
    state.toggleOne1 = res.data;
    return res.data;
  },
};
export const mutations = {
  addUsers(state, users) {
    state.users.push({ ...users });
  },
  // addToggleOne(state, toggle_one) {
  //   state.toggle_one.push = { ...toggle_one };
  // },
  SET_MENU(state, menu) {
    state.menuList = menu;
  },
  SET_MENU_PRINTERS(state, menuPrinters) {
    state.printersList = menuPrinters;
  },
  SET_toggle(state) {
    state.toggleOne1++;
  },
};
