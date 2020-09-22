export default {
  userName: state => state.user.userInfo.name,
  chartLabelColor: state => state.theme.theme === 'theme-dark' ? '#ffffffb3' : '#4C4C4C',
  chartLineColor: state => state.theme.theme === 'theme-dark' ? '#2A4493' : '#D2D2D2',
}
