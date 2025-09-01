Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    bookName: {
      type: String,
      default: ''
    },
    bookDescription: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
})