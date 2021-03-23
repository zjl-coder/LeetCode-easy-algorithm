const tree = {
  value: "-",
  left: {
    value: '+',
    left: {
      value: 'a',
    },
    right: {
      value: '*',
      left: {
        value: 'b',
      },
      right: {
        value: 'c',
      }
    }
  },
  right: {
    value: '/',
    left: {
      value: 'd',
    },
    right: {
      value: 'e',
    }
  }
}

// 前序遍历 （递归实现）
function qianxu1(tree) {
  const res = [];
  if (!tree) {
    return res;
  }
  // 将拿到的节点的值 放进 数组
  res.push(tree.value);
  // 先递归 左节点的值
  res.push(...qianxu1(tree.left));
  // 后递归 右节点的值
  res.push(...qianxu1(tree.right));
  return res;
}
console.log('前序1', qianxu1(tree));

// 前序遍历 （非递归实现）
// 利用栈：将遍历到的结点都依次存入栈中，拿结果时从栈中访问
function qianxu2(tree) {
  const res = [];
  const stack = [];
  // 先将整树入栈
  stack.push(tree);
  while (stack.length) {
    // 取出栈的最后一个节点
    const node = stack.pop();
    // 将节点中的值放入数组
    res.push(node.value);
    // 将节点中的右树入栈
    if (node.right) {
      stack.push(node.right);
    }
    // 将左子树入栈
    if (node.left) {
      stack.push(node.left);
    }
    // 这样，循环的时候就先取左子树的值，右子树留在栈中
  }
  return res;
}
console.log('前序2', qianxu2(tree));

// 中序遍历 （递归）
// 算法跟前序一样，只不过先递归左子树，取值，再递归右子树
function zhongxu1(tree) {
  const res = [];
  if (!tree) {
    return res;
  }
  // 先递归 左节点的值
  res.push(...zhongxu1(tree.left));
  // 将拿到的节点的值 放进 数组
  res.push(tree.value);
  // 后递归 右节点的值
  res.push(...zhongxu1(tree.right));
  return res;
}
console.log('中序1', zhongxu1(tree));

// 中序遍历 （非递归）
function zhongxu2(root) {
  if (!root) return [];
  const stack = [];
  let cur = root;
  const res = [];
  while (stack.length || cur) {
    // 左节点都先压入栈
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    // 取出栈里面的一个节点
    const node = stack.pop();
    // 取值
    res.push(node.value);
    // 如果这个节点有右节点，就入栈
    if (node.right != null) {
      cur = node.right;
    }
  }
  return res;
}
console.log('中序2', zhongxu2(tree));

// 后续遍历 (递归)
// 算法跟前序一样，只不过先递归左子树，再递归右子树，最后再取值
function houxu1(tree) {
  const res = [];
  if (!tree) {
    return res;
  }
  // 先递归 左节点的值
  res.push(...houxu1(tree.left));
  // 后递归 右节点的值
  res.push(...houxu1(tree.right));
  // 将拿到的节点的值 放进 数组
  res.push(tree.value);
  return res;
}
console.log('后续1', houxu1(tree));

// 后续遍历 (非递归) 与前序遍历相反的执行逻辑
// 前序遍历是 先读根节点值 追加入数组，先压右节点，再压左节点，这样保证先读到左节点的值 追加入数组
// 后续遍历是 先读取更节点值，插入数组的最前面，先压右左节点，再压右节点，这样可以保证，右节点先读，然后插入根节点前面，左节点插入右节点前面
function houxu2(root) {
  if (!root) return null;
  const res = [];
  const stack = [root];
  while (stack.length) {
    const cur = stack.pop();
    // 总是头部插入，先被插入的在后面。
    // 借用队列，越慢读到的值，越放在队列的前面
    // 左最慢读，右，中，这样保证每个节点的值的顺序是左右中，并且先下面的值在上面的值的前面
    res.unshift(cur.value);
    cur.left && stack.push(cur.left);
    cur.right && stack.push(cur.right);
  }
  return res;
}
console.log('后续2', houxu2(tree));

// 广度优先遍历 （递归）
function guangdu1(tree) {
  const res = [];
  const stack = [tree];
  let count = 0; // 游标
  guangdu();
  function guangdu() {
    // 获取队列的每一个节点
    const node = stack[count];
    if (node) {
      res.push(node.value); // 取出值放入数组
      node.left && stack.push(node.left);
      node.right && stack.push(node.right);
      count++;
      guangdu(); // 递归模拟循环
    }
  }
  return res;
}
console.log('广度1', guangdu1(tree));

// 广度优先遍历 (非递归) 游标法 节省性能
// 利用队列，指针（游标），从上到下，从左到右逐层遍历
function guangdu2(tree) {
  const res = [];
  const queue = []; // 队列， 存放树的根节点，左节点，右节点
  let pointer = 0; // 队列的游标
  queue.push(tree); // 先将树进入队列
  while (pointer < queue.length) {
    res.push(queue[pointer].value); // 遍历队列的每一个节点的值
    if (queue[pointer].left) {
      queue.push(queue[pointer].left); // 取出这个节点的左子树入队列，等待遍历
    }
    if (queue[pointer].right) {
      queue.push(queue[pointer].right); // 取出这个节点的右子树入队列，等待遍历
    }
    pointer++; // 游标移动到下一位继续遍历，直到游标移动到队列的尾部，这个过程不断会有新的节点加入，直到没有节点加入为止
  }
  return res;
}
console.log('广度2', guangdu2(tree));

// 广度优先遍历 (非递归) shitf 法 耗性能 不需要游标
function guangdu3(tree) {
  const res = [];
  const queue = []; // 队列， 存放树的根节点，左节点，右节点
  queue.push(tree); // 先将树进入队列
  while (queue.length) {
    const node = queue.shift();// 弹出队列的第一个节点的值
    res.push(node.value);
    if (node.left) {
      queue.push(node.left); // 取出这个节点的左子树入队列，等待遍历
    }
    if (node.right) {
      queue.push(node.right); // 取出这个节点的右子树入队列，等待遍历
    }
  }
  return res;
}
console.log('广度3', guangdu3(tree));