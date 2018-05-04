var store = {
  debug: true,
  state: {
    data: []
  },
  setData(data) {
      console.log(data);
      this.state.data = data;
  },
  setCompletedStatus(index, isChecked) {
    if (this.debug) console.log("setting Todo[", index, "] completed status to: ", isChecked);
    this.state.data[index].completed = isChecked;
  },
  addTodoAction(todo) {
    if (this.debug) console.log("clearMessageAction triggered");
    this.state.message = "";
  }, 
  getTodoList() {
    if (this.debug) console.log("Retrieving Todo list:"), this.state.data;
      return this.state.data;
  }
};

export default store;
