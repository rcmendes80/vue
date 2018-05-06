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
  addTodo(todo) {
    if (this.debug) console.log("adding todo: ", todo);
    this.state.data = [todo, ...this.state.data];
    console.log("new todo list:", this.state.data)
  }, 
  getTodoList() {
    if (this.debug) console.log("Retrieving Todo list:"), this.state.data;
      return this.state.data;
  }
};

export default store;
