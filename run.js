/* 
- 總共幾個 tasks
- pending 的 tasks
-  一次送幾個 tasks
- task 要花多久時間
*/
class handleTask {
  constructor(maxCount) {
    this.maxCount = maxCount; // 3
    this.count = 0; // 正在做 pendingTask 第幾個
    this.pendingTask = [];
    this.completed = 0;
  }

  /**
   * @param {promise} tasks
   * @return { null }
   */

  run(tasks) {
    if (this.count < this.maxCount) {
      this.count++;
      tasks().then(() => {
        this.count--;
        this.completed++;
        console.log("pendingTask: ", this.pendingTask.length);
        if (this.pendingTask.length > 0) this.run(this.pendingTask.shift());
        console.log("completed: ", this.completed);
      });
    } else {
      this.pendingTask.push(tasks);
    }
  }
}

function task() {
  return new Promise((resolve, reject) => {
    // console.log('running')
    setTimeout(resolve(), Math.random() * 1000);
  })
    .then(() => {
      // console.log('done')
    })
    .catch(() => {
      // console.log('error')
    });
}

let myTask = new handleTask(3);
for (let i = 0; i < 10; i++) {
  myTask.run(task);
}
